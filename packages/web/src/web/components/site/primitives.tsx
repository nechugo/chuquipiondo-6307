import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import type { Priority, Snippet, SnippetVariant } from "../../lib/audit";
import { Reveal, useCopy } from "./reveal";
import { Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ chips */

const PRIORITY_STYLE: Record<Priority, string> = {
  P0: "bg-danger-tint text-danger",
  P1: "bg-warn-tint text-warn",
  P2: "bg-info-tint text-info",
};

export function PriorityChip({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-wide",
        PRIORITY_STYLE[priority],
      )}
    >
      {priority}
    </span>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "ok" | "danger" | "warn";
  className?: string;
}) {
  const tones = {
    neutral: "bg-surface-muted text-muted-foreground",
    accent: "bg-accent-tint text-accent-strong",
    ok: "bg-ok-tint text-ok",
    danger: "bg-danger-tint text-danger",
    warn: "bg-warn-tint text-warn",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The pill label that sits above every section title on the live site. */
export function EyebrowPill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
        dark
          ? "border-white/25 bg-white/10 text-white/85"
          : "border-accent/25 bg-accent-tint text-accent-strong",
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", dark ? "bg-accent" : "bg-accent")}
        aria-hidden
      />
      <span className="eyebrow">{children}</span>
    </span>
  );
}

/* -------------------------------------------------------------- headings */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <EyebrowPill>{eyebrow}</EyebrowPill>
      <h2 className="display mt-6 text-[clamp(2rem,4vw,3.15rem)] text-foreground">{title}</h2>
      {sub ? (
        <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ cards */

/** White card with the cyan→navy top bar and an optional ghost index number. */
export function Card({
  children,
  index,
  className,
  tone = "light",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  tone?: "light" | "tint";
}) {
  return (
    <article
      className={cn(
        "card-bar relative flex h-full flex-col rounded-[6px] border border-border shadow-card transition-shadow hover:shadow-card-hover",
        tone === "tint"
          ? "bg-gradient-to-b from-surface-tint to-surface"
          : "bg-gradient-to-b from-white to-surface-muted",
        className,
      )}
    >
      {index ? (
        <span
          className="ghost-num pointer-events-none absolute top-5 right-6 text-[2.9rem] select-none"
          aria-hidden
        >
          {index}
        </span>
      ) : null}
      {children}
    </article>
  );
}

/** Rounded-square cyan icon badge used at the head of a card. */
export function IconBadge({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "danger" }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[10px] text-white shadow-[0_10px_22px_-12px_rgba(27,172,246,0.9)]",
        tone === "accent"
          ? "bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8]"
          : "bg-gradient-to-br from-[#ff7a6b] to-[#d92d20]",
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ code blocks */

const VARIANT_STYLE: Record<SnippetVariant, { label: string; dot: string; dark: boolean }> = {
  before: { label: "text-rose-300", dot: "bg-rose-400", dark: true },
  after: { label: "text-emerald-300", dot: "bg-emerald-400", dark: true },
  shell: { label: "text-sky-300", dot: "bg-sky-400", dark: true },
  plain: { label: "text-muted-foreground", dot: "bg-accent", dark: false },
};

export function CodeBlock({ snippet, copyable = true }: { snippet: Snippet; copyable?: boolean }) {
  const { copied, copy } = useCopy();
  const style = VARIANT_STYLE[snippet.variant];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px]",
        style.dark ? "bg-code-bg" : "bg-surface-muted ring-1 ring-border",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b px-4 py-2.5",
          style.dark ? "border-white/10" : "border-border",
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
          <span
            className={cn(
              "font-mono text-[0.7rem] tracking-wide",
              style.dark ? style.label : "text-muted-foreground",
            )}
          >
            {snippet.label}
          </span>
        </div>
        {copyable ? (
          <button
            type="button"
            onClick={() => copy(snippet.code)}
            aria-label={copied ? "Copiado" : "Copiar código"}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.68rem] transition-colors",
              style.dark
                ? "text-white/55 hover:bg-white/10 hover:text-white/90"
                : "text-muted-foreground hover:bg-white hover:text-foreground",
            )}
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "copiado" : "copiar"}
          </button>
        ) : null}
      </div>
      <pre
        className={cn(
          "code-scroll overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.75] whitespace-pre-wrap break-words",
          style.dark ? "text-white/85" : "text-foreground/85",
        )}
      >
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
