import { BarChart3, Compass, GraduationCap } from "lucide-react";
import { Card, EyebrowPill, IconBadge } from "../site/primitives";
import { Reveal } from "../site/reveal";

const EJES = [
  {
    icon: Compass,
    title: "Liderar",
    body: "Desarrolla un liderazgo con carácter sólido, visión clara y valentía para tomar decisiones, afrontar desafíos y generar cambios positivos en tu entorno.",
  },
  {
    icon: BarChart3,
    title: "Gestionar",
    body: "Aprende a organizar ideas, recursos y procesos para tomar mejores decisiones, alcanzar resultados sostenibles y construir organizaciones sólidas, claras y funcionales.",
  },
  {
    icon: GraduationCap,
    title: "Formar",
    body: "Fortalece tu crecimiento personal, profesional, espiritual y ministerial, desarrollando los dones, las capacidades y el potencial que Dios ha puesto en ti.",
  },
];

export function PortalPilares() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <EyebrowPill>Nuestros pilares</EyebrowPill>
          <h2 className="display mt-6 text-[clamp(2rem,4vw,3.15rem)] text-foreground">
            Convertimos Los Desafíos En Oportunidades
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
            Nuestra propuesta se sostiene en tres pilares que fortalecen el carácter, ordenan la
            gestión y desarrollan capacidades para generar un impacto positivo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {EJES.map((eje, idx) => (
            <Reveal key={eje.title} i={idx}>
              <Card index={`0${idx + 1}`} tone="tint" className="h-full p-7">
                <IconBadge>
                  <eje.icon className="size-5" strokeWidth={2.1} />
                </IconBadge>
                <h3 className="display mt-6 text-[1.42rem] text-foreground">{eje.title}</h3>
                <p className="mt-3.5 text-[0.92rem] leading-relaxed text-muted-foreground">
                  {eje.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="flex flex-wrap items-center justify-center gap-3 font-mono text-[0.72rem] tracking-[0.2em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Visión
            <span className="text-border">·</span>
            Datos
            <span className="text-border">·</span>
            Impacto
          </p>
        </Reveal>
      </div>
    </section>
  );
}
