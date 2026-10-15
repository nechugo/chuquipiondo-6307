import {
  Blocks,
  GitBranch,
  LayoutTemplate,
  Newspaper,
  PanelTop,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { COMPONENTS } from "../../lib/audit";
import { Reveal } from "./reveal";
import { Card, IconBadge, SectionHeading } from "./primitives";

const ICONS: Record<string, LucideIcon> = {
  "layout-template": LayoutTemplate,
  "git-branch": GitBranch,
  blocks: Blocks,
  "panel-top": PanelTop,
  sparkles: Sparkles,
  newspaper: Newspaper,
};

export function ComponentsGrid() {
  return (
    <section id="componentes" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Qué hay dentro"
          title="Seis entregables, un solo ecosistema"
          sub="La suite completa: tema padre e hijo, tres plugins y un tema paralelo. Los revisé todos, incluido el que el CI no miraba."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS.map((component, index) => {
            const Icon = ICONS[component.icon] ?? Blocks;
            const flagged = component.name === "nechugo-news";

            return (
              <Reveal key={component.name} i={index % 3}>
                <Card
                  index={String(index + 1).padStart(2, "0")}
                  className={cn(
                    "p-6 pt-7",
                    flagged && "border-danger/25 from-danger-tint to-white",
                  )}
                >
                  <IconBadge tone={flagged ? "danger" : "accent"}>
                    <Icon className="size-5" strokeWidth={2} />
                  </IconBadge>

                  <h3 className="mt-6 font-mono text-[0.9rem] font-medium tracking-tight text-foreground">
                    {component.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted-foreground">
                    {component.desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="font-mono text-[0.7rem] text-muted-foreground">
                      {component.files}
                    </span>
                    {flagged ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-tint px-2.5 py-1 font-mono text-[0.68rem] font-medium text-danger">
                        <TriangleAlert className="size-3" />
                        {component.version}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-accent-tint px-2.5 py-1 font-mono text-[0.68rem] font-medium text-accent-strong">
                        {component.version}
                      </span>
                    )}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
