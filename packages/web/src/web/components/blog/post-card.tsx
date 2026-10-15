import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Novedad } from "../../lib/novedades";

/**
 * Tarjeta de entrada. Réplica del patrón del portal —imagen arriba, cuerpo
 * blanco, pie con «Continuar leyendo»— pero con el borde superior degradado y
 * el botón que se rellena en hover en lugar de estar siempre encendido.
 */
export function PostCard({
  entrada,
  destacada = false,
}: {
  entrada: Novedad;
  destacada?: boolean;
}) {
  const principal = entrada.categories[0];
  const href = `/novedades/${entrada.slug}`;

  return (
    <article
      className={cn(
        "card-bar group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover",
      )}
    >
      <a href={href} className="relative block overflow-hidden bg-surface-muted" tabIndex={-1} aria-hidden>
        <img
          src={entrada.image ?? ""}
          alt={entrada.imageAlt}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]",
            destacada ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[16/10]",
          )}
        />
      </a>

      <div className={cn("flex flex-1 flex-col p-6", destacada && "p-7 sm:p-8")}>
        {principal ? (
          <a
            href={`/novedades?categoria=${principal.slug}`}
            className="eyebrow w-fit text-accent-strong transition-colors hover:text-foreground"
          >
            {principal.name}
          </a>
        ) : null}

        <h3
          className={cn(
            "display text-foreground transition-colors group-hover:text-accent-strong",
            destacada
              ? "mt-4 text-[clamp(1.5rem,2.9vw,2.15rem)] leading-[1.12]"
              : "mt-3 text-[1.2rem] leading-[1.24]",
          )}
        >
          <a href={href}>{entrada.title}</a>
        </h3>

        <p
          className={cn(
            "clamp-3 mt-3 leading-relaxed text-muted-foreground",
            destacada ? "text-[0.98rem]" : "text-[0.88rem]",
          )}
        >
          {entrada.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.68rem] text-muted-foreground/75">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3 text-accent" strokeWidth={2.3} />
            {entrada.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3 text-accent" strokeWidth={2.3} />
            {entrada.minutes} min
          </span>
        </div>

        <a
          href={href}
          className={cn(
            "mt-6 inline-flex w-fit items-center gap-2 rounded-[30px] border border-accent/45 px-4 py-2.5 font-bold tracking-[0.04em] text-accent-strong uppercase transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent",
            destacada ? "text-[0.74rem]" : "text-[0.7rem]",
          )}
        >
          Continuar leyendo
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
        </a>
      </div>
    </article>
  );
}
