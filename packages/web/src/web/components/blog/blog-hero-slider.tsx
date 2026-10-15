import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Novedad } from "../../lib/novedades";

/**
 * Slider de portada del listado. Replica el del tema del portal
 * (`chuquipiondo_blog_hero_slider`): las últimas entradas, la imagen a sangre y
 * encima **solo el titular**, con flechas a los lados y avance automático.
 *
 * Los valores salen del personalizador del tema:
 *  - diapositivas: 4 (el tema trae 5 por defecto, con margen de 2 a 10);
 *  - efecto: «slide» (deslizamiento horizontal) — el personalizador ofrece
 *    «fade», «slide» y «zoom» (Ken Burns), y aquí se deja el que pidió el
 *    cliente, con los tres implementados para poder cambiar de uno a otro;
 *  - autoplay activo, 6000 ms entre pasos;
 *  - relación 16:9, autoajustable al ancho de la columna de contenido, con
 *    520px de alto como techo (390px es el valor del tema).
 */
const DIAPOSITIVAS = 4;
const AUTOPLAY_MS = 6000;
const EFECTO: "fade" | "slide" | "zoom" = "slide";

export function BlogHeroSlider({ entradas }: { entradas: Novedad[] }) {
  const slides = useMemo(() => entradas.slice(0, DIAPOSITIVAS), [entradas]);
  const total = slides.length;
  const [i, setI] = useState(0);
  const [pausa, setPausa] = useState(false);

  const ir = useCallback(
    (n: number) => {
      if (total > 0) setI((n + total) % total);
    },
    [total],
  );

  // Autoplay: avanza sola, se detiene con el puntero o el foco encima y no
  // arranca si el sistema pide movimiento reducido.
  useEffect(() => {
    if (total < 2 || pausa) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((actual) => (actual + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [total, pausa]);

  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Últimas entradas"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onFocusCapture={() => setPausa(true)}
      onBlurCapture={() => setPausa(false)}
      className="relative isolate aspect-[16/9] max-h-[520px] min-h-[240px] overflow-hidden rounded-[6px] bg-navy shadow-card sm:min-h-[330px]"
    >
      {slides.map((entrada, idx) => {
        const activa = idx === i;
        return (
          <a
            key={entrada.slug}
            href={`/novedades/${entrada.slug}`}
            aria-hidden={!activa}
            tabIndex={activa ? undefined : -1}
            className={cn(
              "absolute inset-0 block transition-[opacity,transform] duration-[450ms] ease-out",
              EFECTO === "slide" && (activa ? "translate-x-0" : "translate-x-[4%]"),
              activa ? "z-10 opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <img
              src={entrada.image ?? ""}
              alt=""
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "h-full w-full object-cover brightness-[0.74]",
                EFECTO === "zoom" && "transition-transform duration-[6000ms] ease-linear",
                EFECTO === "zoom" && (activa ? "scale-[1.08]" : "scale-100"),
              )}
            />
            {/* Banda del titular al pie, al 60% de opacidad, como en el tema. */}
            <span className="display absolute inset-x-0 bottom-0 bg-[rgba(6,19,58,0.6)] px-6 py-4 text-[clamp(1.15rem,1rem+0.9vw,1.6rem)] leading-snug text-white [text-shadow:0_1px_3px_rgba(6,19,58,0.5)]">
              {entrada.title}
            </span>
          </a>
        );
      })}

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => ir(i - 1)}
            aria-label="Diapositiva anterior"
            className="absolute top-1/2 left-3 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-navy/85 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-on-accent"
          >
            <ChevronLeft className="size-4" strokeWidth={2.6} />
          </button>
          <button
            type="button"
            onClick={() => ir(i + 1)}
            aria-label="Diapositiva siguiente"
            className="absolute top-1/2 right-3 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-navy/85 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-on-accent"
          >
            <ChevronRight className="size-4" strokeWidth={2.6} />
          </button>
        </>
      ) : null}
    </section>
  );
}
