# Estado del proyecto

Este documento es la fuente de verdad sobre el estado actual de Rodolfo
Miranda Company. Describe el código y el contenido presentes en el repositorio;
no presupone un despliegue externo.

## Snapshot

- **Fecha:** 2 de agosto de 2026.
- **Rama:** `astro-rebuild`.
- **Framework:** Astro 7 con salida HTML estática.
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
| Portada | `/` | Baseline revisado | JSON validado y previews de los anclajes no draft | Se genera; indexación bloqueada |
| Yo | `/yo` | Prototipo codificado, retrato aprobado | Biografía parcial; cuatro etapas y un párrafo pendientes | Se genera con avisos provisionales |
| Notas | `/notas` | Índice revisado | 3 anclajes y 24 fixtures draft | Se genera con 3 entradas |
| Lectura de nota | `/notas/umbral` | Plantilla revisada | Copia editorial provisional | Se genera |
| Otras notas | `/notas/[slug]` | Scaffold semántico | `margen` y `archivo` no draft; 24 fixtures draft | Solo `margen` y `archivo` |
| Mediateca | `/mediateca` | Catálogo revisado | 3 anclajes y 10 fixtures draft | Se genera con 3 referencias |
| Referencia | `/mediateca/modulor` | Plantilla revisada | Comentario editorial provisional | Se genera |
| Otras referencias | `/mediateca/[slug]` | Renderizador codificado | `cosas` y `orden` no draft; 10 fixtures draft | Solo `cosas` y `orden` |
| Portafolio | `/portafolio` | Prototipo codificado | 3 fixtures draft con búsqueda y etiquetas | Se genera vacío con estado de preparación |
| Caso de estudio | `/portafolio/[slug]` | Prototipo codificado | 3 casos ficticios y provisionales | No se generan detalles |
| Experimentos | `/experimentos` | Scaffold semántico | Solo existe `_template.md`, excluido | Se genera sin entradas |
| Contacto | `/contacto` | Scaffold semántico | Copia Markdown provisional | Se genera |

Los redirects de `/biblioteca` y `/biblioteca/*` hacia `/mediateca` y sus rutas
canónicas están definidos en Astro. Su configuración permanente a nivel de
hosting sigue pendiente.

## Límites actuales de contenido

| Colección | Desarrollo | Producción | Detalles de producción |
| --- | ---: | ---: | --- |
| Notas | 27 | 3 | `umbral`, `margen`, `archivo` |
| Mediateca | 13 | 3 | `modulor`, `cosas`, `orden` |
| Portafolio | 3 | 0 | Ninguno; `_template.md` también queda excluido |
| Experimentos | 0 | 0 | Ninguno; solo existe el template draft excluido |

Los conteos de desarrollo incluyen únicamente entradas que aparecen en sus
índices o generan rutas, no los templates de edición. Los tres anclajes de
Notas y los tres de Mediateca atraviesan el límite técnico de producción, pero
su copia aún no debe considerarse aprobación editorial final.

## Sistemas implementados

- Contrato canónico `BaseLayout → PageShell → Header + main`, con un único
  landmark `main` por página.
- Jerarquía tipográfica semántica compartida para H1–H6 y roles de cuerpo,
  introducción y metadatos.
- Colecciones Astro validadas con TypeScript estricto.
- Exclusión de drafts en la generación estática de producción.
- Navegación por hash con offset de cabecera y respeto por movimiento reducido.
- Menú móvil accesible con cierre por `Escape` y restauración de foco.
- Filtros, orden y conteos en Notas y Mediateca.
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
- Diseñar y completar Contacto.
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
