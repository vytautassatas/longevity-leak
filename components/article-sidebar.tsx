import Link from "next/link";
import type { ConditionEntry, SupplementEntry } from "@/lib/directory";
import { evidenceTone, safetyTone } from "@/components/directory-card";

function EvidenceStamp({ level }: { level: string }) {
  return (
    <span className="inline-flex h-7 min-w-[80px] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">
      <span className={`w-1 ${evidenceTone(level as "A" | "B" | "C")}`} />
      <span className="flex flex-1 items-center justify-between px-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Grade</span>
        <span className="text-sm font-semibold leading-none">{level}</span>
      </span>
    </span>
  );
}

function FactRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-2 border-b border-[var(--border)] px-2.5 py-2 last:border-b-0">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className={valueClassName ?? "line-clamp-2 text-[0.82rem] leading-[1.3]"}>{value}</p>
    </div>
  );
}

function SidebarSupplementCard({ supplement }: { supplement: SupplementEntry }) {
  return (
    <Link
      className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--text)] hover:shadow-sm"
      href={`/supplements/${supplement.slug}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="max-w-[60%] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{supplement.focus}</p>
        <EvidenceStamp level={supplement.evidenceLevel} />
      </div>
      <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-tight tracking-[-0.01em]">{supplement.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-[1.4] text-[var(--muted)]">{supplement.evidenceSummary}</p>

      <div className="mt-3 rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">
        <FactRow label="Dose" value={supplement.dosing.typicalDailyDose} />
        <FactRow label="Timing" value={supplement.dosing.timing} />
        <FactRow
          label="Safety"
          value={supplement.safety}
          valueClassName={`text-[0.84rem] font-semibold leading-[1.3] ${safetyTone(supplement.safety)}`}
        />
      </div>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--text)] underline underline-offset-4">
        Open profile <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

function SidebarConditionCard({ condition }: { condition: ConditionEntry }) {
  return (
    <Link
      className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--text)] hover:shadow-sm"
      href={`/conditions/${condition.slug}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="max-w-[60%] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Condition Strategy</p>
        <EvidenceStamp level={condition.evidenceLevel} />
      </div>
      <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-tight tracking-[-0.01em]">{condition.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-[1.4] text-[var(--muted)]">{condition.goal}</p>

      <div className="mt-3 rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">
        <FactRow label="Guidance" value={condition.guidanceSummary} />
        <FactRow label="Top steps" value={condition.topInterventions.slice(0, 3).join(" / ")} />
      </div>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--text)] underline underline-offset-4">
        Open profile <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

export function ArticleSidebar({
  supplements,
  conditions,
}: {
  supplements: SupplementEntry[];
  conditions: ConditionEntry[];
}) {
  if (supplements.length === 0 && conditions.length === 0) return null;

  return (
    <aside className="mt-12 lg:sticky lg:top-8 lg:mt-0 lg:self-start">
      {supplements.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Related Supplements</h2>
          <div className="mt-3 space-y-3">
            {supplements.map((s) => (
              <SidebarSupplementCard key={s.slug} supplement={s} />
            ))}
          </div>
        </div>
      )}
      {conditions.length > 0 && (
        <div className={supplements.length > 0 ? "mt-8" : ""}>
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Related Conditions</h2>
          <div className="mt-3 space-y-3">
            {conditions.map((c) => (
              <SidebarConditionCard key={c.slug} condition={c} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
