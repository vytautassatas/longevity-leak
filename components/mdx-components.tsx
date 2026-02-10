import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-[1.7rem] font-semibold leading-[1.2] sm:mt-14 sm:text-[2.05rem]" {...props} />,
  h3: (props) => <h3 className="mt-9 text-[1.4rem] font-semibold leading-[1.25] sm:mt-10 sm:text-2xl" {...props} />,
  p: (props) => <p className="mt-6 text-base leading-[1.75] text-[var(--text)] sm:text-[1.08rem] sm:leading-[1.78]" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[var(--text)] underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-70 break-words"
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-6 list-disc space-y-3 pl-7" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-3 pl-7" {...props} />,
  li: (props) => <li className="text-[1.05rem] leading-[1.75]" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-4 border-[var(--accent)] pl-6 text-[1.06rem] italic leading-[1.75] text-[var(--muted)]" {...props} />
  )
};
