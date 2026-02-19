export const layout = {
  rails: {
    wide: "mx-auto w-full max-w-[1280px] px-5 pb-28 pt-8 sm:px-6 sm:pt-10 lg:px-8",
    detail: "mx-auto w-full max-w-[1080px] px-5 pb-28 pt-8 sm:px-6 sm:pt-10 lg:px-8",
    article: "mx-auto w-full max-w-[720px] px-5 pb-28 pt-8 sm:px-6 sm:pt-10 lg:px-8"
  },
  chromeRail: "mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8",
  hero: {
    shell: "directory-shell rounded-3xl p-9 sm:p-12",
    eyebrow: "text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]",
    title: "mt-4 max-w-2xl text-4xl sm:text-5xl md:text-[3.2rem]",
    lead: "mt-5 max-w-xl text-[1.03rem] leading-[1.78] text-[var(--muted)] sm:text-[1.14rem]",
    badge: "mt-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]"
  },
  spacing: {
    section: "mt-10 sm:mt-12"
  },
  grids: {
    cards: "grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3"
  }
} as const;
