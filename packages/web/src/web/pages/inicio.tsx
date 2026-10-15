import { useEffect } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { PortalNav } from "../components/portal/portal-nav";
import { PortalHero } from "../components/portal/portal-hero";
import { PortalEsencia } from "../components/portal/portal-esencia";
import { PortalPilares } from "../components/portal/portal-pilares";
import { PortalRecientes } from "../components/portal/portal-recientes";
import { PortalFooter } from "../components/portal/portal-footer";

const TITULO = "NECHUGO — Liderazgo, gestión, formación y fe";
const DESCRIPCION =
  "Portal de liderazgo, gestión, formación y fe. Contenidos, reflexiones y recursos para fortalecer el carácter, ordenar la gestión y avanzar con propósito.";

export default function Inicio() {
  useEffect(() => {
    document.title = TITULO;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", DESCRIPCION);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background">
      <PortalNav />
      <main>
        <PortalHero />
        <PortalEsencia />
        <PortalPilares />

        {/* Puente hacia el informe: la portada es del portal, el informe vive aparte. */}
        <section className="bg-navy py-14">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="eyebrow text-accent">Documentación técnica</p>
              <h2 className="display mt-3 text-[clamp(1.5rem,3vw,2.15rem)] text-white">
                La auditoría de código de este portal
              </h2>
              <p className="mt-3 max-w-2xl text-[0.94rem] leading-relaxed text-white/60">
                174 archivos PHP revisados: un error fatal de sintaxis corregido, tres
                endurecimientos de seguridad y el hueco de CI que dejó pasar el fallo.
              </p>
            </div>
            <a
              href="/auditoria"
              className="inline-flex shrink-0 items-center gap-2 rounded-[30px] bg-accent px-6 py-3.5 text-[0.84rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
            >
              <Code2 className="size-4" strokeWidth={2.2} />
              Ver la auditoría
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </a>
          </div>
        </section>

        <PortalRecientes />
      </main>
      <PortalFooter />
    </div>
  );
}
