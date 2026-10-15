import { Terminal } from "lucide-react";
import { COMMANDS } from "../../lib/audit";
import { Reveal } from "./reveal";
import { CodeBlock, SectionHeading } from "./primitives";

export function Reproduce() {
  return (
    <section id="reproducir" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Comprobarlo tú"
          title="Tres comandos y lo ves con tus ojos"
          sub="No hace falta creerme: clona, cambia a la rama y ejecuta el mismo lint que ahora corre el CI. El paso tres comprueba el fallo original sobre main."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-5">
          {COMMANDS.map((command, index) => (
            <Reveal key={command.label} i={index}>
              <div>
                <p className="mb-2.5 flex items-center gap-2.5 text-[0.86rem] font-bold text-foreground">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-accent-tint">
                    <Terminal className="size-3.5 text-accent-strong" strokeWidth={2.4} />
                  </span>
                  {command.label}
                </p>
                <CodeBlock snippet={{ label: "shell", variant: "shell", code: command.code }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
