import Link from "next/link";
import type { ReactNode } from "react";
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

function Card({ children }: { children: ReactNode }): JSX.Element {
  return (
    <article className="directory-card flex h-full min-h-[390px] flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      {children}
    </article>
  );
}

function EvidenceStamp({ level }: { level: EvidenceLevel }): JSX.Element {
  return (
    <span className="inline-flex h-9 min-w-[106px] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">
      <span className={`w-1.5 ${evidenceTone(level)}`} />
      <span className="flex flex-1 items-center justify-between px-2.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Grade</span>
        <span className="text-base font-semibold leading-none">{level}</span>
      </span>
    </span>
  );
}

function Header({ label, evidenceLevel }: { label: string; evidenceLevel: EvidenceLevel }): JSX.Element {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="max-w-[64%] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
      <EvidenceStamp level={evidenceLevel} />
    </div>
  );
}

function Title({ children }: { children: ReactNode }): JSX.Element {
  return <h3 className="mt-4 font-sans text-[1.95rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[2.1rem]">{children}</h3>;
}

function Summary({ children }: { children: ReactNode }): JSX.Element {
  return <p className="mt-2 line-clamp-2 text-[1rem] leading-[1.42] text-[var(--muted)]">{children}</p>;
}

function Facts({ children }: { children: ReactNode }): JSX.Element {
  return <div className="mt-4 rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">{children}</div>;
}

function FactRow({ label, value, valueClassName }: { label: string; value: ReactNode; valueClassName?: string }): JSX.Element {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-[var(--border)] px-3 py-3 last:border-b-0 sm:grid-cols-[110px_minmax(0,1fr)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className={valueClassName ?? "line-clamp-2 text-[0.97rem] leading-[1.35]"}>{value}</p>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }): JSX.Element {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Footer({ href, aux, tags }: { href: string; aux?: string; tags?: string[] }): JSX.Element {
  return (
    <div className="mt-auto pt-4">
      {aux && <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{aux}</p>}
      {tags && tags.length > 0 && <Tags tags={tags} />}
      <Link className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--text)] underline underline-offset-4" href={href}>
        Open profile
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export function SupplementCard({ supplement }: { supplement: SupplementEntry }): JSX.Element {
  return (
    <Card>
      <Header evidenceLevel={supplement.evidenceLevel} label={supplement.focus} />
      <Title>{supplement.name}</Title>
      <Summary>{supplement.evidenceSummary}</Summary>

      <Facts>
        <FactRow label="Dose" value={supplement.dosing.typicalDailyDose} />
        <FactRow label="Effect" value={supplement.effectSize} />
        <FactRow label="Safety" value={supplement.safety} valueClassName={`text-[1.02rem] font-semibold leading-[1.3] ${safetyTone(supplement.safety)}`} />
      </Facts>

      <Footer
        aux={`Mentioned in ${supplement.articleRefs.length} article${supplement.articleRefs.length > 1 ? "s" : ""}`}
        href={`/supplements/${supplement.slug}`}
        tags={supplement.conditionTags.slice(0, 4)}
      />
    </Card>
  );
}

export function ConditionCard({ condition }: { condition: ConditionEntry }): JSX.Element {
  return (
    <Card>
      <Header evidenceLevel={condition.evidenceLevel} label="Condition Strategy" />
      <Title>{condition.name}</Title>
      <Summary>{condition.goal}</Summary>

      <Facts>
        <FactRow label="Guidance" value={condition.guidanceSummary} valueClassName="line-clamp-3 text-[0.96rem] leading-[1.35]" />
        <FactRow label="Top steps" value={condition.topInterventions.slice(0, 3).join(" • ")} valueClassName="line-clamp-2 text-[0.95rem] leading-[1.35]" />
      </Facts>

      <Footer href={`/conditions/${condition.slug}`} />
    </Card>
  );
}

export function ClinicCard({ clinic }: { clinic: ClinicEntry }): JSX.Element {
  return (
    <Card>
      <Header evidenceLevel={clinic.evidenceLevel} label={clinic.location} />
      <Title>{clinic.name}</Title>
      <Summary>{clinic.specialization}</Summary>

      <Facts>
        <FactRow label="Notes" value={clinic.notes} valueClassName="line-clamp-3 text-[0.96rem] leading-[1.35]" />
        <FactRow label="Focus" value={clinic.protocolFocus.slice(0, 3).join(" • ")} valueClassName="line-clamp-2 text-[0.95rem] leading-[1.35]" />
      </Facts>

      <Footer href={`/clinics/${clinic.slug}`} />
    </Card>
  );
}
