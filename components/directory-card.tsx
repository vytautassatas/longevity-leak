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
    <span className="inline-flex h-8 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-[11px] font-bold uppercase tracking-[0.12em]">
      <span className={`h-2.5 w-2.5 rounded-full ${evidenceTone(level)}`} />
      Evidence {level}
    </span>
  );
}

function PrimaryCta({ href }: { href: string }): JSX.Element {
  return (
    <Link
      className="mt-auto inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--text)] bg-[var(--text)] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--bg)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
      href={href}
    >
      View Profile
    </Link>
  );
}

export function SupplementCard({ supplement }: { supplement: SupplementEntry }): JSX.Element {
  return (
    <article className="directory-card flex h-full min-h-[430px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[64%] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{supplement.focus}</p>
        <EvidenceBadge level={supplement.evidenceLevel} />
      </div>

      <h3 className="mt-4 font-sans text-[2rem] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[2.2rem]">{supplement.name}</h3>
      <p className="mt-3 line-clamp-3 text-[1.02rem] leading-[1.42] text-[var(--muted)]">{supplement.evidenceSummary}</p>

      <div className="mt-5 grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-4">
        <div className="grid gap-2 border-b border-[var(--border)] pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Effect Size</p>
          <p className="line-clamp-3 text-[1.02rem] leading-[1.35]">{supplement.effectSize}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Safety</p>
          <p className={`text-[1.1rem] font-semibold leading-none ${safetyTone(supplement.safety)}`}>{supplement.safety}</p>
        </div>
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
        Mentioned in {supplement.articleRefs.length} article{supplement.articleRefs.length > 1 ? "s" : ""}
      </p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {supplement.conditionTags.slice(0, 4).map((tag) => (
          <li key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold">
            {tag}
          </li>
        ))}
      </ul>

      <PrimaryCta href={`/supplements/${supplement.slug}`} />
    </article>
  );
}

export function ConditionCard({ condition }: { condition: ConditionEntry }): JSX.Element {
  return (
    <article className="directory-card flex h-full min-h-[430px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Condition Strategy</p>
        <EvidenceBadge level={condition.evidenceLevel} />
      </div>

      <h3 className="mt-4 font-sans text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-[1.9rem]">{condition.name}</h3>
      <p className="mt-3 line-clamp-3 text-[1.02rem] leading-[1.42] text-[var(--muted)]">{condition.goal}</p>

      <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Guidance</p>
        <p className="mt-2 line-clamp-4 text-sm leading-[1.45]">{condition.guidanceSummary}</p>
      </div>

      <ul className="mt-4 grid gap-2">
        {condition.topInterventions.slice(0, 3).map((intervention) => (
          <li key={intervention} className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-medium">
            {intervention}
          </li>
        ))}
      </ul>

      <PrimaryCta href={`/conditions/${condition.slug}`} />
    </article>
  );
}

export function ClinicCard({ clinic }: { clinic: ClinicEntry }): JSX.Element {
  return (
    <article className="directory-card flex h-full min-h-[430px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{clinic.location}</p>
        <EvidenceBadge level={clinic.evidenceLevel} />
      </div>

      <h3 className="mt-4 font-sans text-[1.72rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-[1.92rem]">{clinic.name}</h3>
      <p className="mt-3 line-clamp-3 text-[1.02rem] leading-[1.42] text-[var(--muted)]">{clinic.specialization}</p>

      <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">Notes</p>
        <p className="mt-2 line-clamp-4 text-sm leading-[1.45]">{clinic.notes}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {clinic.protocolFocus.slice(0, 4).map((focus) => (
          <li key={focus} className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold">
            {focus}
          </li>
        ))}
      </ul>

      <PrimaryCta href={`/clinics/${clinic.slug}`} />
    </article>
  );
}
