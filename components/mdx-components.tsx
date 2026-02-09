import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-14 text-[32px] font-semibold leading-[1.15] tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-10 text-2xl font-semibold leading-[1.2] tracking-tight" {...props} />,
  p: (props) => <p className="mt-6 text-[18px] leading-[1.85] text-[var(--text)]" {...props} />,
  a: (props) => (
    <a
      className="font-semibold text-[var(--text)] underline decoration-[0.12em] underline-offset-2"
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-6 list-disc space-y-3 pl-6" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-3 pl-6" {...props} />,
  li: (props) => <li className="text-[18px] leading-[1.8]" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-5 text-[17px] leading-[1.8] text-[var(--muted)]" {...props} />
  )
};
