import { ArrowRight, Eye, HandHeart, Sparkles, Target } from "lucide-react";
import { Card, EyebrowPill, IconBadge } from "../site/primitives";
import { Reveal } from "../site/reveal";

const PILARES = [
  {
    icon: Target,
    title: "Misión",
    body: "Crear y compartir contenidos útiles sobre liderazgo, gestión, formación y fe, que fortalezcan el carácter, ordenen las ideas y ayuden a las personas a avanzar con propósito.",
  },
  {
    icon: Eye,
    title: "Visión",
    body: "Ser un portal reconocido por ofrecer contenidos confiables, formativos e inspiradores, capaces de influir positivamente en personas, líderes, organizaciones y ministerios.",
  },
  {
    icon: HandHeart,
    title: "Compromiso",
    body: "Comunicar con responsabilidad, respeto y claridad, promoviendo valores, aprendizaje continuo y contenidos que aporten orientación y soluciones reales a nuestros lectores.",
  },
];

export function PortalEsencia() {
  return (
    <section className="bg-surface-muted py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <EyebrowPill>Nuestra esencia</EyebrowPill>
          <h2 className="display mt-6 text-[clamp(2rem,4vw,3.15rem)] text-foreground">
            Nuestra Esencia
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
            Principios que orientan nuestro contenido, nuestra forma de comunicar y el impacto
            positivo que buscamos generar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILARES.map((pilar, idx) => (
            <Reveal key={pilar.title} i={idx}>
              <Card index={`0${idx + 1}`} className="h-full p-7">
                <IconBadge>
                  <pilar.icon className="size-5" strokeWidth={2.1} />
                </IconBadge>
                <h3 className="display mt-6 text-[1.42rem] text-foreground">{pilar.title}</h3>
                <p className="mt-3.5 text-[0.92rem] leading-relaxed text-muted-foreground">
                  {pilar.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-col items-center justify-between gap-5 rounded-[6px] border border-border bg-surface px-7 py-6 shadow-card sm:flex-row">
            <p className="inline-flex items-center gap-2.5 text-[0.88rem] font-semibold text-foreground">
              <Sparkles className="size-4 text-accent" strokeWidth={2.2} />
              Contenido con propósito, pensado para generar un impacto positivo.
            </p>
            <a
              href="/novedades"
              className="inline-flex shrink-0 items-center gap-2 rounded-[30px] bg-navy px-5 py-3 text-[0.82rem] font-bold text-white transition-colors hover:bg-accent hover:text-on-accent"
            >
              Explora nuestras soluciones
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
