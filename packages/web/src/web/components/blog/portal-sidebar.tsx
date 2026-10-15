import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Compass, Flame, Layers, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { CATEGORIAS, loadNovedades, TOTAL_ENTRADAS, type Novedad } from "../../lib/novedades";

/** Cabecera de cada widget lateral. */
function WidgetTitulo({ icon: Icon, children }: { icon: typeof Flame; children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 border-b border-border pb-3">
      <Icon className="size-3.5 text-accent" strokeWidth={2.4} />
      <span className="eyebrow text-foreground">{children}</span>
    </h2>
  );
}

function Widget({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[6px] border border-border bg-surface p-5 shadow-card", className)}>
      {children}
    </section>
  );
}

/**
 * Tarjeta de marca del lateral. Sustituye al folleto de imagen del portal: se
 * dibuja en código para que no arrastre publicidad rasterizada ni la marca vieja.
 */
function TarjetaMarca() {
  return (
    <section className="relative isolate overflow-hidden rounded-[6px] bg-navy px-6 py-7 text-center">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full opacity-50 blur-[70px]"
        style={{ background: "radial-gradient(circle, #1bacf6 0%, transparent 70%)" }}
        aria-hidden
      />
      <div className="relative">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc4ff] via-[#1bacf6] to-[#0b93d8] text-white shadow-[0_12px_28px_-12px_rgba(27,172,246,0.95)]">
          <svg viewBox="0 0 24 24" className="size-7" fill="none">
            <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M4.9 10.4h14.2M4.9 13.6h14.2M12 4.6c1.9 2.2 2.9 4.7 2.9 7.4s-1 5.2-2.9 7.4c-1.9-2.2-2.9-4.7-2.9-7.4S10.1 6.8 12 4.6Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="display mt-4 text-[1.3rem] text-white">NECHUGO</p>
        <p className="mt-2 font-mono text-[0.6rem] tracking-[0.22em] text-white/50 uppercase">
          Visión · Liderazgo · Formación
        </p>
        <p className="display mt-5 text-[1.15rem] text-white">Lee. Reflexiona. Crece.</p>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-white/55">
          Contenido que edifica tu vida.
        </p>
        <a
          href="/novedades"
          className="mt-5 inline-flex items-center gap-2 rounded-[30px] bg-accent px-5 py-2.5 text-[0.78rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
        >
          <Compass className="size-3.5" strokeWidth={2.4} />
          Explorar artículos
        </a>
      </div>
    </section>
  );
}

/**
 * Barra lateral de los listados y de la entrada. Datos reales del blog.
 *
 * `buscar` es el buscador del listado, que abre la columna: el listado ya no
 * lleva cabecera propia, así que el buscador vive aquí. En móvil la barra cae
 * debajo del listado, por eso este widget se oculta y el listado pone su propia
 * copia arriba (ver `pages/novedades.tsx`).
 */
export function PortalSidebar({
  excluir,
  buscar,
}: {
  excluir?: string;
  buscar?: ReactNode;
}) {
  const [entradas, setEntradas] = useState<Novedad[] | null>(null);

  useEffect(() => {
    let vivo = true;
    loadNovedades().then((d) => {
      if (vivo) setEntradas(d);
    });
    return () => {
      vivo = false;
    };
  }, []);

  // «Lo más leído» no existe como métrica en este sitio: se aproxima por
  // extensión, que es estable y no cambia entre visitas.
  const masLeido = entradas
    ? [...entradas].sort((a, b) => b.words - a.words).filter((e) => e.slug !== excluir).slice(0, 5)
    : [];

  const ultimo = entradas
    ? entradas.filter((e) => e.slug !== excluir).slice(0, 4)
    : [];

  return (
    <aside className="flex flex-col gap-6">
      {buscar ? <div className="hidden lg:block">{buscar}</div> : null}

      <TarjetaMarca />

      <Widget>
        <WidgetTitulo icon={Flame}>Lo más leído</WidgetTitulo>
        <ol className="mt-4 space-y-4">
          {(masLeido.length ? masLeido : Array.from({ length: 5 })).map((entrada, idx) =>
            entrada ? (
              <li key={entrada.slug}>
                <a
                  href={`/novedades/${entrada.slug}`}
                  aria-label={entrada.title}
                  className="group flex gap-3.5"
                >
                  <img
                    src={entrada.image ?? ""}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-[62px] shrink-0 rounded-[4px] object-cover"
                  />
                  <span className="flex flex-col justify-center">
                    <span className="text-[0.82rem] leading-snug font-semibold text-accent-strong transition-colors group-hover:text-foreground">
                      {entrada.title}
                    </span>
                  </span>
                </a>
              </li>
            ) : (
              <li key={idx} className="flex gap-3.5">
                <span className="size-[62px] shrink-0 animate-pulse rounded-[4px] bg-surface-muted" />
                <span className="h-9 flex-1 animate-pulse rounded-[4px] bg-surface-muted" />
              </li>
            ),
          )}
        </ol>
      </Widget>

      <Widget>
        <WidgetTitulo icon={Layers}>Categorías</WidgetTitulo>
        <ul className="mt-3">
          {CATEGORIAS.map((c) => (
            <li key={c.slug}>
              <a
                href={`/novedades?categoria=${c.slug}`}
                className="group flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0"
              >
                <span className="text-[0.84rem] font-medium text-muted-foreground transition-colors group-hover:text-accent-strong">
                  {c.name}
                </span>
                <span className="font-mono text-[0.7rem] text-muted-foreground/60">{c.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget>
        <WidgetTitulo icon={Sparkles}>Lo último</WidgetTitulo>
        <ul className="mt-4 space-y-3.5">
          {ultimo.map((entrada) => (
            <li key={entrada.slug}>
              <a
                href={`/novedades/${entrada.slug}`}
                className="text-[0.82rem] leading-snug font-medium text-muted-foreground transition-colors hover:text-accent-strong"
              >
                {entrada.title}
              </a>
              <p className="mt-1 font-mono text-[0.66rem] text-muted-foreground/60">
                {entrada.dateLabel}
              </p>
            </li>
          ))}
        </ul>
        <a
          href="/novedades"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-accent-strong transition-colors hover:text-foreground"
        >
          Ver las {TOTAL_ENTRADAS} entradas
          <ArrowRight className="size-3.5" strokeWidth={2.4} />
        </a>
      </Widget>
    </aside>
  );
}
