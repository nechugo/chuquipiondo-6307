import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
import { loadNovedades, type Novedad } from "../../lib/novedades";
import { EyebrowPill } from "../site/primitives";
import { Reveal } from "../site/reveal";

export function PortalRecientes() {
  const [entradas, setEntradas] = useState<Novedad[] | null>(null);

  useEffect(() => {
    let vivo = true;
    loadNovedades().then((todas) => {
      if (vivo) setEntradas(todas.slice(0, 4));
    });
    return () => {
      vivo = false;
    };
  }, []);

  const principal = entradas?.[0];
  const resto = entradas?.slice(1, 4) ?? [];

  return (
    <section className="bg-surface-muted py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <EyebrowPill>Contenido reciente</EyebrowPill>
          <h2 className="display mt-6 text-[clamp(2rem,4vw,3.15rem)] text-foreground">
            Historias, Formación Y Liderazgo
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
            Reflexiones, experiencias y herramientas para crecer con propósito, fortalecer el
            carácter y avanzar con una visión clara.
          </p>
        </Reveal>

        {principal ? (
          <Reveal className="mt-14">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Pieza principal */}
              <a
                href={`/novedades/${principal.slug}`}
                className="card-bar group relative block overflow-hidden rounded-[6px] border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover"
              >
                <img
                  src={principal.image ?? ""}
                  alt={principal.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>

              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2">
                  {principal.categories.slice(0, 2).map((c) => (
                    <span
                      key={c.slug}
                      className="eyebrow rounded-full bg-accent-tint px-2.5 py-1.5 text-accent-strong"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>

                <h3 className="display mt-5 text-[clamp(1.5rem,2.8vw,2.15rem)] leading-tight text-foreground">
                  {principal.title}
                </h3>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {principal.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3 text-accent" strokeWidth={2.2} />
                    {principal.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3 text-accent" strokeWidth={2.2} />
                    {principal.minutes} min de lectura
                  </span>
                </div>

                <a
                  href={`/novedades/${principal.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-[30px] bg-accent px-5 py-3 text-[0.82rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
                >
                  Continuar leyendo
                  <ArrowRight className="size-4" strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="aspect-[16/10] animate-pulse rounded-[6px] bg-surface" />
            <div className="space-y-4">
              <div className="h-5 w-32 animate-pulse rounded-full bg-surface" />
              <div className="h-9 w-full animate-pulse rounded-[6px] bg-surface" />
              <div className="h-24 w-full animate-pulse rounded-[6px] bg-surface" />
            </div>
          </div>
        )}

        {/* Tres entradas siguientes, con el índice fantasma como en el portal */}
        {resto.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {resto.map((entrada, idx) => (
              <Reveal key={entrada.slug} i={idx}>
                <a
                  href={`/novedades/${entrada.slug}`}
                  className={cn(
                    "card-bar group relative flex h-full gap-4 overflow-hidden rounded-[6px] border border-border bg-surface p-4 shadow-card transition-shadow hover:shadow-card-hover",
                  )}
                >
                  <span
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-tint font-mono text-[0.66rem] font-semibold text-accent-strong"
                    aria-hidden
                  >
                    0{idx + 1}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[0.98rem] leading-snug font-bold text-foreground transition-colors group-hover:text-accent-strong">
                      {entrada.title}
                    </span>
                    <span className="mt-2 font-mono text-[0.66rem] text-muted-foreground">
                      {entrada.minutes} min de lectura
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal className="mt-10 text-center">
          <a
            href="/novedades"
            className="inline-flex items-center gap-2 rounded-[30px] border border-border bg-surface px-6 py-3.5 text-[0.84rem] font-bold text-foreground shadow-card transition-colors hover:border-accent hover:text-accent-strong"
          >
            Ver las 30 entradas del blog
            <ArrowRight className="size-4" strokeWidth={2.4} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
