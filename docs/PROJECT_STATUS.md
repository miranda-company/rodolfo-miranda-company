# Estado del proyecto

Este documento es la fuente de verdad sobre el estado actual de Rodolfo
Miranda Company. Describe el código y el contenido presentes en el repositorio;
no presupone un despliegue externo.

## Snapshot

- **Fecha:** 3 de agosto de 2026.
- **Rama:** `main`.
- **Framework:** Astro 7 con salida HTML estática, colecciones Markdown/MDX y
  resaltado de código Shiki generado durante la compilación.
- **GitHub:** el `HEAD` local y `origin/main` se verificaron en
  `6621fecda136c1d5df3e4ce1480e6d0f6e75a0ce` antes de estos cambios locales,
  que permanecen sin commit.
- **Idioma de la primera versión:** español en rutas raíz.
- **Inglés:** previsto en el modelo de contenido, sin rutas ni traducciones
  implementadas.
- **Indexación:** desactivada mediante `noindex, nofollow` y `public/robots.txt`.
- **Despliegue:** no configurado ni verificado en el repositorio.
- **Dominio:** `www.rodolfomiranda.company` es el destino previsto; no hay
  evidencia de que esté conectado.

## Estado de las rutas

| Sección | Ruta | Diseño | Contenido | Producción |
| --- | --- | --- | --- | --- |
| Portada | `/` | Lenguaje visual establecido; Contacto sustituido intencionadamente por Portafolio | Cuatro paneles validados y estadísticas derivadas de entradas publicadas | Se genera; indexación bloqueada |
| Yo | `/yo` | Prototipo codificado, retrato aprobado | Biografía parcial; cuatro etapas y un párrafo pendientes | Se genera con avisos provisionales |
| Notas | `/notas` | Índice revisado | 27 notas ordinarias en desarrollo; la fixture técnica queda aislada | Se genera con 3 entradas |
| Lectura de nota | `/notas/[slug]` | `NoteArticle.astro` sobre el scaffold editorial compartido | 27 rutas editoriales Markdown/MDX en desarrollo | Solo `umbral`, `margen` y `archivo` |
| Referencia MDX | `/notas/ejemplo-mdx` | Misma geometría y cuerpo enriquecido, sin navegación circular | Fixture técnica directa | Solo desarrollo; no genera artefactos |
| Mediateca | `/mediateca` | Catálogo revisado | 3 anclajes y 10 entradas draft de diseño | Se genera con 3 referencias |
| Referencias | `/mediateca/[slug]` | `MediaReference.astro` sobre el scaffold editorial compartido | 13 referencias y estado editorial validado | Solo `modulor`, `cosas` y `orden` |
| Referencia MDX | `/mediateca/ejemplo-mdx` | Misma geometría y cuerpo enriquecido | Fixture técnica directa; no es una recomendación | Solo desarrollo; no genera artefactos |
| Portafolio | `/portafolio` | Prototipo codificado | 3 placeholders draft con búsqueda y etiquetas | Se genera vacío con estado de preparación |
| Caso de estudio | `/portafolio/[slug]` | `PortfolioProject.astro` sobre el scaffold editorial compartido | 3 casos ficticios y provisionales | No se generan detalles |
| Referencia MDX | `/portafolio/ejemplo-mdx` | Misma geometría y cuerpo enriquecido | Fixture técnica directa; no es trabajo real | Solo desarrollo; no genera artefactos |
| Experimentos | `/experimentos` | Scaffold semántico | Solo existe `_template.md`, excluido | Se genera sin entradas |

Los redirects de `/biblioteca` y `/biblioteca/*` hacia `/mediateca` y sus rutas
canónicas están definidos en Astro. Su configuración permanente a nivel de
hosting sigue pendiente.

## Límites actuales de contenido

| Colección | Desarrollo | Producción | Detalles de producción |
| --- | ---: | ---: | --- |
| Notas ordinarias | 27 | 3 | `umbral`, `margen`, `archivo` |
| Fixture técnica de Notas | 1 ruta directa; 0 tarjetas | 0 | `ejemplo-mdx`, aislada mediante `fixture: true` |
| Mediateca | 13 | 3 | `modulor`, `cosas`, `orden` |
| Fixture técnica de Mediateca | 1 ruta directa; 0 tarjetas | 0 | `ejemplo-mdx`, número reservado `M.999` |
| Portafolio | 3 | 0 | Ninguno |
| Fixture técnica de Portafolio | 1 ruta directa; 0 tarjetas | 0 | `ejemplo-mdx`, número reservado `P.999` |
| Experimentos | 0 | 0 | Ninguno; solo existe el template draft excluido |

Los conteos ordinarios de desarrollo incluyen únicamente entradas editoriales
que aparecen en sus índices y secuencias. Cada `ejemplo-mdx` genera una ruta
directa adicional para revisión técnica, pero no entra en índices, búsquedas,
filtros, conteos, conexiones, secuencias ni previews de portada. Los templates
de edición viven fuera de las colecciones y tampoco generan rutas. En total hay
52 rutas canónicas de desarrollo y 12 de producción, sin contar aliases de
redirect. Los tres anclajes de Notas y los tres de
Mediateca atraviesan el límite técnico de producción, pero su copia aún no debe
considerarse aprobación editorial final.

## Sistemas implementados

- Contrato canónico `BaseLayout → PageShell → Header + main`, con un único
  landmark `main` por página.
- Jerarquía tipográfica semántica compartida para H1–H6 y roles de cuerpo,
  introducción y metadatos.
- Colecciones Astro validadas con TypeScript estricto.
- Exclusión de drafts en la generación estática de producción.
- Navegación por hash con offset de cabecera y respeto por movimiento reducido.
- Menú móvil accesible con cierre por `Escape` y restauración de foco.
- Índice de portada con paneles para Yo, Notas, Mediateca y Portafolio. Las cifras
  de Notas, Mediateca y Portafolio y la fecha de la última Nota se calculan desde
  las entradas no draft, excluyendo fixtures técnicas.
- Filtros, orden y conteos en Notas y Mediateca.
- Sistema compartido de lectura de Notas mediante `NoteArticle.astro` para
  Markdown y MDX, con lenguaje de madurez derivado del contenido, conexiones a
  notas y rutas internas, y navegación anterior/siguiente circular.
- Componentes MDX aprobados con `VideoEmbed.astro`: proveedores YouTube y Vimeo
  permitidos explícitamente, títulos accesibles, captions y enlaces de respaldo.
- Bloques de código estáticos resaltados con Shiki, sin runtime cliente y con
  desplazamiento interno para líneas largas.
- Fixture MDX tipada y excluida explícitamente de listas editoriales, previews,
  secuencias y producción.
- Scaffold `EditorialDetailLayout.astro` compartido por Notas, Portafolio y
  Mediateca, con geometría 170/720/210 y colapso lógico responsive.
- Sistema `.rich-content` común para Markdown/MDX, imágenes, figuras, notas al
  pie, tablas, código Shiki y vídeos permitidos en las tres colecciones.
- Generación canónica de todas las referencias mediante `/mediateca/[slug]` y
  `editorialState` separado del límite `draft`.
- Plantillas y guías de autoría externas a las colecciones para Notas,
  Portafolio y Mediateca.
- Búsqueda, filtros por etiqueta, conteos, estado vacío y orden editorial estable
  en Portafolio.
- Generación estática y carga local de las familias tipográficas.
- Retrato local optimizado mediante la canalización de imágenes de Astro.

## Trabajo pendiente

- Sustituir las cuatro etapas provisionales de la trayectoria y completar la
  edición biográfica de Yo.
- Añadir proyectos profesionales reales, portadas aprobadas y contenido de caso
  de estudio.
- Diseñar y completar Experimentos.
- Revisar o reemplazar la copia provisional de Notas y Mediateca.
- Añadir la futura versión en inglés.
- Elegir y configurar el hosting.
- Conectar `www.rodolfomiranda.company`.
- Revisar los metadatos SEO y retirar `noindex` solo cuando el sitio esté listo
  para lanzamiento.
- Completar `docs/LAUNCH_CHECKLIST.md`.

## Linaje de baselines

- `figma-homepage-v1` — portada estabilizada procedente del export de Figma.
- `astro-foundation-v1` — primera base de producción en Astro.
- `notas-design-v1` — jardín de Notas y experiencia de lectura.
- `mediateca-design-v1` — catálogo de Mediateca y página de referencia.
- `digital-garden-core-v1` — sucesor integrado que reúne los baselines previos
  con Yo, el sistema tipográfico, Portafolio y la arquitectura canónica de
  página. Es anterior al despliegue y a la conexión del dominio.
