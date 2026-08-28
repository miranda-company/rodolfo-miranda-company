# Estado del proyecto

Esta es la fuente de verdad sobre el estado actual de Rodolfo Miranda Company.
Describe lo que existe en el repositorio y separa la generación técnica de la
aprobación editorial.

## Resumen

- **Fecha de revisión:** 28 de agosto de 2026.
- **Rama de trabajo:** `main`.
- **Framework:** Astro 7 con salida HTML estática y TypeScript estricto.
- **Idioma activo:** español en las rutas raíz. No existen rutas inglesas.
- **Indexación:** bloqueada mediante `noindex, nofollow` y el endpoint generado
  `src/pages/robots.txt.ts`.
- **Metadatos:** canonical, tarjetas sociales, JSON-LD y sitemap implementados;
  la indexación continúa bloqueada por defecto.
- **Hosting y dominio:** no configurados ni verificados en el repositorio.
- **Dominio previsto:** `www.rodolfomiranda.company`.

## Rutas y contenido

| Sección              | Ruta                 | Desarrollo                                               | Producción                                        |
| -------------------- | -------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| Portada              | `/`                  | Cuatro paneles y previews derivados de contenido visible | Se genera con estadísticas de entradas publicadas |
| Yo                   | `/yo`                | Biografía, retrato y trayectoria                         | Se genera; biografía y trayectoria aprobadas      |
| Notas                | `/notas`             | 3 notas locales y 4 enlaces externos                     | Los mismos 7 elementos                            |
| Detalle de Nota      | `/notas/[slug]`      | 3 rutas editoriales locales                              | Las mismas 3 rutas                                |
| Mediateca            | `/mediateca`         | 10 referencias ordinarias                                | 9 referencias publicadas                          |
| Detalle de Mediateca | `/mediateca/[slug]`  | 10 rutas editoriales y una fixture directa               | Las 9 referencias publicadas                      |
| Portafolio           | `/portafolio`        | 14 proyectos ordinarios                                  | 6 proyectos publicados                            |
| Caso de Portafolio   | `/portafolio/[slug]` | 14 rutas editoriales y una fixture directa               | Los 6 casos publicados                            |
| Colofón              | `/colofon`           | Explicación técnica y editorial del sitio                | Se genera                                         |
| Registro             | `/registro`          | Índice alfabético derivado de las rutas publicadas       | Se genera y coincide con el sitemap               |
| Página no encontrada | `/404`               | Página de error propia                                   | Se genera siempre con `noindex, nofollow`         |

Los seis casos de Portafolio incluidos en producción son:

- `syra-coffee`
- `bsc`
- `minka-icm`
- `cn-sant-andreu`
- `modulab-barcelona`
- `eloquent`

Las otras ocho entradas de Portafolio son placeholders con `draft: true`. No
entran en producción. Antes de publicar una de ellas hay que reemplazar el
contenido pendiente, asignar valores únicos y completar su revisión editorial.

## Límites de publicación

| Colección  | Entradas ordinarias en desarrollo | Entradas en producción | Fixture técnica                          |
| ---------- | --------------------------------: | ---------------------: | ---------------------------------------- |
| Notas      |                                 3 |                      3 | Ninguna                                  |
| Mediateca  |                                10 |                      9 | `M.999`, solo ruta directa en desarrollo |
| Portafolio |                                14 |                      6 | `P.999`, solo ruta directa en desarrollo |

En total hay 36 rutas canónicas en desarrollo y 25 en un build normal de
producción, sin contar los aliases de `/biblioteca` ni la página 404. Las dos rutas
`ejemplo-mdx` de Mediateca y Portafolio se usan para revisar componentes técnicos y no aparecen en
índices, filtros, conteos, conexiones, navegación anterior/siguiente, portada o
producción.

`draft: false` permite generar una entrada, pero no equivale a aprobación
editorial. Los textos, créditos, enlaces, imágenes y alternativas deben
revisarse antes del lanzamiento.

## Sistemas implementados

- Estructura común `BaseLayout → PageShell → Header + main + Footer`.
- Jerarquía tipográfica semántica compartida para H1–H6, cuerpo y metadatos.
- Tokens semánticos compartidos para superficies, color de interfaz, foco y
  movimiento, con rangos responsivos compact, medium y expanded documentados.
- CSS específico de la portada aislado en `src/styles/home.css`; las demás
  rutas no cargan su composición de paneles y previews.
- Colecciones Astro validadas y helpers centrales para separar drafts y
  fixtures.
- Grafo editorial bidireccional generado durante el build: las relaciones
  declaradas en Notas, Mediateca y Portafolio producen enlaces directos,
  recíprocos y backlinks automáticos sin JavaScript cliente.
- Navegación por hash con offset de cabecera y respeto por movimiento reducido.
- Navegación global hacia Yo, Portafolio, Notas y Mediateca; el menú móvil se
  cierra con `Escape` y restaura el foco.
- Footer global con LinkedIn, email, Colofón y Registro; Registro y
  el sitemap comparten una única lista de rutas publicadas.
- Filtros, orden, búsqueda, conteos y estados vacíos en los índices editoriales;
  Notas y Mediateca comparten el controlador tipado de disclosure y filtros.
- Layout de detalle compartido por Notas, Mediateca y Portafolio, con una
  variante de Portafolio sin barra derecha.
- Cuerpo `.rich-content` común para Markdown, MDX, imágenes con leyenda,
  carruseles, vídeo, código, tablas y notas al pie.
- Imágenes locales servidas desde un único archivo importado, con dimensiones
  intrínsecas y texto alternativo validado; no se generan variantes responsivas.
- Redirects de compatibilidad desde `/biblioteca` hacia `/mediateca`.
- Metadatos canónicos y sociales, favicon, JSON-LD, sitemap derivado del
  contenido y switch seguro de indexación.
- Página 404 propia, integrada en el layout común y bloqueada para indexación
  incluso si el resto del sitio se habilita más adelante.
- Fuentes locales y generación estática sin framework cliente.
- Pruebas Playwright de rutas, responsive e interacción, escaneos axe-core,
  contratos de producción, presupuestos de salida y workflow de GitHub Actions.
- Auditoría Lighthouse reproducible sobre cuatro rutas representativas.

## Verificación actual

- `git diff --check`: correcto.
- `pnpm run check`: 63 archivos, 0 errores, 0 avisos y 0 sugerencias.
- `pnpm run build`: correcto; genera 25 páginas canónicas de producción.
- `pnpm run test:production`: confirma 25 rutas canónicas, diez redirects y
  los límites editoriales 3 Notas locales / 4 artículos externos / 9
  referencias / 6 proyectos, además de canonical, tarjetas sociales, JSON-LD,
  sitemap y bloqueo de indexación.
- `pnpm run test:budgets`: correcto; `dist` ocupa 13,02 MiB, el HTML 486,0 KiB,
  el CSS 57,7 KiB, el JavaScript emitido 4,6 KiB y las fuentes 94,9 KiB; la
  imagen mayor pesa 422,9 KiB.
- `pnpm run test:e2e:dist`: 47 pruebas correctas en Chromium, incluidos los
  escaneos axe-core WCAG A/AA, escritorio, móvil, teclado, filtros, fragmentos,
  carruseles, conexiones bidireccionales, movimiento reducido, consola,
  imágenes y overflow.
- `pnpm run audit:lighthouse:dist`: rendimiento 95 en portada, 100 en Umbral y
  Modulor y 99 en Syra Coffee; accesibilidad 100 en las cuatro rutas; buenas
  prácticas 100 salvo Syra Coffee (77 por la cookie externa de Vimeo); SEO
  66–69 con `noindex` activo.
- Las fixtures técnicas quedan fuera de `dist` y de la suite de producción.
- La automatización no sustituye una auditoría manual completa de accesibilidad
  ni una revisión visual antes de publicar.

## Trabajo pendiente

- Sustituir o aprobar la copia de los tres ejemplos de Notas y aprobar las tres
  referencias de Mediateca que se generan en producción.
- Revisar los seis casos de Portafolio publicados: texto, resultados, derechos,
  créditos, enlaces, alternativas y leyendas.
- Mantener los ocho placeholders de Portafolio como drafts hasta sustituir todo
  el contenido pendiente y normalizar `archiveNumber` y `displayOrder`.
- Elegir hosting, configurar redirects permanentes y conectar el dominio.
- Revisar previews sociales y datos estructurados con las URLs públicas.
- Retirar `noindex` únicamente después de completar la
  [lista de lanzamiento](LAUNCH_CHECKLIST.md).
