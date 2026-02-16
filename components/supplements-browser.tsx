"use client";

import { useMemo, useState } from "react";
import { SupplementCard } from "@/components/directory-card";
import type { SupplementEntry } from "@/lib/directory";

const evidenceOptions = ["All", "A", "B", "C"] as const;
const safetyOptions = ["All", "Low Risk", "Moderate Risk", "Needs Monitoring"] as const;

type EvidenceFilter = (typeof evidenceOptions)[number];
type SafetyFilter = (typeof safetyOptions)[number];

type SupplementsBrowserProps = {
  supplements: SupplementEntry[];
  className?: string;
};

export function SupplementsBrowser({ supplements, className }: SupplementsBrowserProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [evidence, setEvidence] = useState<EvidenceFilter>("All");
  const [safety, setSafety] = useState<SafetyFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return supplements.filter((item) => {
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.focus.toLowerCase().includes(q) ||
        item.conditionTags.some((tag) => tag.toLowerCase().includes(q));
      const matchesEvidence = evidence === "All" || item.evidenceLevel === evidence;
      const matchesSafety = safety === "All" || item.safety === safety;
      return matchesQuery && matchesEvidence && matchesSafety;
    });
  }, [supplements, query, evidence, safety]);

  return (
    <section className={className ?? "mt-10 sm:mt-12"}>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Search</span>
            <input
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm outline-none transition-colors focus:border-[var(--border-strong)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find by name, focus, or tag"
              type="text"
              value={query}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Evidence</span>
            <select
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm outline-none transition-colors focus:border-[var(--border-strong)]"
              onChange={(event) => setEvidence(event.target.value as EvidenceFilter)}
              value={evidence}
            >
              {evidenceOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All levels" : `Evidence ${option}`}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Safety</span>
            <select
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm outline-none transition-colors focus:border-[var(--border-strong)]"
              onChange={(event) => setSafety(event.target.value as SafetyFilter)}
              value={safety}
            >
              {safetyOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All risk levels" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
          Showing {filtered.length} of {supplements.length} supplements
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
        {filtered.map((supplement) => (
          <SupplementCard key={supplement.slug} supplement={supplement} />
        ))}
      </div>
    </section>
  );
}
