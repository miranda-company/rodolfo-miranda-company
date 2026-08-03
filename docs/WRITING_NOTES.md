# Escribir notas

Las notas se guardan como archivos Markdown dentro de `src/content/notas/`. Todas utilizan la
misma plantilla de lectura; `cardFormat` solo cambia su presentación en el índice.

Empieza copiando `docs/templates/nota.md` y sigue estas pautas:

1. Nombra el archivo con un *slug* breve y seguro para URL, en minúsculas, sin acentos y con
   guiones, por ejemplo `sistemas-que-respiran.md`. El nombre genera la ruta
   `/notas/sistemas-que-respiran`.
2. Asigna un `archiveNumber` único con el formato `N.000`. Comprueba que no esté usado por otra
   nota.
3. Elige el estado de madurez que describe honestamente el texto:
   - `semilla`: apunte inicial que todavía puede cambiar de forma;
   - `en-crecimiento`: nota desarrollada que sigue incorporando conexiones;
   - `perenne`: estructura estable que permanece abierta a ajustes.
4. Elige un formato para la tarjeta del índice: `compact`, `standard`, `visual` o `featured`.
   Este valor no modifica la página de lectura.
5. Añade etiquetas breves y consistentes en `tags`. Alimentan los filtros del jardín.
6. Usa en `relatedNotes` los IDs de otras notas, es decir, sus nombres de archivo sin `.md`.
7. Usa `relatedLinks` solo para conexiones internas adicionales. Cada elemento necesita un
   `label` visible y un `href` que empiece por `/`.
8. Escribe el cuerpo debajo del frontmatter usando Markdown: párrafos, H2, H3, listas, citas,
   enlaces, énfasis, código, imágenes, figuras y notas al pie cuando aporten a la lectura.

Mantén `draft: true` mientras la nota esté en escritura o revisión. El entorno local muestra los
borradores para comprobar su tarjeta y su ruta, pero la producción los excluye. Actualiza
`updatedAt` cada vez que haya un cambio editorial relevante. Cambia a `draft: false` únicamente
cuando el contenido y sus conexiones estén aprobados para publicación.

## Revisión local

Inicia el sitio y visita tanto el índice como la ruta de la nota:

```sh
pnpm run dev
```

Antes de compartir cambios, ejecuta:

```sh
pnpm run format
pnpm run check
pnpm run build
```

Revisa el diff, confirma que el borrador o la publicación tienen el estado correcto y usa el flujo
habitual de Git para añadir los archivos, crear un commit descriptivo y hacer `push` a la rama
correspondiente.
