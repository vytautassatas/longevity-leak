"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  /** Tailwind classes for the wrapping <form> */
  className?: string;
  /** Input id — must be unique per page if multiple forms exist */
  inputId?: string;
  /** Submit button label */
  buttonLabel?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Visual variant: "hero" uses the pill newsletter-input style; "inline" uses a standard rounded-lg */
  variant?: "hero" | "inline";
};

export function SubscribeForm({
  className = "",
  inputId = "subscribe-email",
  buttonLabel = "Join the waitlist",
  placeholder = "your@email.com",
  variant = "hero",
}: Props): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { ok: boolean; error?: string };

      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/join/thank-you");
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    variant === "hero"
      ? "newsletter-input flex-1"
      : "h-11 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)]";

  const buttonClass =
    variant === "hero"
      ? "h-[52px] shrink-0 rounded-full px-7 text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-50"
      : "inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)] disabled:opacity-50";

  return (
    <form className={`flex flex-col gap-3 sm:flex-row ${className}`} onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor={inputId}>Your email address</label>
      <input
        id={inputId}
        className={inputClass}
        type="email"
        name="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        disabled={loading}
      />
      <button
        className={buttonClass}
        style={variant === "hero" ? { background: "var(--text)", color: "var(--bg)" } : undefined}
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving…" : buttonLabel}
      </button>

      {error && (
        <p className="w-full text-xs text-red-500 sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
