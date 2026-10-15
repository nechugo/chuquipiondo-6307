import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { cn } from "../lib/utils";
import { CATEGORIAS, loadNovedades, TOTAL_ENTRADAS, type Novedad } from "../lib/novedades";
import { PortalNav } from "../components/portal/portal-nav";
import { PortalFooter } from "../components/portal/portal-footer";
import { PortalSidebar } from "../components/blog/portal-sidebar";
import { PostCard } from "../components/blog/post-card";
import { BlogHeroSlider } from "../components/blog/blog-hero-slider";
import { Reveal } from "../components/site/reveal";

const POR_PAGINA = 9;

/** Minúsculas y sin acentos, para que la búsqueda no dependa de las tildes. */
function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Buscador del listado. En escritorio abre la barra lateral —el listado ya no
 * lleva cabecera propia—; en móvil la barra cae debajo del listado, así que el
 * listado pone esta misma pieza arriba para no dejar la búsqueda a 4000px.
 */
function Buscador({ q, setQ }: { q: string; setQ: (valor: string) => void }) {
  return (
    <label className="relative flex w-full items-center">
      <Search className="absolute left-4 size-4 text-muted-foreground" strokeWidth={2} />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar en las entradas…"
        aria-label="Buscar en las entradas"
        className="h-12 w-full rounded-[30px] border border-border bg-surface pl-11 text-[0.86rem] text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none"
      />
      {q ? (
        <button
          type="button"
          onClick={() => setQ("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-4 inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </label>
  );
}

export default function Novedades() {
  const [entradas, setEntradas] = useState<Novedad[] | null>(null);
  const [categoria, setCategoria] = useState<string>("todas");
  const [q, setQ] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    let vivo = true;
    loadNovedades().then((data) => {
      if (vivo) setEntradas(data);
    });
    return () => {
      vivo = false;
    };
  }, []);

  // /novedades?categoria=liderazgo — llega desde la nav del portal y del lateral.
  useEffect(() => {
    const pedida = new URLSearchParams(window.location.search).get("categoria");
    if (pedida && CATEGORIAS.some((c) => c.slug === pedida)) setCategoria(pedida);
  }, []);

  useEffect(() => {
    setPagina(1);
  }, [categoria, q]);

  const filtradas = useMemo(() => {
    if (!entradas) return [];
    // Sin acentos: quien busca «oracion» encuentra «oración».
    const texto = normalizar(q);
    return entradas.filter((entrada) => {
      const okCat = categoria === "todas" || entrada.categories.some((c) => c.slug === categoria);
      const okTexto =
        !texto ||
        normalizar(entrada.title).includes(texto) ||
        normalizar(entrada.excerpt).includes(texto);
      return okCat && okTexto;
    });
  }, [entradas, categoria, q]);

  const sinFiltro = categoria === "todas" && !q.trim();
  // Sin tarjeta destacada: el slider de arriba ya abre con las últimas cuatro
  // entradas, así que la rejilla arranca directamente en dos columnas.
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const mostradas = filtradas.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const irA = (n: number) => {
    setPagina(Math.min(Math.max(1, n), totalPaginas));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activa = CATEGORIAS.find((c) => c.slug === categoria);

  return (
    <div id="top" className="min-h-dvh bg-background">
      <PortalNav />

      <main className="py-10 sm:py-12">
        {/* La cabecera visible se quitó: el titular queda solo para lectores de pantalla. */}
        <h1 className="sr-only">Novedades</h1>

        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12">
          <div>
            {/* En móvil el buscador no puede abrir la barra lateral: se pone aquí. */}
            <div className="mb-5 lg:hidden">
              <Buscador q={q} setQ={setQ} />
            </div>

            {!sinFiltro ? (
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] text-muted-foreground">
                <span>
                  {filtradas.length} {filtradas.length === 1 ? "entrada" : "entradas"}
                  {activa ? ` en ${activa.name}` : ""}
                  {q.trim() ? ` para «${q.trim()}»` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setCategoria("todas");
                  }}
                  className="inline-flex items-center gap-1.5 font-semibold text-accent-strong transition-colors hover:text-foreground"
                >
                  <X className="size-3.5" strokeWidth={2.6} />
                  Quitar el filtro
                </button>
              </div>
            ) : null}

            {!entradas ? (
              <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                <span className="font-mono text-[0.8rem]">cargando las entradas…</span>
              </div>
            ) : (
              <>
                {/* El slider va siempre con las últimas 4 del blog, sin filtros. */}
                <BlogHeroSlider entradas={entradas} />

                <div className="mt-10">
                  {filtradas.length === 0 ? (
                    <div className="rounded-[6px] border border-border bg-surface py-20 text-center shadow-card">
                      <p className="display text-[1.4rem] text-foreground">Sin resultados</p>
                      <p className="mt-2 text-[0.92rem] text-muted-foreground">
                        No hay entradas que coincidan con esa búsqueda.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setQ("");
                          setCategoria("todas");
                        }}
                        className="mt-6 inline-flex items-center gap-2 rounded-[30px] bg-accent px-5 py-3 text-[0.82rem] font-bold text-on-accent"
                      >
                        Ver las {TOTAL_ENTRADAS} entradas
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-7 sm:grid-cols-2">
                        {mostradas.map((entrada, index) => (
                          <Reveal key={entrada.slug} i={index % 2}>
                            <PostCard entrada={entrada} />
                          </Reveal>
                        ))}
                      </div>

                      {totalPaginas > 1 ? (
                        <nav
                          aria-label="Paginación"
                          className="mt-12 flex items-center justify-center gap-2"
                        >
                          <button
                            type="button"
                            onClick={() => irA(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            aria-label="Página anterior"
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent-strong disabled:pointer-events-none disabled:opacity-35"
                          >
                            <ChevronLeft className="size-4" strokeWidth={2.4} />
                          </button>

                          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => irA(n)}
                              aria-current={n === paginaActual ? "page" : undefined}
                              className={cn(
                                "inline-flex size-10 items-center justify-center rounded-full font-mono text-[0.8rem] transition-colors",
                                n === paginaActual
                                  ? "bg-navy text-white"
                                  : "border border-border bg-surface text-muted-foreground hover:border-accent hover:text-accent-strong",
                              )}
                            >
                              {n}
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => irA(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                            aria-label="Página siguiente"
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent-strong disabled:pointer-events-none disabled:opacity-35"
                          >
                            <ChevronRight className="size-4" strokeWidth={2.4} />
                          </button>
                        </nav>
                      ) : null}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <PortalSidebar buscar={<Buscador q={q} setQ={setQ} />} />
        </div>
      </main>

      <PortalFooter />
    </div>
  );
}
