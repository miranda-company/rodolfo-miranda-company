# Rodolfo Miranda Company

Este repositorio contiene el código fuente y el contenido editable del jardín
digital personal de Rodolfo Miranda. Reúne contexto personal y trayectoria
profesional, notas en distintos estados de madurez, una colección de medios,
proyectos seleccionados y un espacio para experimentos actuales o recién
publicados.

El sitio está pensado como un cuerpo de trabajo que puede crecer, revisarse y
establecer conexiones. No sigue la lógica de un blog cronológico ni la de un
portafolio convencional.

## El jardín

El jardín ofrece un lugar común para ideas, referencias, proyectos y
experimentos. Una entrada puede empezar incompleta, adquirir contexto y enlazar
con otras partes del archivo a medida que evoluciona. La arquitectura de
contenido admite material no terminado y hace visible su estado sin confundirlo
con contenido final.

Las notas usan tres estados de madurez:

- **Semilla:** una observación o idea inicial.
- **En crecimiento:** una nota desarrollada que todavía puede cambiar.
- **Perenne:** una pieza estable que sigue abierta a revisión.

Estos estados pertenecen a Notas. Mediateca, Portafolio y Experimentos tienen
sus propios campos editoriales y límites de publicación.

## Recorridos

- `/` — entrada al jardín y panorama de sus áreas principales. Diseño revisado.
- `/yo` — biografía, trabajo actual y trayectoria profesional. Prototipo
  implementado con contenido editorial pendiente.
- `/notas` — notas evolutivas e ideas conectadas. Índice y plantilla de lectura
  revisados.
- `/mediateca` — libros y otras referencias para leer, ver o escuchar. Catálogo
  y plantilla de referencia revisados.
- `/portafolio` — selección de proyectos y casos de estudio. Prototipo
  implementado con fixtures de desarrollo.
- `/experimentos` — experimentos actuales o recién publicados. Estructura
  semántica provisional, sin entradas publicadas.
- `/contacto` — vía de contacto. Estructura semántica provisional.

## Estado actual

- La portada conserva el diseño aprobado y enlaza con las áreas principales.
- Yo incluye biografía, retrato local y trayectoria; cuatro etapas profesionales
  y un fragmento biográfico siguen pendientes de edición.
- Notas muestra 27 entradas durante el desarrollo. Producción genera solo
  `umbral`, `margen` y `archivo`; su copia todavía requiere aprobación editorial.
- Mediateca muestra 13 referencias durante el desarrollo. Producción genera
  solo `modulor`, `cosas` y `orden`; sus comentarios siguen siendo provisionales.
- Portafolio incluye búsqueda, filtros por etiquetas y tres casos ficticios para
  revisar el diseño. Ninguno se publica en la compilación de producción.
- Experimentos y Contacto conservan scaffolding provisional.
- La primera versión es en español. La estructura admite una futura versión en
  inglés, pero todavía no existen rutas traducidas.
- El rastreo está desactivado con `noindex` y `robots.txt` mientras el proyecto
  permanezca en desarrollo.
- No hay un despliegue ni proveedor de hosting documentado. El dominio previsto
  es `www.rodolfomiranda.company`, pero todavía no está conectado según la
  evidencia disponible en el repositorio.

El detalle actualizado se mantiene en
[docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).

## Cómo crece el contenido

El contenido se edita mediante colecciones de Astro, archivos Markdown y JSON
dentro de `src/content/`. Los fixtures de desarrollo permiten revisar diseños,
filtros y rutas sin presentarlos como obra publicada. Las entradas con
`draft: true` se excluyen de la compilación normal de producción.

Notas y referencias pueden enlazar material relacionado. Los proyectos y los
experimentos usan modelos de contenido propios. Los esquemas completos y las
instrucciones editoriales están en
[docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md).

## Tecnología

- Astro con salida estática.
- TypeScript estricto y colecciones de contenido validadas.
- Contenido en Markdown y JSON.
- CSS propio, sin framework de componentes visuales.
- JavaScript mínimo y sin framework para navegación, filtros y búsqueda.
- Fuentes empaquetadas localmente con Fontsource.
- `pnpm` para dependencias y tareas del proyecto.

## Desarrollo local

El proyecto usa Node.js 22 y pnpm 10; las versiones están declaradas en
`.mise.toml`.

```sh
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
```

- `pnpm run dev` inicia Astro en `http://localhost:8443/` por defecto.
- `pnpm run check` ejecuta los diagnósticos estrictos de Astro y TypeScript.
- `pnpm run build` vuelve a comprobar el proyecto y genera el sitio estático.
- `pnpm run preview` sirve localmente la última compilación de producción.

## Estructura y documentación

- `src/pages/` — rutas de Astro.
- `src/components/` — componentes y renderizadores compartidos.
- `src/content/` — contenido editable y fixtures de desarrollo.
- `src/styles/` — sistema visual y estilos por sección.
- `public/` — archivos públicos que no pasan por la canalización de assets.
- `docs/` — arquitectura, modelos editoriales, estado y referencias visuales.

Documentación principal:

- [Arquitectura](docs/ARCHITECTURE.md)
- [Modelo de contenido](docs/CONTENT_MODEL.md)
- [Sistema tipográfico](docs/TYPOGRAPHY_SYSTEM.md)
- [Estado del proyecto](docs/PROJECT_STATUS.md)
- [Lista de preparación para lanzamiento](docs/LAUNCH_CHECKLIST.md)
- [Baseline integrado](docs/integrated-baseline/README.md)

Las referencias visuales anteriores se conservan en `docs/figma-baseline/`,
`docs/notas-baseline/` y `docs/mediateca-baseline/`.

## Inspiración y autoría

Este jardín está diseñado para la identidad, el contenido y las necesidades de
Rodolfo Miranda. El jardín digital de
[Maggie Appleton](https://maggieappleton.com/) influyó en la densidad
exploratoria de Notas y en el enfoque biográfico y cronológico de Yo. El sistema
visual, la identidad, el modelo de contenido y la implementación en Astro son
específicos de este proyecto.

El código fuente de referencia de Maggie Appleton puede consultarse en
[MaggieAppleton/maggieappleton.com-V3](https://github.com/MaggieAppleton/maggieappleton.com-V3).
