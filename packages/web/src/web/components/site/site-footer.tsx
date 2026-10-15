import { ArrowUp, Code2 } from "lucide-react";
import { META } from "../../lib/audit";

const PORTAL = [
  { href: "#resumen", label: "Resumen" },
  { href: "#componentes", label: "Componentes" },
  { href: "#hallazgos", label: "Hallazgos" },
  { href: "#pendiente", label: "Pendiente" },
  { href: "#verificado", label: "Verificado" },
  { href: "#reproducir", label: "Reproducir" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#4cc4ff] to-[#0b93d8] text-white">
              <Code2 className="size-[18px]" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.02rem] font-extrabold tracking-tight text-white">
                NECHUGO
              </span>
              <span className="mt-1 text-[0.66rem] font-medium tracking-[0.16em] text-white/40 uppercase">
                auditoría de código
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[0.86rem] leading-relaxed text-white/55">
            Revisión de los 174 archivos PHP de la suite WordPress {META.version}: un error fatal de
            sintaxis corregido, tres endurecimientos de seguridad y el hueco de CI que dejó pasar el
            fallo.
          </p>
        </div>

        <div>
          <p className="eyebrow text-accent">Información del informe</p>
          <ul className="mt-5 space-y-2.5">
            {PORTAL.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.84rem] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-accent">Datos de la revisión</p>
          <dl className="mt-5 space-y-2.5 font-mono text-[0.78rem] text-white/60">
            <div className="flex justify-between gap-4 border-b border-white/10 pb-2.5">
              <dt className="text-white/40">repo</dt>
              <dd>{META.repo}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-2.5">
              <dt className="text-white/40">rama</dt>
              <dd className="text-right break-all">{META.branch}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-2.5">
              <dt className="text-white/40">commit</dt>
              <dd>{META.commit}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/40">versión</dt>
              <dd>{META.version}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="font-mono text-[0.72rem] text-white/40">
            © 2026 NECHUGO · Todos los derechos reservados · Nelson Nechugo
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-white/55 transition-colors hover:text-accent"
          >
            Volver arriba
            <ArrowUp className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
