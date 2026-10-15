import { cn } from "../../lib/utils";

/**
 * Wordmark del portal. Se dibuja en código, no es una imagen: así el logotipo
 * sigue siempre al nombre de la marca y no arrastra el de la versión anterior.
 */
export function PortalLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc4ff] via-[#1bacf6] to-[#0b93d8] text-white shadow-[0_10px_24px_-12px_rgba(27,172,246,0.95)]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none">
          <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M4.9 10.4h14.2M4.9 13.6h14.2M12 4.6c1.9 2.2 2.9 4.7 2.9 7.4s-1 5.2-2.9 7.4c-1.9-2.2-2.9-4.7-2.9-7.4S10.1 6.8 12 4.6Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M17.6 6.1c1.6-.5 2.9-.4 3.9.2.2 1.2-.2 2.4-1.3 3.4-1.1 1-2.4 1.4-3.9 1.2-.3-1.6-.1-3.2.7-4.6l.6-.2Z"
            fill="#7ee08a"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-[0.02em] text-white",
            compact ? "text-[1.05rem]" : "text-[1.32rem]",
          )}
        >
          NECHUGO
        </span>
        <span className="mt-1 text-[0.6rem] font-medium tracking-[0.22em] text-white/50 uppercase">
          juntos, sí podemos
        </span>
      </span>
    </span>
  );
}
