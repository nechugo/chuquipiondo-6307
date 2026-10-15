import { useEffect, useState } from "react";
import { ArrowDown, Code2, Mail, Radio } from "lucide-react";
import { cn } from "../../lib/utils";
import { META } from "../../lib/audit";

/** Anchor links are absolute so the header works from the blog routes too. */
const LINKS = [
  { href: "/", label: "Portada" },
  { href: "/auditoria#resumen", label: "Resumen" },
  { href: "/auditoria#componentes", label: "Componentes" },
  { href: "/auditoria#hallazgos", label: "Hallazgos" },
  { href: "/auditoria#pendiente", label: "Pendiente" },
  { href: "/auditoria#verificado", label: "Verificado" },
  { href: "/novedades", label: "Novedades" },
];

export function SiteNav({ active }: { active?: string }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top strip — same information bar the portal carries above the header. */}
      <div className="bg-navy-deep text-white/65">
        <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between gap-4 px-6 text-[0.72rem]">
          <p className="flex items-center gap-2">
            <Radio className="size-3 text-accent" strokeWidth={2.2} />
            <span>Auditoría de código</span>
            <span className="text-white/30">·</span>
            <span className="font-mono">{META.version}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-white/45 md:inline">{META.date}</span>
            <span className="hidden text-white/20 md:inline">|</span>
            <span className="hidden items-center gap-1.5 md:flex">
              <Mail className="size-3 text-accent" strokeWidth={2.2} />
              Nelson Nechugo
            </span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 bg-navy transition-shadow duration-300",
          solid && "shadow-[0_10px_30px_-18px_rgba(0,2,71,0.75)]",
        )}
      >
        <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between gap-6 px-6">
          <a href="/auditoria" className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8] text-white">
              <Code2 className="size-[18px]" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.02rem] font-extrabold tracking-tight text-white">
                NECHUGO
              </span>
              <span className="mt-1 text-[0.66rem] font-medium tracking-[0.16em] text-white/45 uppercase">
                auditoría de código
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.label;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-[0.76rem] font-semibold tracking-[0.1em] uppercase transition-colors",
                    isActive ? "text-accent" : "text-white/70 hover:text-accent",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={active === "Novedades" ? "/auditoria" : "/auditoria#reproducir"}
              className="inline-flex items-center gap-2 rounded-[30px] bg-accent px-4 py-2.5 text-[0.8rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
            >
              {active === "Novedades" ? "Ver la auditoría" : "Reproducir"}
              <ArrowDown className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Strip for small screens: the desktop nav is hidden below lg. */}
        <nav className="border-t border-white/10 lg:hidden">
          <div className="code-scroll mx-auto flex max-w-[1240px] items-center gap-5 overflow-x-auto px-6 py-2.5">
            {LINKS.map((link) => {
              const isActive = active === link.label;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "shrink-0 text-[0.7rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors",
                    isActive ? "text-accent" : "text-white/60 hover:text-accent",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>
      </header>
    </>
  );
}
