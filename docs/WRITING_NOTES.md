# Escribir notas

Las notas se guardan como archivos Markdown o MDX dentro de `src/content/notas/`. Ambos formatos
utilizan la misma plantilla de lectura; `cardFormat` solo cambia su presentación en el índice.

Usa `docs/templates/nota.md` para una nota normal y `docs/templates/nota-mdx.mdx` cuando necesites
un componente aprobado. Sigue estas pautas:

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
6. Usa en `relatedNotes` los IDs de otras notas, es decir, sus nombres de archivo sin `.md` o
   `.mdx`.
7. Usa `relatedLinks` solo para conexiones internas adicionales. Cada elemento necesita un
   `label` visible y un `href` que empiece por `/`.
8. Escribe el cuerpo debajo del frontmatter usando Markdown: párrafos, H2, H3, listas, citas,
   enlaces, énfasis, código, imágenes, figuras y notas al pie cuando aporten a la lectura.

## Markdown o MDX

Usa `.md` para texto, encabezados, listas, citas, enlaces, imágenes, notas al pie y bloques de
código. Es la opción predeterminada y no requiere importar componentes.

Usa `.mdx` únicamente cuando la nota necesite `VideoEmbed` u otro componente Astro de contenido
que haya sido revisado y aprobado. Cambiar `mi-nota.md` por `mi-nota.mdx` conserva el ID `mi-nota`,
la ruta `/notas/mi-nota` y todas sus referencias. No hace falta modificar `NoteArticle.astro`.

Desde `src/content/notas/`, la importación correcta del vídeo es:

```mdx
import VideoEmbed from "../../components/content/VideoEmbed.astro"
```

### Insertar un vídeo

YouTube y Vimeo son los únicos proveedores aprobados. La aplicación construye internamente la URL
del reproductor y no acepta URLs de iframe arbitrarias.

```mdx
<VideoEmbed
  provider="youtube"
  videoId="VIDEO_ID"
  title="Descripción accesible del contenido del vídeo"
  caption="Comentario editorial opcional sobre el vídeo."
/>
```

- En YouTube, el ID es el valor que aparece después de `v=` en una URL `youtube.com/watch`, o el
  segmento que sigue a `youtu.be/`. Normalmente contiene 11 letras, números, guiones o guiones
  bajos.
- En Vimeo, el ID es la secuencia numérica de la URL del vídeo.
- `title` es obligatorio. Describe el vídeo para quien utiliza tecnología de asistencia; no uses
  textos genéricos como “Vídeo”.
- `caption` es opcional y aporta contexto editorial visible.
- El vídeo permanece alojado en YouTube o Vimeo: no es necesario añadir el archivo audiovisual al
  repositorio.

### Añadir código

Los bloques de código funcionan igual en `.md` y `.mdx`. Usa tres acentos graves e indica el
lenguaje para obtener resaltado de sintaxis con Shiki:

````md
```ts
interface Note {
  title: string
  state: "semilla" | "en-crecimiento" | "perenne"
}
```
````

Los identificadores habituales incluyen `js`, `ts`, `html`, `css`, `json`, `bash` y `text`. Los
bloques son estáticos, no ejecutan código y no incluyen botón de copia.

## Política de componentes y widgets

- YouTube y Vimeo son los únicos embeds permitidos en este momento.
- Cada futuro proveedor debe tener su propio componente Astro revisado y añadido explícitamente a
  la lista permitida.
- Pegar `<script>`, HTML de widgets o URLs de iframe arbitrarias no forma parte del flujo admitido.
- Un componente interactivo debe usar el mínimo JavaScript cliente necesario.
- Todo widget necesita un nombre accesible significativo y contenido alternativo o un enlace de
  respaldo.

Mantén `draft: true` mientras la nota esté en escritura o revisión, especialmente cuando incorpore
vídeo, código o futuros componentes enriquecidos. El entorno local muestra los borradores para
comprobar su tarjeta y su ruta, pero la producción los excluye. Actualiza `updatedAt` cada vez que
haya un cambio editorial relevante. Cambia a `draft: false` únicamente cuando el contenido y sus
conexiones estén aprobados para publicación.

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
