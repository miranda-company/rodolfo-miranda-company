# Baseline integrado: digital-garden-core-v1

Este directorio preserva la referencia visual acumulativa del núcleo del jardín
digital en español. El baseline reúne el estado revisado de la portada, Notas y
Mediateca con la página Yo, el retrato local, el sistema tipográfico semántico,
el prototipo de Portafolio y la arquitectura canónica `PageShell`.

## Relación con baselines anteriores

`digital-garden-core-v1` sucede, sin reemplazar ni reescribir, a:

- `figma-homepage-v1`
- `astro-foundation-v1`
- `notas-design-v1`
- `mediateca-design-v1`

Las capturas específicas de filtros y estados de Notas y Mediateca siguen en
sus directorios históricos. Este baseline integrado evita duplicarlas y se
concentra en el estado general del jardín.

## Alcance

Las referencias representan `/`, `/yo`, `/notas`, `/mediateca`, `/portafolio` y
un caso de estudio de desarrollo. `/experimentos` y `/contacto` forman parte de
la arquitectura integrada, pero continúan como scaffolding semántico y no
requieren una referencia visual propia en este checkpoint.

## Capturas

- `homepage-desktop-1440x900-full.png` — portada completa.
- `yo-desktop-1440x900-full.png` — página Yo completa en escritorio.
- `yo-mobile-390x844-full.png` — página Yo completa en móvil.
- `notas-desktop-1440x900-full.png` — jardín de desarrollo con 27 notas.
- `mediateca-desktop-1440x900-full.png` — catálogo de desarrollo con 13 referencias.
- `portafolio-desktop-1440x900-full.png` — índice con tres fixtures de desarrollo.
- `portafolio-mobile-390x844-full.png` — índice móvil completo.
- `portafolio-proyecto-seleccionado-01-desktop-1440x900-full.png` — caso de
  estudio representativo.

Los PNG se almacenan mediante las reglas Git LFS existentes en `.gitattributes`.

## Límites de contenido

- Desarrollo: 27 notas, 13 referencias y 3 proyectos provisionales.
- Producción: 3 notas (`umbral`, `margen`, `archivo`), 3 referencias
  (`modulor`, `cosas`, `orden`) y ningún detalle de Portafolio.
- Experimentos no contiene entradas publicadas; su único template queda
  excluido en desarrollo y producción.

La copia de los anclajes de Notas y Mediateca, cuatro etapas de la trayectoria,
un fragmento biográfico y todos los casos de Portafolio siguen siendo
provisionales.

## Verificación

El 2 de agosto de 2026 se verificaron:

- `git diff --check`, `pnpm run check` y `pnpm run build`, sin diagnósticos.
- Las diez rutas principales a 1440 × 900, 1024 × 768 y 390 × 844: 30
  combinaciones sin overflow horizontal.
- Un único contrato `BaseLayout → PageShell → Header + main`, la misma firma de
  patrón y una sola firma tipográfica por nivel H1, H2 y H3 en cada viewport.
- Navegación por hash directa y desde otra ruta, menú móvil con restauración de
  foco, filtros, orden, búsqueda, conteos, reset y estados vacíos.
- Ausencia de errores o advertencias en consola.
- Exclusión de rutas draft en producción y carga local del retrato optimizado.

Este baseline es anterior a cualquier despliegue, conexión de dominio o
activación de indexación.
