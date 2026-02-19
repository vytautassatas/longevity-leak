"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SearchIndexItem, SearchIndexResponse, SearchItemType } from "@/lib/search-types";

type SearchFilter = "all" | SearchItemType;
type LoadState = "idle" | "loading" | "ready" | "error";

const filterOptions: { value: SearchFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "article", label: "Articles" },
  { value: "supplement", label: "Supplements" },
  { value: "condition", label: "Conditions" }
];

const typeLabels: Record<SearchItemType, string> = {
  article: "Article",
  supplement: "Supplement",
  condition: "Condition"
};

const resultsListId = "site-search-results";

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return target.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function toTimestamp(value: string): number {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortForDefault(a: SearchIndexItem, b: SearchIndexItem): number {
  if (a.type === "article" && b.type === "article") {
    return toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt);
  }

  return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
}

function scoreSearchItem(item: SearchIndexItem, terms: string[], fullQuery: string): number {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const keywords = item.keywords.join(" ");
  const typeText = typeLabels[item.type].toLowerCase();
  let score = 0;

  for (const term of terms) {
    let termScore = 0;
    if (title === term) termScore = 160;
    else if (title.startsWith(term)) termScore = 125;
    else if (title.includes(term)) termScore = 94;
    else if (keywords.includes(term)) termScore = 58;
    else if (description.includes(term)) termScore = 35;
    else if (typeText.includes(term)) termScore = 20;
    else return 0;
    score += termScore;
  }

  if (title.includes(fullQuery)) score += 28;
  if (item.slug.toLowerCase() === fullQuery) score += 24;
  if (item.href.toLowerCase().includes(fullQuery)) score += 14;

  return score;
}

function badgeClassName(type: SearchItemType): string {
  if (type === "article") return "border-sky-500/40 bg-sky-500/12 text-[var(--text)]";
  if (type === "supplement") return "border-emerald-500/40 bg-emerald-500/12 text-[var(--text)]";
  return "border-amber-500/40 bg-amber-500/12 text-[var(--text)]";
}

function getDefaultResults(items: SearchIndexItem[], filter: SearchFilter): SearchIndexItem[] {
  if (filter !== "all") {
    return items
      .filter((item) => item.type === filter)
      .sort(sortForDefault)
      .slice(0, 12);
  }

  const articles = items
    .filter((item) => item.type === "article")
    .sort(sortForDefault)
    .slice(0, 4);
  const supplements = items
    .filter((item) => item.type === "supplement")
    .sort(sortForDefault)
    .slice(0, 4);
  const conditions = items
    .filter((item) => item.type === "condition")
    .sort(sortForDefault)
    .slice(0, 4);

  return [...articles, ...supplements, ...conditions];
}

export function SiteSearch(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousPathnameRef = useRef(pathname);
  const loadedRef = useRef(false);
  const loadingRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("all");
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [items, setItems] = useState<SearchIndexItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [shortcutHint, setShortcutHint] = useState("Ctrl K");

  const closeModal = useCallback(() => {
    setOpen(false);
    setQuery("");
    setFilter("all");
    setActiveIndex(-1);
  }, []);

  const loadIndex = useCallback(async () => {
    if (loadedRef.current || loadingRef.current) return;

    loadingRef.current = true;
    setLoadState("loading");

    try {
      const response = await fetch("/api/search", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Search index request failed with ${response.status}`);

      const payload = (await response.json()) as SearchIndexResponse;
      if (!payload || !Array.isArray(payload.items)) throw new Error("Unexpected search payload format.");

      setItems(payload.items);
      loadedRef.current = true;
      setLoadState("ready");
    } catch (error) {
      console.error("[site-search] Could not load search index.", error);
      setLoadState("error");
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
    void loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    const isMac = /(Mac|iPhone|iPad|iPod)/i.test(window.navigator.platform);
    setShortcutHint(isMac ? "⌘ K" : "Ctrl K");
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadIndex();
    }, 1100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loadIndex]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    if (previousPathname === pathname) return;
    previousPathnameRef.current = pathname;
    if (open) closeModal();
  }, [pathname, open, closeModal]);

  useEffect(() => {
    const onWindowKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();
      const hasModifier = event.metaKey || event.ctrlKey;

      if (hasModifier && key === "k") {
        event.preventDefault();
        if (open) closeModal();
        else openModal();
        return;
      }

      if (!open && key === "/" && !isEditableTarget(event.target)) {
        event.preventDefault();
        openModal();
        return;
      }

      if (open && key === "escape") {
        event.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", onWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [open, openModal, closeModal]);

  const normalizedQuery = useMemo(() => normalizeQuery(query), [query]);

  const visibleResults = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return getDefaultResults(items, filter);
    }

    const terms = normalizedQuery.split(" ").filter(Boolean);
    const filtered = filter === "all" ? items : items.filter((item) => item.type === filter);

    return filtered
      .map((item) => ({
        item,
        score: scoreSearchItem(item, terms, normalizedQuery)
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;

        const dateDelta = toTimestamp(b.item.updatedAt) - toTimestamp(a.item.updatedAt);
        if (dateDelta !== 0) return dateDelta;

        return a.item.title.localeCompare(b.item.title, "en", { sensitivity: "base" });
      })
      .slice(0, 30)
      .map((entry) => entry.item);
  }, [items, filter, normalizedQuery]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(visibleResults.length > 0 ? 0 : -1);
  }, [open, normalizedQuery, filter, visibleResults.length]);

  const openResult = useCallback(
    (item: SearchIndexItem) => {
      router.push(item.href);
      closeModal();
    },
    [router, closeModal]
  );

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => {
        if (visibleResults.length === 0) return -1;
        if (current < 0) return 0;
        return Math.min(current + 1, visibleResults.length - 1);
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => {
        if (visibleResults.length === 0) return -1;
        if (current <= 0) return 0;
        return current - 1;
      });
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const selected = visibleResults[activeIndex];
      if (selected) openResult(selected);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  };

  const activeDescendant = activeIndex >= 0 ? `site-search-option-${activeIndex}` : undefined;
  const resultSummary =
    normalizedQuery.length === 0 ? "Start typing to search articles, supplements, and conditions." : `${visibleResults.length} result${visibleResults.length === 1 ? "" : "s"}`;

  return (
    <>
      <button
        aria-label="Open site search"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)] sm:h-9 sm:w-auto sm:gap-2 sm:px-3.5"
        onClick={open ? closeModal : openModal}
        title="Search (Cmd/Ctrl+K)"
        type="button"
      >
        <svg aria-hidden="true" fill="none" height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.1em] sm:inline">Search</span>
        <span className="hidden rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)] lg:inline">
          {shortcutHint}
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/65 p-4 backdrop-blur-[2px] sm:p-8" onClick={closeModal}>
          <div
            aria-labelledby="site-search-title"
            aria-modal="true"
            className="mx-auto mt-3 w-full max-w-3xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="border-b border-[var(--border)] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]" id="site-search-title">
                  Sitewide Search
                </p>
                <button
                  className="inline-flex h-9 items-center rounded-full border border-[var(--border)] px-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)]"
                  onClick={closeModal}
                  type="button"
                >
                  Esc
                </button>
              </div>

              <label className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3">
                <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                </svg>
                <input
                  aria-activedescendant={activeDescendant}
                  aria-autocomplete="list"
                  aria-controls={resultsListId}
                  aria-expanded={open}
                  aria-label="Search the site"
                  className="h-14 w-full bg-transparent text-base outline-none"
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search articles, supplements, and conditions"
                  ref={inputRef}
                  role="combobox"
                  spellCheck={false}
                  type="text"
                  value={query}
                />
                {loadState === "loading" ? <span className="text-xs font-semibold text-[var(--muted)]">Loading...</span> : null}
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {filterOptions.map((option) => {
                  const isActive = filter === option.value;
                  return (
                    <button
                      key={option.value}
                      className={`inline-flex h-9 items-center rounded-full border px-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                        isActive
                          ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                          : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                      }`}
                      onClick={() => setFilter(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs text-[var(--muted)]">{resultSummary}</p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
              {loadState === "error" ? (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-sm font-medium">Search index could not be loaded.</p>
                  <button
                    className="mt-3 inline-flex h-10 items-center rounded-full border border-[var(--border)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)]"
                    onClick={() => {
                      loadedRef.current = false;
                      void loadIndex();
                    }}
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              ) : null}

              {loadState !== "error" && visibleResults.length === 0 ? (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                  No matches found. Try a broader term like <span className="font-semibold text-[var(--text)]">sleep</span>,{" "}
                  <span className="font-semibold text-[var(--text)]">glucose</span>, or <span className="font-semibold text-[var(--text)]">NAD</span>.
                </div>
              ) : null}

              {loadState !== "error" && visibleResults.length > 0 ? (
                <ul className="space-y-2" id={resultsListId} role="listbox">
                  {visibleResults.map((item, index) => {
                    const active = index === activeIndex;
                    return (
                      <li key={item.id}>
                        <button
                          className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                            active
                              ? "border-[var(--border-strong)] bg-[var(--surface-soft)]"
                              : "border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
                          }`}
                          aria-selected={active}
                          id={`site-search-option-${index}`}
                          onClick={() => openResult(item)}
                          onMouseEnter={() => setActiveIndex(index)}
                          role="option"
                          type="button"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-base font-semibold leading-tight">{item.title}</p>
                              <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{item.description}</p>
                            </div>
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${badgeClassName(item.type)}`}>
                              {typeLabels[item.type]}
                            </span>
                          </div>
                          <p className="mt-2 text-xs font-medium text-[var(--muted)]">{item.href}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
