"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type RelatedLinkItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  eyebrow?: string;
  reason: string;
};

type RelatedLinksPanelProps = {
  title: string;
  items: RelatedLinkItem[];
  columns?: 1 | 2;
  limit?: number;
  className?: string;
};

type ReasonFilter = "All" | "Direct reference" | "Keyword match" | "Condition pathway" | "Model pathway";

function getReasonFilter(reason: string): Exclude<ReasonFilter, "All"> {
  if (reason.toLowerCase().includes("direct")) return "Direct reference";
  if (reason.toLowerCase().includes("keyword")) return "Keyword match";
  if (reason.toLowerCase().includes("condition pathway")) return "Condition pathway";
  return "Model pathway";
}

export function RelatedLinksPanel({ title, items, columns = 1, limit, className }: RelatedLinksPanelProps): JSX.Element | null {
  const [activeFilter, setActiveFilter] = useState<ReasonFilter>("All");
  const normalizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        filter: getReasonFilter(item.reason)
      })),
    [items]
  );

  const availableFilters = useMemo(() => {
    const unique = new Set<ReasonFilter>(["All"]);
    for (const item of normalizedItems) unique.add(item.filter);
    return [...unique];
  }, [normalizedItems]);

  const filteredItems = useMemo(() => {
    const visible = activeFilter === "All" ? normalizedItems : normalizedItems.filter((item) => item.filter === activeFilter);
    return typeof limit === "number" ? visible.slice(0, limit) : visible;
  }, [activeFilter, limit, normalizedItems]);

  if (items.length === 0) return null;

  return (
    <section className={className ?? "mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"}>
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {availableFilters.map((filter) => (
          <button
            key={filter}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              activeFilter === filter
                ? "border-[var(--border-strong)] bg-[var(--surface-soft)] text-[var(--text)]"
                : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">No links in this category for this page.</p>
      ) : (
        <ul className={`mt-5 grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <Link
                className="block rounded-xl border border-[var(--border)] p-4 transition-colors hover:border-[var(--border-strong)]"
                href={item.href}
              >
                {item.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">{item.eyebrow}</p>}
                <h3 className="mt-1 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{item.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.09em] text-[var(--muted)]">Why linked: {item.reason}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
