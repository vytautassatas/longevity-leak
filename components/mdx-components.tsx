import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-16 text-3xl font-semibold leading-[1.2]" {...props} />,
  h3: (props) => <h3 className="mt-12 text-xl font-semibold leading-[1.3]" {...props} />,
  p: (props) => <p className="mt-8 text-lg leading-[1.7] text-[var(--text)]" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[var(--text)] underline decoration-[1px] underline-offset-4 transition-opacity hover:opacity-70"
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-8 list-disc space-y-4 pl-8" {...props} />,
  ol: (props) => <ol className="mt-8 list-decimal space-y-4 pl-8" {...props} />,
  li: (props) => <li className="text-lg leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-10 border-l-4 border-[var(--accent)] pl-8 text-lg italic leading-[1.7] text-[var(--muted)]" {...props} />
  )
};
