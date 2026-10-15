import { useEffect, useState } from "react";
import { Code2, Mail, MapPin, Menu, Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { PortalLogo } from "./portal-logo";

/** Categorías del portal. En este sitio resuelven al listado filtrado del blog. */
const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/novedades", label: "Novedades" },
  { href: "/novedades?categoria=liderazgo", label: "Liderazgo" },
  { href: "/novedades?categoria=gestion", label: "Gestión" },
  { href: "/novedades?categoria=formacion", label: "Formación" },
  { href: "/novedades?categoria=fe-y-vida", label: "Fe y Vida" },
  { href: "/novedades?categoria=recursos", label: "Recursos" },
];

export function PortalNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Barra superior del portal */}
      <div className="bg-navy-deep text-white/60">
        <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between gap-4 px-6 text-[0.72rem]">
          <p className="hidden items-center gap-1.5 sm:flex">
            <MapPin className="size-3 text-accent" strokeWidth={2.2} />
            Lima, Perú
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:nechugo2@gmail.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Mail className="size-3 text-accent" strokeWidth={2.2} />
              nechugo2@gmail.com
            </a>
            <span className="hidden text-white/20 sm:inline">|</span>
            <a
              href="/auditoria"
              className="hidden items-center gap-1.5 transition-colors hover:text-accent sm:inline-flex"
            >
              <Code2 className="size-3 text-accent" strokeWidth={2.2} />
              Auditoría de código
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 bg-navy transition-shadow duration-300",
          solid && "shadow-[0_10px_30px_-18px_rgba(0,2,71,0.75)]",
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-6 px-6">
          <a href="/" aria-label="Nechugo, inicio">
            <PortalLogo />
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.75rem] font-semibold tracking-[0.09em] text-white/75 uppercase transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="/novedades"
              aria-label="Buscar en el portal"
              className="hidden size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              <Search className="size-4" strokeWidth={2.2} />
            </a>
            <a
              href="/novedades"
              className="hidden items-center gap-2 rounded-[30px] bg-accent px-5 py-2.5 text-[0.78rem] font-bold text-on-accent transition-colors hover:bg-[#4cc4ff] sm:inline-flex"
            >
              Explorar contenidos
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent xl:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Tira desplazable para pantallas medianas: la nav completa solo entra en xl. */}
        <nav className="border-t border-white/10 xl:hidden">
          <div className="code-scroll mx-auto flex max-w-[1240px] items-center gap-5 overflow-x-auto px-6 py-2.5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 text-[0.7rem] font-semibold tracking-[0.09em] whitespace-nowrap text-white/60 uppercase transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Menú desplegable en móvil */}
      {open ? (
        <div className="fixed inset-x-0 top-[110px] bottom-0 z-40 overflow-y-auto bg-navy-deep px-6 py-6 xl:hidden">
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-3.5 font-display text-[1.05rem] font-bold tracking-wide text-white/85 uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/auditoria"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-[30px] bg-accent px-5 py-3 text-[0.82rem] font-bold text-on-accent"
              >
                <Code2 className="size-4" strokeWidth={2.2} />
                Auditoría de código
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
