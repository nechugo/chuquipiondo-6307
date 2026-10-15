import { ArrowRight, ArrowUp, Code2, Mail, MapPin } from "lucide-react";
import { PortalLogo } from "./portal-logo";

const INFORMACION = [
  { href: "/", label: "Inicio" },
  { href: "/novedades", label: "Sobre Nechugo" },
  { href: "#", label: "Política editorial" },
  { href: "#", label: "Política de correcciones" },
  { href: "#", label: "Política de privacidad" },
  { href: "#", label: "Política de cookies" },
  { href: "#", label: "Información sobre cookies" },
  { href: "#", label: "Configurar cookies" },
  { href: "#", label: "Aviso legal" },
  { href: "#", label: "Contacto" },
];

const NAVEGACION = [
  { href: "/novedades?categoria=liderazgo", label: "Liderazgo" },
  { href: "/novedades?categoria=gestion", label: "Gestión" },
  { href: "/novedades?categoria=formacion", label: "Formación" },
  { href: "/novedades?categoria=fe-y-vida", label: "Fe y Vida" },
  { href: "/novedades?categoria=testimonios", label: "Testimonios" },
  { href: "/novedades?categoria=recursos", label: "Recursos" },
];

export function PortalFooter() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.1fr_0.9fr_1fr]">
        <div>
          <PortalLogo />
          <p className="eyebrow mt-7 text-accent">Sobre Nechugo</p>
          <p className="mt-4 max-w-sm text-[0.86rem] leading-relaxed text-white/55">
            Portal de liderazgo, gestión, formación y fe. Compartimos contenidos, reflexiones y
            recursos para crecer con propósito y generar un impacto positivo.
          </p>
          <a
            href="/novedades"
            className="mt-6 inline-flex items-center gap-2 rounded-[30px] bg-accent px-5 py-3 text-[0.78rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff]"
          >
            Conoce más sobre nosotros
            <ArrowRight className="size-3.5" strokeWidth={2.4} />
          </a>
        </div>

        <div>
          <p className="eyebrow text-accent">Información del portal</p>
          <ul className="mt-5 space-y-2.5">
            {INFORMACION.map((link) => (
              <li key={link.label}>
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
          <p className="eyebrow text-accent">Navegación</p>
          <ul className="mt-5 space-y-2.5">
            {NAVEGACION.map((link) => (
              <li key={link.label}>
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
          <p className="eyebrow text-accent">Contacto</p>
          <ul className="mt-5 space-y-3 text-[0.84rem] text-white/60">
            <li>
              <a
                href="mailto:nechugo2@gmail.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-3.5 text-accent" strokeWidth={2.2} />
                nechugo2@gmail.com
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-accent" strokeWidth={2.2} />
              Lima, Perú
            </li>
          </ul>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="eyebrow text-white/40">Este sitio además incluye</p>
            <a
              href="/auditoria"
              className="mt-4 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-white/70 transition-colors hover:text-accent"
            >
              <Code2 className="size-4 text-accent" strokeWidth={2.2} />
              Auditoría de código del portal
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="font-mono text-[0.72rem] text-white/40">
            © 2026 NECHUGO — Todos los derechos reservados. | Lima, Perú.
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
