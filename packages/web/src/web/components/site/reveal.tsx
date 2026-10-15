import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/utils";

/**
 * Reveals its children once when they scroll into view. The stagger is driven by
 * the --i custom property, so a whole section can cascade without per-item timers.
 */
export function Reveal({
  children,
  i = 0,
  className,
  delay,
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--i": delay ?? i } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Copies text to the clipboard and reports it for a moment. */
export function useCopy() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}
