/**
 * Blog «Novedades» de nechugo.com — contenido copiado del portal.
 *
 * Fuente: https://nechugo.com/novedades/ (30 entradas, API REST de WordPress).
 * Las imágenes se descargaron y se sirven en local desde /public/novedades, así que
 * la página no depende del sitio original para verse.
 *
 * El JSON se carga en diferido (`loadNovedades`) para que los ~170 KB de artículos
 * no entren en el chunk inicial de la auditoría.
 */

export interface NovedadCategoria {
  slug: string;
  name: string;
}

export interface Novedad {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  url: string;
  image: string | null;
  imageAlt: string;
  categories: NovedadCategoria[];
  body: string;
  words: number;
  minutes: number;
}

export const NOVEDADES_ORIGEN = "https://nechugo.com/novedades/";

/** Recuento por categoría, calculado sobre las 30 entradas. */
export const CATEGORIAS: (NovedadCategoria & { count: number })[] = [
  { slug: "liderazgo", name: "LIDERAZGO", count: 18 },
  { slug: "fe-y-vida", name: "FE Y VIDA", count: 12 },
  { slug: "superacion-personal", name: "Superación Personal", count: 11 },
  { slug: "gestion", name: "GESTIÓN", count: 7 },
  { slug: "testimonios", name: "Testimonios", count: 7 },
  { slug: "formacion", name: "FORMACIÓN", count: 5 },
  { slug: "fe-cristiana", name: "Fe Cristiana", count: 3 },
  { slug: "musica", name: "Musica", count: 2 },
  { slug: "recursos", name: "RECURSOS", count: 1 },
  { slug: "reflexiones-ilustrativas", name: "Reflexiones Ilustrativas", count: 1 },
];

export const TOTAL_ENTRADAS = 30;

let cache: Novedad[] | null = null;

/** Carga las entradas una sola vez y las deja en caché. */
export async function loadNovedades(): Promise<Novedad[]> {
  if (cache) return cache;
  const mod = await import("./novedades.json");
  cache = (mod.default ?? mod) as unknown as Novedad[];
  return cache;
}

export function buscarEntrada(entradas: Novedad[], slug: string): Novedad | undefined {
  return entradas.find((entrada) => entrada.slug === slug);
}

/** Tres entradas relacionadas: primero las que comparten categoría, luego las más recientes. */
export function relacionadas(entradas: Novedad[], actual: Novedad, cuantas = 3): Novedad[] {
  const slugs = new Set(actual.categories.map((c) => c.slug));
  const puntuar = (e: Novedad) => e.categories.filter((c) => slugs.has(c.slug)).length;
  return entradas
    .filter((e) => e.slug !== actual.slug)
    .map((e, i) => ({ e, p: puntuar(e), i }))
    .sort((a, b) => b.p - a.p || a.i - b.i)
    .slice(0, cuantas)
    .map((x) => x.e);
}

/** Agrupa por año para el archivo lateral. */
export function porAnio(entradas: Novedad[]): { anio: string; entradas: Novedad[] }[] {
  const mapa = new Map<string, Novedad[]>();
  for (const entrada of entradas) {
    const anio = entrada.date.slice(0, 4);
    if (!mapa.has(anio)) mapa.set(anio, []);
    mapa.get(anio)!.push(entrada);
  }
  return [...mapa.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([anio, lista]) => ({ anio, entradas: lista }));
}
