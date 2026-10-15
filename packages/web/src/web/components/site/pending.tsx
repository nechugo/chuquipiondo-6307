import { PENDING_EXTRA } from "../../lib/audit";
import { Reveal } from "./reveal";
import { Card, SectionHeading } from "./primitives";

export function Pending() {
  return (
    <section id="pendiente" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Anotado, sin tocar"
          title="Cuatro cosas que dejé como estaban"
          sub="Ninguna es un fallo: son deuda técnica consciente o código de terceros. Las tres decisiones de fondo — zips, traducciones y análisis estático — están arriba, en los hallazgos 07, 08 y 09."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PENDING_EXTRA.map((item, index) => (
            <Reveal key={item.title} i={index % 2}>
              <Card index={String(index + 1).padStart(2, "0")} className="p-6 pt-7 sm:p-7 sm:pt-8">
                <h3 className="max-w-[78%] font-display text-[1.05rem] font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
