import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-3xl font-extrabold leading-[1.2]" {...props} />,
  p: (props) => <p className="mt-5 text-lg leading-[1.7] text-[var(--text)]" {...props} />,
  a: (props) => (
    <a
      className="font-semibold text-[var(--accent)] underline decoration-[0.12em] underline-offset-2"
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6" {...props} />,
  li: (props) => <li className="text-lg leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-[var(--muted)]" {...props} />
  )
};
