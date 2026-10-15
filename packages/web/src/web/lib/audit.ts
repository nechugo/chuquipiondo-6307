/**
 * Contenido de la auditoría. Todo el texto del sitio sale de aquí para que las
 * secciones solo se ocupen de maquetar. Fuente: auditoria-codigo-nechugo.md
 * (commit 1fcb4ca de la rama mejoras/auditoria-codigo).
 */

export type Priority = "P0" | "P1" | "P2";
export type SnippetVariant = "before" | "after" | "shell" | "plain";

export interface Snippet {
  label: string;
  variant: SnippetVariant;
  code: string;
}

export interface Finding {
  id: string;
  index: string;
  priority: Priority;
  status: "corregido" | "pendiente";
  title: string;
  location: string;
  what: string;
  impact: string;
  snippets: Snippet[];
  note?: string;
}

export const META = {
  repo: "nechugo/nechugo",
  branch: "mejoras/auditoria-codigo",
  commit: "1fcb4ca",
  version: "v1.13.0",
  date: "15 de octubre de 2026",
  reportPath: "/home/user/auditoria-codigo-nechugo.md",
};

export const HERO = {
  badge: "Auditoría de código · 15 oct 2026",
  headline: ["Un error fatal rompía", "un tema entero.", "Y el CI no lo miraba."],
  sub: "174 archivos PHP revisados en la suite WordPress NECHUGO v1.13.0. Encontré un Parse error que inutilizaba nechugo-news, tres endurecimientos de seguridad y el hueco de CI que dejó pasar el fallo. Todo corregido y verificado.",
  primaryCta: "Ver los hallazgos",
  secondaryCta: "Comandos para reproducir",
};

export const HERO_TERMINAL: Snippet[] = [
  {
    label: "main — el tema no carga",
    variant: "before",
    code: `$ php -l nechugo-news/inc/helpers.php

PHP Parse error: syntax error, unexpected token "\\"
in nechugo-news/inc/helpers.php on line 72`,
  },
  {
    label: "mejoras/auditoria-codigo — 174 archivos",
    variant: "after",
    code: `$ find . -name '*.php' -print0 | xargs -0 -n1 php -l

No syntax errors detected in 174 files`,
  },
];

export const STATS = [
  { value: "174", label: "archivos PHP revisados", hint: "6 componentes, ~3 MB" },
  { value: "0", label: "errores de sintaxis", hint: "antes: 1 fatal" },
  { value: "425", label: "funciones, 0 colisiones", hint: "entre componentes" },
  { value: "9", label: "hallazgos", hint: "6 corregidos · 3 pendientes" },
];

export const COMPONENTS = [
  {
    name: "nechugo-theme",
    icon: "layout-template",
    files: "117 archivos",
    version: "v1.13.0",
    desc: "Tema padre. inc/ modular: customizer, hero, ads, música, social, schema y seguridad.",
  },
  {
    name: "nechugo-child",
    icon: "git-branch",
    files: "3 archivos",
    version: "v1.13.0",
    desc: "Tema hijo. Hereda el padre y aísla las personalizaciones para que sobrevivan a las actualizaciones.",
  },
  {
    name: "nechugo-core",
    icon: "blocks",
    files: "13 archivos",
    version: "v1.13.0",
    desc: "Plugin core. Shortcodes, bloques Gutenberg, widgets extra e importador de demos.",
  },
  {
    name: "nechugo-companion",
    icon: "panel-top",
    files: "27 archivos",
    version: "v1.13.0",
    desc: "Header y Footer Builder, Mega Menu, blog pro, ads y starter sites importables.",
  },
  {
    name: "nechugo-ai-studio",
    icon: "sparkles",
    files: "23 archivos",
    version: "v1.13.0",
    desc: "Edición con IA, gestión de imágenes y publicación con SEO. Clave de API cifrada con sodium.",
  },
  {
    name: "nechugo-news",
    icon: "newspaper",
    files: "64 archivos",
    version: "sin versión",
    desc: "Tema paralelo con demo-content propio. Aquí estaba el error fatal de sintaxis.",
  },
];

export const FINDINGS: Finding[] = [
  {
    id: "parse-error",
    index: "01",
    priority: "P0",
    status: "corregido",
    title: "Un Parse error tumbaba el tema entero al cargarse",
    location: "nechugo-news/inc/helpers.php:69,72",
    what: "Un reemplazo masivo de barras invertidas en el commit cfa96bd duplicó los separadores de namespace. functions.php hace require_once de ese archivo, así que el tema no llegaba a arrancar: pantalla blanca o error crítico de WordPress.",
    impact:
      "El tema nechugo-news era inutilizable. Además, la línea 69 sí compilaba pero con semántica incorrecta: class_exists buscaba una clase con barras dobles, devolvía siempre false y la detección de Elementor nunca funcionaba, ni arreglando solo la línea 72.",
    snippets: [
      {
        label: "Antes — no compila",
        variant: "before",
        code: `if ( ! class_exists( '\\\\Elementor\\\\Plugin' ) || ! is_singular() ) {
    return false;
}
$plugin = \\\\Elementor\\\\Plugin::instance();`,
      },
      {
        label: "Después",
        variant: "after",
        code: `if ( ! class_exists( '\\Elementor\\Plugin' ) || ! is_singular() ) {
    return false;
}
$plugin = \\Elementor\\Plugin::instance();`,
      },
    ],
    note: "El commit 291ad94 ya había corregido el mismo reemplazo en languages/README.md, pero no revisó el resto de los .php.",
  },
  {
    id: "ci-ciego",
    index: "02",
    priority: "P0",
    status: "corregido",
    title: "El CI linteaba cinco carpetas y se saltaba la sexta",
    location: ".github/workflows/ci.yml",
    what: "El workflow listaba una por una nechugo-theme, -core, -companion, -child y -ai-studio. nechugo-news no estaba en la lista, así que el error fatal del hallazgo 01 llegó a main sin que el job se pusiera rojo.",
    impact:
      "Dos días con un tema roto en la rama principal y el CI en verde. Cualquier carpeta nueva que se añada al repositorio quedaba también fuera de la comprobación.",
    snippets: [
      {
        label: "Antes — cinco pasos, una carpeta cada uno",
        variant: "before",
        code: `- name: Lint theme (nechugo-theme)
  run: |
    find nechugo-theme -name "*.php" -print0 | xargs -0 -n1 php -l

- name: Lint core (nechugo-core)
  run: |
    find nechugo-core -name "*.php" -print0 | xargs -0 -n1 php -l

# …y lo mismo para companion, child y ai-studio`,
      },
      {
        label: "Después — un paso, todo el repositorio",
        variant: "after",
        code: `- name: Lint all PHP files
  run: |
    find . -path ./.git -prune -o -name "*.php" -print0 | xargs -0 -n1 php -l`,
      },
    ],
    note: "También añadí PHP 8.4 a la matriz de versiones: antes llegaba hasta 8.3 y 8.4 es lo que corre hoy en producción. Todo el código lintea limpio en 8.4.",
  },
  {
    id: "xss-carrusel",
    index: "03",
    priority: "P1",
    status: "corregido",
    title: "XSS almacenado en el carrusel de artículos recomendados",
    location: "nechugo-theme/inc/single.php",
    what: "Dos problemas encadenados. Primero, wp_json_encode no escapa < ni /, así que un título que contenga </script> cierra el bloque inline y permite inyectar HTML o JS. Segundo, el JS escribía el título con innerHTML, interpretándolo como markup.",
    impact:
      "Explotable por cualquier usuario con permiso para crear entradas: publica un artículo con ese título y ejecuta script en el navegador de cada visitante que abra otra entrada del mismo blog.",
    snippets: [
      {
        label: "Antes — JSON sin hex-encode",
        variant: "before",
        code: `$js_titles = wp_json_encode( $titles );`,
      },
      {
        label: "Después",
        variant: "after",
        code: `$js_titles = wp_json_encode(
    $titles,
    JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
);`,
      },
      {
        label: "Antes — el título entra como HTML",
        variant: "before",
        code: `el.innerHTML = '<a href="' + item.url + '">' + item.title + '</a>';`,
      },
      {
        label: "Después — el título es texto, nunca markup",
        variant: "after",
        code: `var link = document.createElement('a');
link.href = item.url;
link.textContent = item.title;
el.textContent = '';
el.appendChild(link);`,
      },
    ],
  },
  {
    id: "wp-title",
    index: "04",
    priority: "P1",
    status: "corregido",
    title: "wp_title() obsoleta desde WordPress 4.4 dejaba las migas en blanco",
    location: "nechugo-news/inc/template-tags.php:137",
    what: "wp_title() está obsoleta desde WP 4.4 y devuelve cadena vacía en las páginas de archivo, así que la miga de pan salía vacía en categorías, etiquetas y autores. También dispara avisos de obsolescencia en modo depuración.",
    impact: "Migas de pan sin texto en todas las páginas de archivo y ruido en los logs de depuración.",
    snippets: [
      {
        label: "Antes",
        variant: "before",
        code: `$links[] = '<span>' . esc_html( wp_title( '', false ) ) . '</span>';`,
      },
      {
        label: "Después",
        variant: "after",
        code: `$links[] = '<span>' . esc_html( wp_strip_all_tags( get_the_archive_title() ) ) . '</span>';`,
      },
    ],
  },
  {
    id: "import",
    index: "05",
    priority: "P1",
    status: "corregido",
    title: "El import de configuración leía la subida sin validarla",
    location: "nechugo-theme/inc/ie-port.php",
    what: "El handler ya estaba protegido con nonce y manage_options, pero leía $_FILES[...]['tmp_name'] directamente y hacía file_get_contents() sin comprobar que fuera una subida real ni su tamaño.",
    impact:
      "Sin riesgo de ejecución, pero sin defensa en profundidad: un tmp_name manipulado o un fichero enorme se procesaban igual.",
    snippets: [
      {
        label: "Después",
        variant: "after",
        code: `$upload = isset( $_FILES['nechugo_import_file'] ) ? $_FILES['nechugo_import_file'] : array();

if ( empty( $upload['tmp_name'] ) || ! empty( $upload['error'] ) || ! is_uploaded_file( $upload['tmp_name'] ) ) {
    wp_safe_redirect( add_query_arg( 'nechugo_import', 'error', admin_url( 'admin.php?page=nechugo-options' ) ) );
    exit;
}

// Config exports are small JSON files: refuse anything oversized before reading it.
if ( isset( $upload['size'] ) && (int) $upload['size'] > 1048576 ) { /* … */ }`,
      },
    ],
    note: "is_uploaded_file() antes de leer, comprobación de error de subida y límite de 1 MB. Un export de theme_mods pesa unos pocos KB.",
  },
  {
    id: "searchform",
    index: "06",
    priority: "P1",
    status: "corregido",
    title: "El id del buscador se imprimía sin escapar",
    location: "nechugo-theme/searchform.php",
    what: "El id se generaba con uniqid() y se imprimía sin escapar, con el esc_attr() aplicado en el sitio equivocado: al construir el valor, no al imprimirlo.",
    impact: "Mal patrón más que incidente real — uniqid() devuelve hex — pero deja una salida sin escapar en una plantilla.",
    snippets: [
      {
        label: "Antes",
        variant: "before",
        code: `$chuqui_search_id = 'chuqui-search-' . esc_attr( uniqid() );
<label for="<?php echo $chuqui_search_id; ?>">`,
      },
      {
        label: "Después",
        variant: "after",
        code: `$chuqui_search_id = wp_unique_id( 'chuqui-search-' );
<label for="<?php echo esc_attr( $chuqui_search_id ); ?>">`,
      },
    ],
  },
  {
    id: "dist",
    index: "07",
    priority: "P2",
    status: "pendiente",
    title: "Los zips de dist/ no son lo que hay en main",
    location: "dist/*.zip",
    what: "Los seis paquetes se generaron el 7 de octubre, pero el repositorio cambió el 8, 10, 11 y 13 sin subir el número de versión: siguen diciendo 1.13.0.",
    impact:
      "Quien descargue dist/nechugo-theme.zip e instale no está instalando el código de main, y el número de versión no se lo advierte.",
    snippets: [
      {
        label: "Dos caminos",
        variant: "plain",
        code: `1. Reconstruir los zips desde el código actual y subir la versión a 1.14.0
   en los seis encabezados y constantes NECHUGO_*_VERSION.

2. Sacar los binarios de Git y generarlos en un workflow de release por tag
   (v1.14.0 → zips adjuntos al release). El repositorio no engorda y es
   imposible que se desincronicen.

Recomendación: la 2 como destino, la 1 como paso inmediato.`,
      },
    ],
  },
  {
    id: "i18n",
    index: "08",
    priority: "P2",
    status: "pendiente",
    title: "Cuatro componentes no se pueden traducir",
    location: "*/languages/",
    what: "Solo nechugo-theme tiene plantilla .pot. Las ~380 cadenas de core, companion, ai-studio y nechugo-news no son traducibles aunque las carpetas languages/ existan.",
    impact: "El trabajo de internacionalización ya está hecho en el código, pero no se puede explotar.",
    snippets: [
      {
        label: "Una línea por componente, más el paso en CI",
        variant: "shell",
        code: `wp i18n make-pot nechugo-core nechugo-core/languages/nechugo-core.pot
wp i18n make-pot nechugo-companion nechugo-companion/languages/nechugo-companion.pot
wp i18n make-pot nechugo-ai-studio nechugo-ai-studio/languages/nechugo-ai.pot
wp i18n make-pot nechugo-news nechugo-news/languages/nechugo-news.pot`,
      },
    ],
  },
  {
    id: "estatico",
    index: "09",
    priority: "P2",
    status: "pendiente",
    title: "Solo se comprueba sintaxis: php -l no ve una variable sin escapar",
    location: ".github/workflows/ci.yml",
    what: "El CI actual detecta un Parse error, que era el fallo grave, pero no detecta escapado, capacidades, nonces ni incompatibilidades de versión. Los phpcs:ignore repartidos por el código demuestran que en algún momento se pasó PHPCS.",
    impact: "Las regresiones de seguridad y de estándares vuelven a entrar sin que nada avise.",
    snippets: [
      {
        label: "Por orden de rentabilidad",
        variant: "plain",
        code: `1. PHPCS con WordPress-Coding-Standards + PHPCompatibilityWP (fijado a PHP 7.4).
   Recupera las comprobaciones que ya se hacían a mano.

2. Tests con wp-env + PHPUnit para la lógica propia: insert ads in content,
   asset version, importación de demos.

3. Check de coherencia de versión: encabezado, constante *_VERSION y style.css.
   Hoy la versión está repetida en seis sitios y ya se ha desincronizado.`,
      },
    ],
  },
];

export const PENDING_EXTRA = [
  {
    title: "Clase TGM vendorizada",
    body: "nechugo-theme/inc/tgmpa/class-tgm-plugin-activation.php es código de terceros que usa $_REQUEST y $_GET por todas partes. No la he auditado: conviene actualizarla a la última release o sacarla a Composer.",
  },
  {
    title: "extract() en el cargador de plantillas",
    body: "nechugo-theme/inc/helpers.php:176 usa extract( $args, EXTR_SKIP ). Está marcado con phpcs:ignore y funciona, pero hace que las variables aparezcan de la nada al leer la plantilla.",
  },
  {
    title: "Código de anuncio sin escapar",
    body: "nechugo-news/inc/ads.php:74 y widgets.php:32 imprimen el código del anuncio tal cual y dependen de unfiltered_html. Es una decisión consciente y documentada; conviene restringir el campo a manage_options de forma explícita.",
  },
  {
    title: "Clave de API en texto plano",
    body: "En ai-studio, si falta sodium o las constantes AUTH_*, la clave se guarda sin cifrar en silencio. La degradación elegante está bien, pero debería avisarse en el panel cuando ocurre.",
  },
];

export const VERIFIED = [
  "Guardas ABSPATH en el 100% de los archivos PHP",
  "Nonce + current_user_can() en los 3 manejadores AJAX",
  "Nonce + capacidades en los 4 flujos de importación y presets",
  "425 funciones definidas, 0 nombres repetidos entre componentes",
  "3 consultas a $wpdb, todas DELETE de opciones propias en uninstall",
  "0 claves de API en el código; la de IA va cifrada con sodium",
  "sslverify => true en las 3 llamadas remotas",
  "0 funciones exclusivas de PHP 8 (compatibilidad 7.4 intacta)",
  "5 JS y 16 CSS referenciados: todos existen; main.css de 89 KB",
  "screenshots 1200×900, theme.json v2 válido, wp_body_open() presente",
];

export const COMMANDS = [
  {
    label: "1. Traer la rama con los cambios",
    code: `git clone https://github.com/nechugo/nechugo.git
cd nechugo
git checkout mejoras/auditoria-codigo`,
  },
  {
    label: "2. El mismo lint que ahora corre el CI",
    code: `find . -path ./.git -prune -o -name "*.php" -print0 | xargs -0 -n1 php -l`,
  },
  {
    label: "3. Comprobar el fallo original: en main no compila",
    code: `git stash && php -l nechugo-news/inc/helpers.php`,
  },
];

export const CTA = {
  headline: "Los cambios están en la rama mejoras/auditoria-codigo",
  body: "Commit 1fcb4ca, seis archivos, sin subir al remoto. El informe completo, con el detalle de cada hallazgo y las decisiones pendientes, está en un único Markdown.",
};
