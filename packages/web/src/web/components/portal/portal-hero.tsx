import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Play, Ruler, Users } from "lucide-react";
import { cn } from "../../lib/utils";
import { EyebrowPill } from "../site/primitives";

interface Slide {
  eyebrow: string;
  title: string;
  sub: string;
  image: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; icon: "play" | "compass" };
}

const SLIDES: Slide[] = [
  {
    eyebrow: "¡Juntos, sí podemos!",
    title: "Lidera Con Propósito, Gestiona Con Excelencia Y Forma Con Impacto.",
    sub: "Un portal para personas, líderes, organizaciones y ministerios que desean fortalecer su carácter, ordenar su gestión y convertir sus ideas en resultados con propósito.",
    image: "/portal/20200223_213016-scaled.jpg",
    primary: { label: "Explorar contenidos", href: "/novedades" },
    secondary: { label: "Escuchar música", href: "/novedades?categoria=musica", icon: "play" },
  },
  {
    eyebrow: "Novedades",
    title: "Historias Reales, Formación Útil Y Liderazgo Que Se Aplica.",
    sub: "Treinta entradas sobre liderazgo, gestión, formación y fe, con su texto completo y sus imágenes, publicadas a lo largo de todo el año.",
    image: "/portal/Centro_de_Liderazgo-NC.jpg",
    primary: { label: "Ver novedades", href: "/novedades" },
    secondary: { label: "Ir al archivo", href: "/novedades", icon: "compass" },
  },
  {
    eyebrow: "Formación",
    title: "Aprende, Ordena Tus Ideas Y Multiplica El Impacto.",
    sub: "Contenidos aplicables para fortalecer el carácter, ordenar la gestión y desarrollar los dones, las capacidades y el potencial que ya tienes.",
    image: "/portal/20200223_210753-scaled.jpg",
    primary: { label: "Empezar a leer", href: "/novedades" },
    secondary: { label: "Ver categorías", href: "/novedades?categoria=formacion", icon: "compass" },
  },
];

const CARDS = [
  { icon: Compass, title: "Lidera", sub: "Propósito que inspira" },
  { icon: Ruler, title: "Gestiona", sub: "Orden que genera resultados" },
  { icon: Users, title: "Forma", sub: "Multiplica el impacto" },
];

export function PortalHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const go = useCallback((n: number) => setI((prev) => (prev + n + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % total), 7500);
    return () => window.clearInterval(t);
  }, [paused, total]);

  return (
    <section
      className="relative isolate overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Portada del portal"
    >
      {/* Fondos: se apilan y se funden, así el cambio no da saltos de altura. */}
      <div className="absolute inset-0" aria-hidden>
        {SLIDES.map((slide, idx) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-[900ms] ease-out",
              idx === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00023f]/95 via-[#00023f]/80 to-[#00023f]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00023f]/85 via-transparent to-[#00023f]/40" />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        {/* Columna de texto */}
        <div className="max-w-2xl">
          <EyebrowPill dark>{SLIDES[i].eyebrow}</EyebrowPill>

          <h1
            key={SLIDES[i].title}
            className="display mt-7 text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[1.04] text-white"
            style={{ animation: "fade-up 620ms ease-out both" }}
          >
            {SLIDES[i].title}
          </h1>

          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
            {SLIDES[i].sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={SLIDES[i].primary.href}
              className="inline-flex items-center gap-2 rounded-[30px] bg-accent px-6 py-3.5 text-[0.86rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
            >
              {SLIDES[i].primary.label}
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </a>
            <a
              href={SLIDES[i].secondary.href}
              className="inline-flex items-center gap-2 rounded-[30px] border border-white/30 px-6 py-3.5 text-[0.86rem] font-bold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {SLIDES[i].secondary.icon === "play" ? (
                <Play className="size-4 fill-current" strokeWidth={0} />
              ) : (
                <Compass className="size-4" strokeWidth={2.2} />
              )}
              {SLIDES[i].secondary.label}
            </a>
          </div>
        </div>

        {/* Emblema y tarjetas: en columna, así ninguna tapa el símbolo central. */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-10">
          <div className="flex flex-col items-center">
            <div className="glass flex size-[182px] items-center justify-center rounded-full border border-white/25 bg-white/10">
              <span className="flex size-[132px] items-center justify-center rounded-full bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8]">
                <Compass className="size-14 text-white/95" strokeWidth={1.4} />
              </span>
            </div>
            <p className="mt-4 font-mono text-[0.66rem] tracking-[0.24em] text-white/55 uppercase">
              Visión · Orden · Impacto
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            {CARDS.map((card, idx) => (
              <div
                key={card.title}
                className={cn(
                  "glass flex items-center gap-3.5 rounded-[14px] border border-white/20 bg-white/10 px-5 py-3.5 shadow-glass",
                )}
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-white/15 text-accent">
                  <card.icon className="size-[18px]" strokeWidth={2.1} />
                </span>
                <span className="flex flex-1 flex-col leading-tight">
                  <span className="font-display text-[1.02rem] font-bold text-white">
                    {card.title}
                  </span>
                  <span className="text-[0.72rem] text-white/60">{card.sub}</span>
                </span>
                <span className="font-mono text-[0.62rem] text-white/35">0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 pb-10">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Diapositivas">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Diapositiva ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === i ? "w-9 bg-accent" : "w-4 bg-white/30 hover:bg-white/55",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Diapositiva anterior"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white/75 transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Diapositiva siguiente"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white/75 transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="size-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
