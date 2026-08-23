# Estado del proyecto

Esta es la fuente de verdad sobre el estado actual de Rodolfo Miranda Company.
Describe lo que existe en el repositorio y separa la generación técnica de la
aprobación editorial.

## Resumen

- **Fecha de revisión:** 23 de agosto de 2026.
- **Rama de trabajo:** `main`.
- **Framework:** Astro 7 con salida HTML estática y TypeScript estricto.
- **Idioma activo:** español en las rutas raíz. No existen rutas inglesas.
- **Indexación:** bloqueada mediante `noindex, nofollow` y `public/robots.txt`.
- **Hosting y dominio:** no configurados ni verificados en el repositorio.
- **Dominio previsto:** `www.rodolfomiranda.company`.

## Rutas y contenido

| Sección              | Ruta                 | Desarrollo                                               | Producción                                                 |
| -------------------- | -------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| Portada              | `/`                  | Cuatro paneles y previews derivados de contenido visible | Se genera con estadísticas de entradas publicadas          |
| Yo                   | `/yo`                | Biografía, retrato y trayectoria                         | Se genera; parte de la copia sigue pendiente de aprobación |
| Notas                | `/notas`             | 27 entradas ordinarias                                   | 3 entradas: `umbral`, `margen`, `archivo`                  |
| Detalle de Nota      | `/notas/[slug]`      | 27 rutas editoriales y una fixture directa               | Solo las 3 entradas publicadas                             |
| Mediateca            | `/mediateca`         | 13 referencias ordinarias                                | 3 referencias: `modulor`, `cosas`, `orden`                 |
| Detalle de Mediateca | `/mediateca/[slug]`  | 13 rutas editoriales y una fixture directa               | Solo las 3 referencias publicadas                          |
| Portafolio           | `/portafolio`        | 14 proyectos ordinarios                                  | 6 proyectos publicados                                     |
| Caso de Portafolio   | `/portafolio/[slug]` | 14 rutas editoriales y una fixture directa               | Los 6 casos publicados                                     |

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
| Notas      |                                27 |                      3 | `N.999`, solo ruta directa en desarrollo |
| Mediateca  |                                13 |                      3 | `M.999`, solo ruta directa en desarrollo |
| Portafolio |                                14 |                      6 | `P.999`, solo ruta directa en desarrollo |

En total hay 62 rutas canónicas en desarrollo y 17 en un build normal de
producción, sin contar los aliases de `/biblioteca`. Las tres rutas
`ejemplo-mdx` se usan para revisar componentes técnicos y no aparecen en
índices, filtros, conteos, conexiones, navegación anterior/siguiente, portada o
producción.

`draft: false` permite generar una entrada, pero no equivale a aprobación
editorial. Los textos, créditos, enlaces, imágenes y alternativas deben
revisarse antes del lanzamiento.

## Sistemas implementados

- Estructura común `BaseLayout → PageShell → Header + main`.
- Jerarquía tipográfica semántica compartida para H1–H6, cuerpo y metadatos.
- Colecciones Astro validadas y helpers centrales para separar drafts y
  fixtures.
- Navegación por hash con offset de cabecera y respeto por movimiento reducido.
- Menú móvil accesible con cierre por `Escape` y restauración de foco.
- Filtros, orden, búsqueda, conteos y estados vacíos en los índices editoriales.
- Layout de detalle compartido por Notas, Mediateca y Portafolio, con una
  variante de Portafolio sin barra derecha.
- Cuerpo `.rich-content` común para Markdown, MDX, imágenes con leyenda,
  carruseles, vídeo, código, tablas y notas al pie.
- Imágenes locales optimizadas con Astro y texto alternativo validado.
- Redirects de compatibilidad desde `/biblioteca` hacia `/mediateca`.
- Fuentes locales y generación estática sin framework cliente.

## Verificación actual

- `git diff --check`: correcto.
- `pnpm run check`: 42 archivos, 0 errores, 0 avisos y 0 sugerencias.
- `pnpm run build`: correcto; genera 17 páginas canónicas de producción.
- Las fixtures técnicas quedan fuera de `dist`.
- El build mantiene un aviso no bloqueante por el solapamiento entre
  `/biblioteca/modulor` y `/biblioteca/[slug]`.
- No existe todavía una suite automatizada de pruebas unitarias, end-to-end,
  accesibilidad o regresión visual.

## Trabajo pendiente

- Completar y aprobar la biografía y las cuatro etapas provisionales de Yo.
- Aprobar la copia de las tres Notas y las tres referencias de Mediateca que se
  generan en producción.
- Revisar los seis casos de Portafolio publicados: texto, resultados, derechos,
  créditos, enlaces, alternativas y leyendas.
- Mantener los ocho placeholders de Portafolio como drafts hasta sustituir todo
  el contenido pendiente y normalizar `archiveNumber` y `displayOrder`.
- Resolver el solapamiento de redirects de `/biblioteca/modulor`.
- Definir el alcance mínimo de pruebas automatizadas.
- Elegir hosting, configurar redirects permanentes y conectar el dominio.
- Revisar SEO y retirar `noindex` únicamente después de completar la
  [lista de lanzamiento](LAUNCH_CHECKLIST.md).
