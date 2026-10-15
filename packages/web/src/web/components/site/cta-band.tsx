import { Check, GitBranch, ShieldCheck } from "lucide-react";
import { CTA, META } from "../../lib/audit";
import { Reveal, useCopy } from "./reveal";

export function CtaBand() {
  const { copied, copy } = useCopy();

  return (
    <section className="pb-24 sm:pb-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[8px] bg-navy px-8 py-12 sm:px-12 sm:py-14">
            <div
              className="pointer-events-none absolute -top-24 right-[-6%] size-[26rem] rounded-full opacity-40 blur-[110px]"
              style={{ background: "radial-gradient(circle, #1bacf6 0%, transparent 68%)" }}
              aria-hidden
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8] text-white">
                    <ShieldCheck className="size-[18px]" strokeWidth={2.2} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-[30px] border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-[0.7rem] text-white/80">
                    <GitBranch className="size-3 text-accent" />
                    {META.branch} · {META.commit}
                  </span>
                </div>
                <h2 className="display mt-6 text-[clamp(1.7rem,3.2vw,2.6rem)] text-white">
                  {CTA.headline}
                </h2>
                <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-white/70">
                  {CTA.body}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:w-[256px]">
                <button
                  type="button"
                  onClick={() => copy(META.reportPath)}
                  className="inline-flex items-center justify-center gap-2 rounded-[30px] bg-accent px-5 py-3.5 text-[0.86rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
                >
                  {copied ? <Check className="size-4" /> : null}
                  {copied ? "Ruta copiada" : "Copiar ruta del informe"}
                </button>
                <a
                  href="#hallazgos"
                  className="inline-flex items-center justify-center gap-2 rounded-[30px] border border-white/25 bg-white/10 px-5 py-3.5 text-[0.86rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Volver a los hallazgos
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
