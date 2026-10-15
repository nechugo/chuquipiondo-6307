import { ArrowDown, ArrowRight, TriangleAlert } from "lucide-react";
import { HERO, HERO_TERMINAL, STATS } from "../../lib/audit";
import { Card, CodeBlock, EyebrowPill } from "./primitives";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy pb-[9.5rem]">
      {/* Depth: a cyan bloom top-right and a navy wash bottom-left, like the portal hero. */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] size-[38rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #1bacf6 0%, transparent 68%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-12rem] left-[-8%] size-[34rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #2e4f67 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1240px] px-6 pt-20 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal i={0}>
            <EyebrowPill dark>{HERO.badge}</EyebrowPill>
          </Reveal>

          <Reveal i={1}>
            <h1 className="display mt-8 text-[clamp(2.3rem,5.6vw,4.3rem)] text-white">
              {HERO.headline.map((line, index) => (
                <span key={line} className="block">
                  {index === 2 ? (
                    <>
                      Y el{" "}
                      <span className="underline decoration-accent decoration-[6px] underline-offset-[10px]">
                        CI
                      </span>{" "}
                      no lo miraba.
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal i={2}>
            <p className="mx-auto mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-white/70">
              {HERO.sub}
            </p>
          </Reveal>

          <Reveal i={3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#hallazgos"
                className="inline-flex items-center gap-2 rounded-[30px] bg-accent px-6 py-3.5 text-[0.86rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
              >
                {HERO.primaryCta}
                <ArrowDown className="size-4" />
              </a>
              <a
                href="#reproducir"
                className="inline-flex items-center gap-2 rounded-[30px] border border-white/25 bg-white/10 px-6 py-3.5 text-[0.86rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <TriangleAlert className="size-3.5 text-accent" strokeWidth={2.4} />
                {HERO.secondaryCta}
                <ArrowRight className="size-4 text-white/60" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal i={4} className="mt-16">
          <div className="glass rounded-[10px] p-3 shadow-glass sm:p-4">
            <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
              {HERO_TERMINAL.map((snippet) => (
                <CodeBlock key={snippet.label} snippet={snippet} />
              ))}
            </div>
            <p className="px-2 pt-3 pb-1 font-mono text-[0.72rem] text-white/50">
              commit cfa96bd → el tema nechugo-news no llegaba a cargar · commit 1fcb4ca → 174
              archivos limpios
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div id="resumen" className="relative z-10 mx-auto -mt-[7rem] max-w-[1240px] px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} i={index}>
            <Card className="px-6 py-7">
              <p className="display text-[2.7rem] leading-none text-accent-strong">{stat.value}</p>
              <p className="mt-4 text-[0.92rem] font-bold text-foreground">{stat.label}</p>
              <p className="mt-1.5 font-mono text-[0.7rem] text-muted-foreground">{stat.hint}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
