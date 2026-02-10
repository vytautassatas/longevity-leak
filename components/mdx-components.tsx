import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-[1.55rem] font-semibold leading-[1.25] sm:text-[1.8rem]" {...props} />,
  h3: (props) => <h3 className="mt-10 text-[1.3rem] font-semibold leading-[1.3] sm:text-[1.45rem]" {...props} />,
  p: (props) => <p className="mt-5 text-[1.04rem] leading-[1.82] text-[var(--text)] sm:text-[1.1rem]" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[var(--text)] underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-70 break-words"
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-6 list-disc space-y-2.5 pl-6" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-2.5 pl-6" {...props} />,
  li: (props) => <li className="text-[1.04rem] leading-[1.8]" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="not-italic" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-4 border-[var(--accent)] pl-5 text-[1.04rem] leading-[1.8] text-[var(--muted)]" {...props} />
  )
};
