# Escribir notas

Las notas se guardan como archivos Markdown o MDX dentro de `src/content/notas/`. Ambos formatos
utilizan la misma plantilla de lectura; `cardFormat` solo cambia su presentación en el índice.

Usa `docs/templates/nota.md` para una nota normal y `docs/templates/nota-mdx.mdx` cuando necesites
un componente aprobado. Ambas plantillas están pensadas para notas genuinas y omiten `fixture`,
que vale `false` por defecto. Sigue estas pautas:

1. Nombra el archivo con un _slug_ breve y seguro para URL, en minúsculas, sin acentos y con
   guiones, por ejemplo `sistemas-que-respiran.md`. El nombre genera la ruta
   `/notas/sistemas-que-respiran`.
2. Asigna un `archiveNumber` único con el formato `N.000`. El próximo número disponible para una
   nota nueva es `N.004`; `N.999` permanece reservado para posibles verificaciones técnicas y no
   debe usarse en contenido editorial.
3. Elige el estado de madurez que describe honestamente el texto:
   - `semilla`: apunte inicial que todavía puede cambiar de forma;
   - `en-crecimiento`: nota desarrollada que sigue incorporando conexiones;
   - `perenne`: estructura estable que permanece abierta a ajustes.
4. Elige un formato para la tarjeta del índice: `compact`, `standard`, `visual` o `featured`.
   Este valor no modifica la página de lectura. Todas las tarjetas salvo `compact` muestran un
   placeholder neutro mientras no tengan imagen. `featured` se conserva para una futura variante
   visual, pero por ahora se presenta igual que una tarjeta normal no compacta.
5. Para sustituir el placeholder, guarda la imagen en `src/assets/images/notas/<slug>/` y añade
   `coverImage` con la ruta local y un `coverAlt` descriptivo. Si se define una imagen sin texto
   alternativo, la validación falla.
6. Añade etiquetas breves y consistentes en `tags`. Alimentan los filtros del jardín.
7. Usa en `relatedNotes` los IDs de otras notas, es decir, sus nombres de archivo sin `.md` o
   `.mdx`.
8. Usa `relatedLinks` solo para conexiones internas adicionales. Cada elemento necesita un
   `label` visible y un `href` que empiece por `/`.
9. Escribe el cuerpo debajo del frontmatter usando Markdown: párrafos, H2, H3, listas, citas,
   enlaces, énfasis, código, imágenes, figuras y notas al pie cuando aporten a la lectura.

Una nota genuina no debe usar `fixture: true`. Ese campo no es una categoría editorial ni una
forma alternativa de mantener un borrador: sirve únicamente para aislar verificaciones técnicas.

## Markdown o MDX

Usa `.md` para texto, encabezados, listas, citas, enlaces, imágenes, notas al pie y bloques de
código. Es la opción predeterminada y no requiere importar componentes.

Usa `.mdx` únicamente cuando la nota necesite `ContentImage`, `VideoEmbed`, `ImageCarousel` u otro componente Astro
de contenido que haya sido revisado y aprobado. Cambiar `mi-nota.md` por `mi-nota.mdx` conserva el
ID `mi-nota`, la ruta `/notas/mi-nota`, sus metadatos y todas sus referencias. No hace falta
modificar `NoteArticle.astro`.

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

### Insertar un carrusel de imágenes

`ImageCarousel` permite colocar una secuencia de imágenes locales entre párrafos, encabezados,
vídeos, código u otros bloques del cuerpo. Requiere MDX; una imagen estática normal puede seguir en
`.md`. Guarda los activos en `src/assets/images/notas/<slug>/` e impórtalos desde la entrada:

```mdx
import ImageCarousel from "../../components/content/ImageCarousel.astro"
import imageOne from "../../assets/images/notas/mi-nota/imagen-01.jpg"
import imageTwo from "../../assets/images/notas/mi-nota/imagen-02.jpg"

<ImageCarousel
  label="Exploraciones iniciales del sistema"
  images={[
    {
      src: imageOne,
      alt: "Descripción accesible y concreta de la primera imagen",
      caption: "Leyenda opcional de la primera imagen.",
    },
    {
      src: imageTwo,
      alt: "Descripción accesible y concreta de la segunda imagen",
    },
  ]}
/>
```

La API es `label: string` y `images: { src: ImageMetadata; alt: string; caption?: string }[]`.
`label` da nombre accesible a la región; se necesitan al menos dos imágenes importadas localmente y
cada una requiere un `alt` no vacío. La leyenda es opcional, pero recomendable cuando la prosa no
explica el contexto. No admite URLs remotas, no reproduce automáticamente ni entra en bucle. Sin
JavaScript, las imágenes siguen disponibles mediante desplazamiento horizontal nativo; con
JavaScript, los botones, el contador, el gesto táctil y el trackpad permanecen sincronizados.

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

### Añadir imágenes locales

Guarda las imágenes editoriales en `src/assets/images/notas/<slug>/`. Cada imagen significativa
necesita un texto alternativo que describa lo visible. Una imagen Markdown normal no convierte su
título entre comillas en una leyenda visible. Para añadir una leyenda usa MDX, importa el activo
desde un archivo situado directamente en `src/content/notas/` y utiliza `ContentImage`:

```mdx
import ContentImage from "../../components/content/ContentImage.astro"
import inlineImage from "../../assets/images/notas/mi-slug/imagen.jpg"

<ContentImage
  src={inlineImage}
  alt="Descripción accesible de lo que se ve en la imagen"
  caption="Leyenda editorial opcional."
/>
```

La API es `src: ImageMetadata`, `alt: string` y `caption?: string`. El componente valida la imagen
local y el texto alternativo, sirve directamente el único archivo importado y presenta la leyenda
con el mismo estilo mono que vídeos y carruseles. Prepara cada imagen con sus dimensiones finales y
procura mantenerla por debajo de 200 KB. No uses una URL remota como sustituto de un activo editorial aprobado.
Antes de incorporar cualquier archivo, elimina metadatos personales, EXIF/GPS o información de
ubicación que no sea necesaria para publicarlo.

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

## Ejemplos y plantillas

La colección contiene únicamente `umbral`, `margen` y `archivo`. Son ejemplos de contenido y no
deben confundirse con textos editoriales aprobados. No existe una ruta técnica
`/notas/ejemplo-mdx`.

Usa `docs/templates/nota.md` y `docs/templates/nota-mdx.mdx` como referencias para crear contenido.
La plantilla MDX documenta `ContentImage`, `ImageCarousel` y `VideoEmbed` sin añadir una fixture al
jardín. Antes de publicar una nota real, sustituye todo texto, identificador, imagen, alternativa,
leyenda y enlace de demostración por información editorial verificada.

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
