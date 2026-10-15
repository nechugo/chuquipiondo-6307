import { Check } from "lucide-react";
import { VERIFIED } from "../../lib/audit";
import { Reveal } from "./reveal";
import { Card, SectionHeading } from "./primitives";

export function Verified() {
  return (
    <section id="verificado" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Lo que está bien"
          title="Diez comprobaciones que pasan"
          sub="El repaso no era solo buscar lo roto. Esto es lo que revisé a fondo y no necesita cambios."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <Reveal>
            <Card tone="tint" className="p-6 pt-7 sm:p-8 sm:pt-9">
              <div className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {VERIFIED.map((item, index) => (
                  <Reveal key={item} i={index % 2}>
                    <div className="flex items-start gap-3 py-3">
                      <span className="mt-0.5 inline-flex size-[19px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8]">
                        <Check className="size-3 text-white" strokeWidth={3.2} />
                      </span>
                      <span className="text-[0.9rem] leading-relaxed text-body">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
