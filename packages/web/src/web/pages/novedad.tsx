import { useEffect, useState } from "react";
import { useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  FileText,
  Loader2,
  User,
} from "lucide-react";
import { buscarEntrada, loadNovedades, relacionadas, type Novedad } from "../lib/novedades";
import { PortalNav } from "../components/portal/portal-nav";
import { PortalFooter } from "../components/portal/portal-footer";
import { PortalSidebar } from "../components/blog/portal-sidebar";
import { PostCard } from "../components/blog/post-card";
import { Reveal } from "../components/site/reveal";

/** Compartir la entrada. La URL se lee al montar, no en el render del servidor. */
function Compartir() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const u = encodeURIComponent(url);

  const redes = [
    { label: "WhatsApp", href: `https://wa.me/?text=${u}`, glyph: "wa" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, glyph: "fb" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}`, glyph: "x" },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, glyph: "in" },
  ];

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground uppercase">
        Compartir
      </span>
      {redes.map((red) => (
        <a
          key={red.label}
          href={red.href}
          target="_blank"
          rel="noopener"
          aria-label={`Compartir en ${red.label}`}
          className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-surface font-mono text-[0.6rem] font-bold text-muted-foreground uppercase transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          {red.glyph}
        </a>
      ))}
    </div>
  );
}

export default function NovedadPage() {
  const { slug } = useParams<{ slug: string }>();
  const [entrada, setEntrada] = useState<Novedad | null | undefined>(undefined);
  const [otras, setOtras] = useState<Novedad[]>([]);
  const [vecinas, setVecinas] = useState<{ anterior?: Novedad; siguiente?: Novedad }>({});

  useEffect(() => {
    let vivo = true;
    loadNovedades().then((data) => {
      if (!vivo) return;
      const encontrada = buscarEntrada(data, slug ?? "");
      setEntrada(encontrada ?? null);
      setOtras(encontrada ? relacionadas(data, encontrada) : []);
      if (encontrada) {
        const i = data.findIndex((e) => e.slug === encontrada.slug);
        setVecinas({ anterior: data[i - 1], siguiente: data[i + 1] });
      }
    });
    return () => {
      vivo = false;
    };
  }, [slug]);

  useEffect(() => {
    if (entrada) document.title = `${entrada.title} — NECHUGO`;
    return () => {
      document.title = "NECHUGO — Liderazgo, gestión, formación y fe";
    };
  }, [entrada]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (entrada === undefined) {
    return (
      <div id="top" className="min-h-dvh bg-background">
        <PortalNav />
        <div className="flex items-center justify-center gap-3 py-40 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="font-mono text-[0.8rem]">cargando la entrada…</span>
        </div>
      </div>
    );
  }

  if (entrada === null) {
    return (
      <div id="top" className="min-h-dvh bg-background">
        <PortalNav />
        <div className="mx-auto max-w-[1240px] px-6 py-32 text-center">
          <p className="display text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
            Esa entrada no existe
          </p>
          <p className="mt-4 text-[1rem] text-muted-foreground">
            Puede que el enlace esté mal escrito o que la entrada ya no esté publicada.
          </p>
          <a
            href="/novedades"
            className="mt-8 inline-flex items-center gap-2 rounded-[30px] bg-accent px-6 py-3.5 text-[0.86rem] font-bold text-on-accent"
          >
            <ArrowLeft className="size-4" />
            Volver a Novedades
          </a>
        </div>
        <PortalFooter />
      </div>
    );
  }

  const principal = entrada.categories[0];

  return (
    <div id="top" className="min-h-dvh bg-background">
      <PortalNav />

      <main>
        {/* ------------------------------------------------------ migas */}
        <div className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1240px] px-6 py-4">
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[0.74rem]">
              <a href="/" className="text-muted-foreground transition-colors hover:text-accent-strong">
                Inicio
              </a>
              <span className="text-border">/</span>
              <a
                href="/novedades"
                className="text-muted-foreground transition-colors hover:text-accent-strong"
              >
                Novedades
              </a>
              {principal ? (
                <>
                  <span className="text-border">/</span>
                  <span className="font-semibold text-foreground">{principal.name}</span>
                </>
              ) : null}
            </nav>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12">
          <div className="min-w-0">
            {/* El artículo entero va sobre una tarjeta blanca: la imagen abre la
                tarjeta a sangre y el texto respira dentro, con su relleno. */}
            <article className="overflow-hidden rounded-[6px] border border-border bg-surface shadow-card">
              {/* Imagen destacada arriba, como en el portal: sin hero que la tape. */}
              {entrada.image ? (
                <Reveal>
                  <img
                    src={entrada.image}
                    alt={entrada.imageAlt}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </Reveal>
              ) : null}

              <div className="p-7 sm:p-9">
              <Reveal i={1}>
                <header>
                  <h1 className="display text-[clamp(1.9rem,3.9vw,2.9rem)] leading-[1.1] text-foreground">
                    {entrada.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3 text-accent" strokeWidth={2.3} />
                      Nelson Nechugo
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3 text-accent" strokeWidth={2.3} />
                      {entrada.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3 text-accent" strokeWidth={2.3} />
                      {entrada.minutes} min de lectura
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="size-3 text-accent" strokeWidth={2.3} />
                      {entrada.words.toLocaleString("es-ES")} palabras
                    </span>
                  </div>

                  {entrada.categories.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entrada.categories.map((c) => (
                        <a
                          key={c.slug}
                          href={`/novedades?categoria=${c.slug}`}
                          className="rounded-full bg-accent-tint px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.04em] text-accent-strong uppercase transition-colors hover:bg-accent hover:text-on-accent"
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </header>
              </Reveal>

              {/* Entradilla: el extracto hace de lead, con filete de acento. */}
              {entrada.excerpt ? (
                <Reveal i={2}>
                  <p className="mt-8 border-l-[3px] border-accent pl-5 text-[1.06rem] leading-[1.1] text-foreground/80">
                    {entrada.excerpt}
                  </p>
                </Reveal>
              ) : null}

              <Reveal i={3}>
                <div
                  className="entry-body mt-8"
                  // Contenido propio del portal, reescrito y saneado fuera del repo.
                  dangerouslySetInnerHTML={{ __html: entrada.body }}
                />
              </Reveal>

              {/* Pie del artículo: compartir + enlace a la publicación original. */}
              <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Compartir />
                <a
                  href={entrada.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex w-fit items-center gap-2 text-[0.78rem] font-semibold text-muted-foreground transition-colors hover:text-accent-strong"
                >
                  Ver la publicación original
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              </div>
            </article>

            {/* Anterior / siguiente, como la navegación del portal. */}
            {vecinas.anterior || vecinas.siguiente ? (
              <nav
                aria-label="Entradas contiguas"
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                {vecinas.anterior ? (
                  <a
                    href={`/novedades/${vecinas.anterior.slug}`}
                    className="group flex flex-col rounded-[6px] border border-border bg-surface p-5 shadow-card transition-colors hover:border-accent/50"
                  >
                    <span className="inline-flex items-center gap-2 font-mono text-[0.64rem] tracking-[0.16em] text-muted-foreground uppercase">
                      <ArrowLeft className="size-3" strokeWidth={2.4} />
                      Anterior
                    </span>
                    <span className="display mt-3 text-[1rem] leading-snug text-foreground transition-colors group-hover:text-accent-strong">
                      {vecinas.anterior.title}
                    </span>
                  </a>
                ) : (
                  <span />
                )}

                {vecinas.siguiente ? (
                  <a
                    href={`/novedades/${vecinas.siguiente.slug}`}
                    className="group flex flex-col rounded-[6px] border border-border bg-surface p-5 text-right shadow-card transition-colors hover:border-accent/50"
                  >
                    <span className="inline-flex items-center gap-2 self-end font-mono text-[0.64rem] tracking-[0.16em] text-muted-foreground uppercase">
                      Siguiente
                      <ArrowRight className="size-3" strokeWidth={2.4} />
                    </span>
                    <span className="display mt-3 text-[1rem] leading-snug text-foreground transition-colors group-hover:text-accent-strong">
                      {vecinas.siguiente.title}
                    </span>
                  </a>
                ) : null}
              </nav>
            ) : null}
          </div>

          <PortalSidebar excluir={entrada.slug} />
        </div>

        {/* -------------------------------------------------- relacionadas */}
        {otras.length ? (
          <section className="border-t border-border bg-surface-muted py-16 sm:py-20">
            <div className="mx-auto max-w-[1240px] px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)] text-foreground">
                  El público prefirió leer más
                </h2>
                <a
                  href="/novedades"
                  className="inline-flex items-center gap-2 text-[0.76rem] font-bold tracking-[0.08em] text-accent-strong uppercase transition-colors hover:text-foreground"
                >
                  Ver todas
                  <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </a>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otras.map((otra, index) => (
                  <Reveal key={otra.slug} i={index % 3}>
                    <PostCard entrada={otra} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <PortalFooter />
    </div>
  );
}
