import { useState } from "react";
import { Check, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import { FINDINGS, type Priority } from "../../lib/audit";
import { Card, CodeBlock, Chip, PriorityChip, SectionHeading } from "./primitives";
import { Reveal } from "./reveal";

const FILTERS: { value: Priority | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "P0", label: "P0 · crítico" },
  { value: "P1", label: "P1 · importante" },
  { value: "P2", label: "P2 · pendiente" },
];

export function Findings() {
  const [filter, setFilter] = useState<Priority | "todos">("todos");
  const visible = FINDINGS.filter((finding) => filter === "todos" || finding.priority === filter);

  return (
    <section id="hallazgos" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Los hallazgos"
          title="Nueve cosas, seis ya corregidas"
          sub="Dos críticas, cuatro importantes y tres decisiones que son tuyas. Cada una con el archivo exacto, qué pasaba y el código antes y después."
        />

        <Reveal i={1} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {FILTERS.map((item) => {
              const active = filter === item.value;
              const count =
                item.value === "todos"
                  ? FINDINGS.length
                  : FINDINGS.filter((f) => f.priority === item.value).length;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[30px] px-4 py-2.5 text-[0.8rem] font-semibold transition-colors",
                    active
                      ? "bg-navy text-white shadow-[0_12px_28px_-16px_rgba(0,2,71,0.8)]"
                      : "border border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "font-mono text-[0.68rem]",
                      active ? "text-white/55" : "text-muted-foreground/70",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 space-y-6">
          {visible.map((finding, position) => (
            <Reveal key={finding.id} i={position % 2}>
              <Card className="p-6 pt-7 sm:p-8 sm:pt-9 lg:p-10 lg:pt-11">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <PriorityChip priority={finding.priority} />
                    <Chip tone={finding.status === "corregido" ? "ok" : "neutral"}>
                      {finding.status === "corregido" ? (
                        <Check className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
                      {finding.status}
                    </Chip>
                  </div>
                  <span
                    className="ghost-num shrink-0 text-[2.6rem] select-none sm:text-[3.4rem]"
                    aria-hidden
                  >
                    {finding.index}
                  </span>
                </div>

                <h3 className="display mt-5 text-[clamp(1.35rem,2.4vw,1.85rem)] text-foreground">
                  {finding.title}
                </h3>

                <p className="mt-3 flex items-start gap-2 font-mono text-[0.72rem] leading-relaxed break-all text-muted-foreground">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-accent" strokeWidth={2.4} />
                  {finding.location}
                </p>

                <div className="mt-7 grid gap-6 border-t border-border pt-7 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <p className="eyebrow text-accent-strong">Qué pasaba</p>
                    <p className="mt-3 text-[0.93rem] leading-relaxed text-body">{finding.what}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-accent-strong">Impacto</p>
                    <p className="mt-3 text-[0.93rem] leading-relaxed text-body">{finding.impact}</p>
                  </div>
                </div>

                <div
                  className={cn(
                    "mt-8 grid gap-3",
                    finding.snippets.length > 1 && "xl:grid-cols-2",
                  )}
                >
                  {finding.snippets.map((snippet) => (
                    <CodeBlock key={snippet.label} snippet={snippet} />
                  ))}
                </div>

                {finding.note ? (
                  <p className="mt-6 rounded-[6px] border-l-[3px] border-accent bg-accent-tint/60 py-3 pl-4 text-[0.88rem] leading-relaxed text-body">
                    {finding.note}
                  </p>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
