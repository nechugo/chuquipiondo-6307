# Auditoría NECHUGO — Design

Sitio web de cuatro rutas que reúne dos cosas: la **portada del portal NECHUGO** en la raíz (`/`), réplica de la interfaz del sitio en vivo, y la **auditoría de código** en `/auditoria` de la suite WordPress **NECHUGO v1.13.0**, que es un documento técnico navegable: veredicto arriba, métricas, hallazgos con código antes/después, pendientes y verificación. No hay app, ni API, ni base de datos: es contenido estático con las interacciones reales del portal (carrusel de portada, filtro por prioridad, copiar código, buscador y filtro del blog por categoría, y paginación del listado).

## Marca

El proyecto se llamaba **CHUQUIPIONDO** y **se renombró por completo a NECHUGO**: logotipo, titulares, footer, copyright, correo de contacto, dominio (`nechugo.com`) y el nombre del repo (`nechugo/nechugo`) citado en el informe. El logotipo **se dibuja en código** (`components/portal/portal-logo.tsx`), no es una imagen: así el nombre de la marca se cambia en un solo sitio y no queda ningún archivo con la marca anterior. Las imágenes del portal que llevaban el logotipo viejo se descargaron y **se borraron** en cuanto se sustituyeron por el logotipo en código.

## Referencia visual

La interfaz replica **el sitio en vivo `nechugo.com`**: barra superior oscura, cabecera navy, hero oscuro con tarjetas de cristal, secciones claras `#eef5f9` con píldora de sección + titular pesado centrado, tarjetas blancas de radio 6px con barra superior degradada cyan→navy y número fantasma `01/02/03`, y footer navy oscuro de tres columnas. Se replica el lenguaje visual, no el contenido del portal.

**Nota de divergencia (importante).** El sitio en vivo corre **Astra 4.14.0**, no el tema `nechugo-theme` del repo. Los valores de aquí están **medidos sobre el sitio en vivo** (Playwright, viewport 1440) y por eso **no coinciden** con `nechugo-theme/theme.json`, que declara `--background: #f5f8ff`, `--navy: #0a1f44`, `--sky: #27b6ff`, `--font-heading: "Plus Jakarta Sans"`. Si el tema del repo es la fuente de verdad a futuro, hay que decidir cuál de los dos sistemas se consolida.

## Brand & Colors

- **Web**: variables CSS en `packages/web/src/web/styles.css`, expuestas a Tailwind 4 vía `@theme inline`.

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#eef5f9` | Fondo de página (celeste muy claro) |
| `--surface` | `#ffffff` | Tarjetas, cabecera de bloques de código claros |
| `--surface-muted` | `#f4f9fb` | Pie de tarjeta, fondos secundarios |
| `--surface-tint` | `#e6f6fe` | Cabeza de tarjeta con degradado, panel de verificación |
| `--foreground` | `#0b1740` | Titulares y texto fuerte |
| `--body` | `#4b4f58` | Párrafos (color medido del cuerpo en el sitio en vivo) |
| `--muted-foreground` | `#4b4f58` | Texto secundario, metadatos |
| `--navy` | `#000247` | Cabecera pegajosa, hero, banda CTA (color medido) |
| `--navy-deep` | `#071a3a` | Barra superior y footer |
| `--accent` | `#1bacf6` | Botón primario, punto de píldora, subrayados (color medido) |
| `--accent-strong` | `#0b93d8` | Cifras de métrica, etiquetas de sección |
| `--accent-tint` | `#e6f6fe` | Fondo de píldoras de sección y chips |
| `--on-accent` | `#03035c` | Texto navy sobre el botón cyan (medido: contraste alto) |
| `--border` | `#d9ecf7` | Bordes de tarjeta y separadores (borde celeste, no gris) |
| `--code-bg` | `#061033` | Bloques de código antes/después |
| `--danger` / `--danger-tint` | `#d92d20` / `#fef3f2` | Chip P0 y componente `nechugo-news` |
| `--warn` / `--warn-tint` | `#b54708` / `#fffaeb` | Chip P1 |
| `--info` / `--info-tint` | `#475467` / `#f2f4f7` | Chip P2 |
| `--ok` / `--ok-tint` | `#12805c` / `#ecfdf3` | Chip «corregido» |

Regla: el acento nunca decora, solo señala — enlaces, estado activo, cifras de métrica, píldoras de sección y el número fantasma de cada tarjeta.

## Typography

- **Display: Barlow Semi Condensed** (Google Fonts, 600/700/800) — la fuente real del H1 del sitio en vivo (medida: 800, 46.8px). Condensada y muy pesada, `line-height: 1.06`, `letter-spacing: -0.018em`.
- **Body: Roboto** (400/500/700), 17px, `line-height: 1.7`.
- **Mono: Roboto Mono** (400/500) para rutas `archivo:línea`, bloques de código y metadatos técnicos.
- Jerarquía solo por tamaño y peso, nunca por color. H1 `clamp(2.3rem, 5.6vw, 4.3rem)`, H2 de sección `clamp(2rem, 4vw, 3.15rem)`, H3 de hallazgo `clamp(1.35rem, 2.4vw, 1.85rem)`.
- `.display` **no fija color** a propósito: vive en la capa `utilities`, así que un color propio ganaría al `text-white` del hero. El color lo pone siempre la utilidad del elemento.

## Layout

- Contenedor `max-width: 1240px`, padding lateral 24px.
- Secciones separadas por 96–112px verticales. Sin hairlines entre secciones: la separación la marcan el fondo y las tarjetas.
- **Radios pequeños**: 6px en tarjetas, 30px (píldora) en botones y chips. Es el rasgo más identificativo del sitio en vivo frente a los radios de 14px de la referencia anterior.
- Rejilla de tarjetas: 3 columnas → 2 en tablet → 1 en móvil, con 20px de separación.
- Hero y banda CTA comparten el mismo tratamiento: navy `#000247`, dos halos `radial-gradient` cyan/musgo con `blur(120px)`, y una rejilla de 64px enmascarada con `radial-gradient` para dar profundidad.
- **Patrón de tarjeta** (`.card-bar` + `.ghost-num`): barra superior de 4px con degradado `#1bacf6 → #0a8fd6 → #000247`, número de índice fantasma en `#cdeafa` arriba a la derecha, y degradado vertical blanco→`--surface-muted` en el cuerpo.
- Sombra: `0 1px 2px rgba(9,19,74,.04), 0 14px 34px -22px rgba(9,19,74,.22)`, que sube a `...26px 54px -26px rgba(9,19,74,.3)` en hover.
- **Solape del hero**: las cuatro métricas flotan sobre el borde inferior del hero (`pb-[9.5rem]` + `-mt-[7rem]`), como las tarjetas que se montan sobre la imagen en el portal.

## Motion

Una sola entrada orquestada: cada sección revela sus hijos con `fade-up` escalonado (60ms) al entrar en viewport con `IntersectionObserver`. Nada de micro-interacciones dispersas. Hover de tarjeta: sombra y un desplazamiento mínimo (`-translate-y-0.5`), sin escalados. `prefers-reduced-motion` desactiva todo.

## Pages

- **Portada** (`pages/inicio.tsx`), ruta `/`. **La raíz del sitio es la portada del portal**, réplica de `nechugo.com`: barra superior → cabecera navy → hero en carrusel → «Nuestra Esencia» → «Nuestros Pilares» → banda que enlaza con la auditoría → «Contenido reciente» → footer del portal.
- **Auditoría** (`pages/index.tsx`), ruta `/auditoria`. La plantilla técnica del informe, fuera de la raíz: una sola página con secciones ancladas —barra superior → cabecera navy → hero con terminal → métricas flotantes → veredicto → componentes → hallazgos (filtrables) → pendientes → verificado → reproducir → banda CTA → footer navy.
- Rutas antiguas: `/inicio` (la portada vivía ahí) redirige a `/`, y cualquier ruta desconocida cae también en la portada, para que ningún enlace viejo deje la pantalla en blanco.
- **Novedades** (`pages/novedades.tsx`), ruta `/novedades`. El blog del portal **sin cabecera de página**: abre con el slider de las últimas cuatro entradas en la columna de contenido, con la barra lateral —buscador incluido— arrancando a su misma altura. Debajo, rejilla de tarjetas a dos columnas y paginación numerada de 9 en 9.
- **Entrada** (`pages/novedad.tsx`), ruta `/novedades/:slug`. Migas, imagen destacada **arriba del todo** (sin nada que la tape), titular, metadatos, chips de categoría, entradilla con filete, cuerpo `.entry-body`, fila de compartir, navegación anterior/siguiente, tres relacionadas y la misma barra lateral.

Contenido y datos de la auditoría en `lib/audit.ts`; los del blog en `lib/novedades.json` + `lib/novedades.ts`.

## Portada del portal

Réplica de la portada de `nechugo.com`, con su misma estructura y su mismo lenguaje visual. Componentes en `components/portal/`.

- **Cabecera** (`portal-nav.tsx`): barra superior navy oscura con ubicación y correo, cabecera navy pegajosa con el logotipo, la nav del portal (Inicio · Novedades · Liderazgo · Gestión · Formación · Fe y Vida · Recursos) y el botón «Explorar contenidos». Los enlaces de categoría resuelven al listado filtrado del blog (`/novedades?categoria=<slug>`), así que la nav del portal es funcional y no decorativa. En pantallas menores de `xl` la nav completa no entra: aparece una tira desplazable y, por debajo, un menú desplegable a pantalla completa.
- **Hero en carrusel** (`portal-hero.tsx`): tres diapositivas con fondo fotográfico, degradado navy a dos capas, píldora de sección, titular en display, entradilla y dos botones. Se funden con `opacity` (900 ms) para que el cambio no dé saltos de altura, y el titular se reanima en cada diapositiva con `fade-up`. Avanza sola cada 7,5 s y se detiene con el puntero encima; lleva flechas y puntos con `role="tablist"`. En `lg` y superior, a la derecha van el emblema circular y las tres tarjetas de cristal (Lidera · Gestiona · Forma) **en columna**, no flotando: en posición absoluta la tarjeta del medio tapaba el símbolo del emblema.
- **Nuestra Esencia** (`portal-esencia.tsx`) y **Nuestros Pilares** (`portal-pilares.tsx`): píldora + titular centrado + rejilla de tres tarjetas con barra `card-bar`, número fantasma e icono en badge. Cierran con una banda de enlace y con la línea `Visión · Datos · Impacto`, respectivamente.
- **Contenido reciente** (`portal-recientes.tsx`): la entrada más reciente a dos columnas (imagen + categorías + titular + extracto + «Continuar leyendo») y las tres siguientes como tarjetas compactas numeradas. **Los datos salen del blog real** vía `loadNovedades()`, no son texto de relleno, así que la portada nunca se desincroniza del archivo. Mientras carga muestra un esqueleto con `animate-pulse`.
- **Footer** (`portal-footer.tsx`): cuatro columnas —marca y «Sobre Nechugo», «Información del portal», «Navegación» y «Contacto»— más una entrada propia hacia la auditoría. Los enlaces legales del portal (políticas, cookies, aviso legal) apuntan a `#`: esas páginas no existen en esta previsualización.

## Blog «Novedades»

Las **30 entradas** del portal `nechugo.com/novedades/`, con sus categorías y autoría. Los datos originales (texto, extracto, fecha, imágenes) se obtuvieron de la API REST de WordPress del portal; el contenido se saneó y después **se reescribió por completo** (título, extracto y cuerpo) para este sitio. El saneado y la reescritura ocurren fuera del repo.

- **Reescritura**: los 30 artículos se reescribieron íntegros y **todos caben en la banda 800-1000 palabras** (mín. 800, máx. 991, media 927). Cada uno conserva la intención y el tema del original, pero con estructura propia: entradilla, secciones `h2`, listas y cierre accionable. Los que la superaban se condensaron quitando secciones enteras y párrafos redundantes, no recortando frases: cada artículo sigue leyéndose de principio a fin sin cortes a media idea.
- **Slugs**: **regenerados a partir del título nuevo** (normalizados, sin acentos, máx. 72 caracteres). Son la ruta pública `/novedades/:slug`. El campo `url` de cada entrada conserva el enlace permanente original del portal, y el botón «Ver la original» de la ficha lateral apunta ahí.
- **Fechas**: repartidas linealmente entre el **1 de agosto de 2026** y el **15 de octubre de 2026**, todas distintas. El reparto va por longitud: **las entradas más largas son las más recientes**, de modo que el archivo crece en profundidad hacia el presente.
- **Datos**: `lib/novedades.json` (~167 KB de HTML de artículo) cargado en diferido con `loadNovedades()`, así que cae en un chunk aparte (`novedades-*.js`, ~194 KB) y **no** engorda la página de auditoría.
- **Imágenes**: 30 destacadas + 18 incrustadas, **descargadas y servidas en local** desde `packages/web/public/novedades/` (4.3 MB). Las destacadas se renombraron al slug nuevo para que el nombre del archivo coincida con la ruta. La página queda autónoma: no depende del portal para verse.
- **Imágenes incrustadas**: los 17 artículos que llevaban una o dos imágenes dentro del cuerpo las conservan, reinsertadas como `figure` + `figcaption` (con pie de foto redactado) ancladas a un `h2` concreto de cada artículo.
- **Saneado**: se conservan solo etiquetas de texto, `a`, `img`, `figure`/`figcaption` y tablas; se eliminan `script`, `style`, `iframe`, formularios y todos los atributos salvo `href` (externos con `target="_blank" rel="noopener"`) y `src`/`alt` de las imágenes. Los `h1` del cuerpo se degradan a `h2` para no duplicar el titular de la página, y los `div` de Gutenberg se resuelven a `p` o se desenvuelven según su contenido.
- **Estilo del cuerpo**: la clase `.entry-body` (capa `components` de `styles.css`) da la tipografía del artículo — titulares en display navy, listas con viñeta cyan, cita con filete cyan, imágenes con radio 6px y `figcaption` centrado. Está acotada para que no se filtre a las páginas de auditoría.
- **Navegación**: los enlaces del header de la auditoría son absolutos (`/auditoria#hallazgos`), de modo que la cabecera funciona desde cualquier ruta. En pantallas menores de `lg` aparece una segunda fila de enlaces desplazable, porque la nav de escritorio está oculta.

### Listado y artículo

El listado y la entrada siguen la estructura del portal real (`nechugo.com/novedades/`), pero con acabado más cuidado: mismo esqueleto limpio y rápido —nada de hero oscuro— y una capa de detalle tipográfico y de color encima.

- **Sin cabecera de página**: el listado arranca directamente bajo la cabecera del portal, igual que el archivo del tema real. Se quitaron las migas, el `h1` visible, la entradilla y la tira de filtros por categoría; el `h1` «Novedades» queda como texto solo para lectores de pantalla.
- **Slider de portada** (`components/blog/blog-hero-slider.tsx`): réplica del `chuquipiondo_blog_hero_slider` del tema. Las **últimas 4 entradas** (el personalizador del tema trae 5 por defecto, de 2 a 10), imagen a sangre con un `brightness(0.74)` y **solo el titular** encima, en una banda al 60% de opacidad navy al pie. Relación **16:9 autoajustable al ancho de la columna de contenido**, con 520px de alto como techo; avanza sola cada **6000 ms**, se detiene con el puntero o el foco encima, respeta `prefers-reduced-motion` y lleva flechas a los lados. Los tres efectos del personalizador —`fade`, `slide` y `zoom` (Ken Burns)— están implementados; el activo es `slide`, el deslizamiento horizontal.
- **Buscador**: vive al principio de la barra lateral, en una píldora blanca. En móvil la barra lateral cae debajo del listado, así que el listado pone su propia copia arriba para no dejar la búsqueda al final de la página.
- **Filtro activo**: cuando llega un `?categoria=` desde la nav o el lateral, o hay búsqueda escrita, aparece una línea con el recuento y un botón «Quitar el filtro». Antes eso lo resolvía la tira de categorías, que ya no existe.
- **Tarjeta de entrada** (`components/blog/post-card.tsx`): categoría suelta arriba, titular en `.display`, extracto a tres líneas (`clamp-3`), fecha y minutos de lectura, y botón «Continuar leyendo» que **se rellena en hover**. Conserva la barra superior degradada y sube medio píxel al pasar el puntero. **No hay tarjeta destacada**: el slider ya abre con las últimas cuatro, así que la rejilla es siempre de dos columnas y la entrada repetida desaparece.
- **Barra lateral** (`components/blog/portal-sidebar.tsx`), a la derecha en `lg` y superior a 330 px: buscador, tarjeta de marca —dibujada en código, no el folleto rasterizado del portal—, «Lo más leído» (ordenado por longitud del artículo), «Categorías» con sus recuentos y «Lo último». En la entrada se le pasa `excluir` con el slug actual para que no se recomiende a sí misma.
- **Entrada**: el artículo entero va sobre **una tarjeta blanca** —borde, radio 6px y sombra de tarjeta—: la imagen destacada abre la tarjeta a sangre y debajo el texto respira con su relleno. Dentro: titular, metadatos y chips; la entradilla va con filete cyan a la izquierda, y el cuerpo usa `.entry-body`. Cierra con la fila de compartir (más el enlace a la publicación original), la navegación anterior/siguiente calculada por índice, y «El público prefirió leer más» con tres tarjetas sobre `bg-surface-muted`.
- **Interlineado del artículo**: `.entry-body` va a **1.15** de altura de línea por defecto (dentro de los párrafos), y el hueco de cada titular o subtítulo hacia su primer párrafo es de **1.10em** — regla `.entry-body h1…h6 + *` que va después de `.entry-body > * + *` para ganarle en cascada. El hueco entre el cierre de un párrafo y el titular siguiente bajó de ≈118px a ≈78px (40px menos, medido sobre el `h2` a 1280: 56px de margen + 22px de relleno).
- **Paginación**: numerada, 9 por página, con desplazamiento suave al cambiar de página. Sustituye al botón «Cargar más» para que el listado tenga fondo y se pueda saltar de página.

## Key User Flows

1. **Entender el veredicto**: aterriza en el hero, lee el titular y el terminal con el `Parse error` real → métricas de un vistazo.
2. **Profundizar en un hallazgo**: filtra por P0/P1/P2, lee qué pasaba, el impacto, el código antes/después y copia el fragmento con un clic.
3. **Reproducir**: baja a la sección de comandos, copia el bloque y lo ejecuta en su clon.

## Architecture

- Sin API ni base de datos: contenido estático en `lib/audit.ts`.
- Componentes de sección en `components/site/`; primitivas reutilizables (`Card`, `IconBadge`, `EyebrowPill`, `CodeBlock`, `SectionHeading`, `Chip`) en `components/site/primitives.tsx`.
- Interactividad con estado local de React (`useState` para el filtro, `IntersectionObserver` para las revelaciones, `navigator.clipboard` para copiar).
