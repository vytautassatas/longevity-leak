import Link from "next/link";
import type { ClinicEntry, ConditionEntry, EvidenceLevel, SupplementEntry } from "@/lib/directory";

function evidenceTone(level: EvidenceLevel): string {
  if (level === "A") return "bg-emerald-500";
  if (level === "B") return "bg-amber-500";
  return "bg-rose-500";
}

function safetyTone(safety: SupplementEntry["safety"]): string {
  if (safety === "Low Risk") return "text-[#0f766e]";
  if (safety === "Moderate Risk") return "text-[#b45309]";
  return "text-[#be123c]";
}

function EvidenceBadge({ level }: { level: EvidenceLevel }): JSX.Element {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-soft)] px-3 text-xs font-bold uppercase tracking-[0.12em]">
      <span className={`h-2.5 w-2.5 rounded-full ${evidenceTone(level)}`} />
      Evidence {level}
    </span>
  );
}

export function SupplementCard({ supplement }: { supplement: SupplementEntry }): JSX.Element {
  return (
    <article className="directory-card group flex h-full min-h-[500px] flex-col rounded-3xl border border-[var(--border)] bg-[linear-gradient(165deg,var(--surface)_10%,var(--surface-soft)_160%)] p-5 shadow-[0_18px_42px_rgba(8,15,28,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[60%] text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{supplement.focus}</p>
        <EvidenceBadge level={supplement.evidenceLevel} />
      </div>
      <h3 className="mt-5 text-[2.15rem] leading-[1.05] sm:text-[2.55rem]">{supplement.name}</h3>
      <p className="mt-3 text-[1.08rem] leading-[1.5] text-[var(--muted)]">{supplement.evidenceSummary}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">Mentioned in {supplement.articleRefs.length} article{supplement.articleRefs.length > 1 ? "s" : ""}</p>

      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Research Dose</p>
        <p className="mt-2 text-base leading-[1.35]">{supplement.dosing.typicalDailyDose}</p>
      </div>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Effect Size</dt>
          <dd className="mt-2 text-lg leading-[1.35]">{supplement.effectSize}</dd>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Safety</dt>
          <dd className={`mt-2 text-lg font-semibold leading-[1.35] ${safetyTone(supplement.safety)}`}>{supplement.safety}</dd>
        </div>
      </dl>

      <ul className="mt-6 flex flex-wrap gap-2">
        {supplement.conditionTags.map((tag) => (
          <li key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold">
            {tag}
          </li>
        ))}
      </ul>

      <Link
        className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--text)] px-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        href={`/supplements/${supplement.slug}`}
      >
        View Profile
      </Link>
    </article>
  );
}

export function ConditionCard({ condition }: { condition: ConditionEntry }): JSX.Element {
  return (
    <article className="directory-card group flex h-full min-h-[500px] flex-col rounded-3xl border border-[var(--border)] bg-[linear-gradient(165deg,var(--surface)_10%,var(--surface-soft)_160%)] p-5 shadow-[0_18px_42px_rgba(8,15,28,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Condition Strategy</p>
        <EvidenceBadge level={condition.evidenceLevel} />
      </div>
      <h3 className="mt-5 text-[2.15rem] leading-[1.05] sm:text-[2.55rem]">{condition.name}</h3>
      <p className="mt-3 text-[1.08rem] leading-[1.45] text-[var(--muted)]">{condition.goal}</p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm leading-[1.5]">{condition.guidanceSummary}</p>
      </div>

      <ul className="mt-6 grid gap-2 text-sm">
        {condition.topInterventions.map((intervention) => (
          <li key={intervention} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-medium">
            {intervention}
          </li>
        ))}
      </ul>

      <Link
        className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--text)] px-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        href={`/conditions/${condition.slug}`}
      >
        View Profile
      </Link>
    </article>
  );
}

export function ClinicCard({ clinic }: { clinic: ClinicEntry }): JSX.Element {
  return (
    <article className="directory-card group flex h-full min-h-[500px] flex-col rounded-3xl border border-[var(--border)] bg-[linear-gradient(165deg,var(--surface)_10%,var(--surface-soft)_160%)] p-5 shadow-[0_18px_42px_rgba(8,15,28,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{clinic.location}</p>
        <EvidenceBadge level={clinic.evidenceLevel} />
      </div>
      <h3 className="mt-5 text-[2.15rem] leading-[1.05] sm:text-[2.55rem]">{clinic.name}</h3>
      <p className="mt-3 text-[1.08rem] leading-[1.45] text-[var(--muted)]">{clinic.specialization}</p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm leading-[1.5]">{clinic.notes}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {clinic.protocolFocus.map((focus) => (
          <li key={focus} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold">
            {focus}
          </li>
        ))}
      </ul>

      <Link
        className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--text)] px-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        href={`/clinics/${clinic.slug}`}
      >
        View Profile
      </Link>
    </article>
  );
}
