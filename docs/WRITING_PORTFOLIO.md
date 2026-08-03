# Escribir proyectos de Portafolio

Los casos de estudio se guardan como Markdown o MDX en `src/content/portafolio/`. Usa
`docs/templates/portafolio.md` para texto y contenido estándar, o
`docs/templates/portafolio-mdx.mdx` cuando el cuerpo necesite un componente aprobado como
`VideoEmbed`.

## Crear una entrada segura

1. Elige un *slug* breve, en minúsculas, sin acentos y separado por guiones, por ejemplo
   `sistema-editorial.md`. El archivo genera `/portafolio/sistema-editorial`.
2. Copia una plantilla fuera de la colección y asigna un `archiveNumber` único `P.###`. El
   siguiente número editorial disponible es `P.004`; `P.999` está reservado para la fixture
   técnica y no puede usarse en un proyecto real.
3. Mantén `draft: true` mientras se redacta y revisa. Un proyecto real usa `placeholder: false`.
   No añadas `fixture`: su valor normal es `false`.
4. Completa `displayOrder` con un entero único, ya que controla tanto el índice como la navegación
   anterior/siguiente.
5. Escribe solo cliente, rol, disciplinas, resultados y enlaces que hayan sido verificados.
6. Usa los IDs de archivo, sin extensión, en `relatedNotes` y `relatedMedia`. Cada elemento de
   `projectLinks` requiere una etiqueta clara y una URL externa completa y aprobada.

## Portada, galería e imágenes editoriales

Guarda los recursos locales en `src/assets/images/portafolio/<slug>/`. Una publicación real
necesita `coverImage` y `coverAlt`; el texto alternativo debe describir lo visible y no repetir el
título. `gallery` conserva imágenes estructuradas después del cuerpo, cada una con `image`, `alt` y
una `caption` opcional.

Las imágenes insertadas dentro del Markdown o MDX son contenido editorial adicional: no sustituyen
la portada ni la galería. En MDX importa el activo local y conserva sus dimensiones intrínsecas:

```mdx
import inlineImage from "../../assets/images/portafolio/mi-slug/imagen.jpg"

<figure>
  <img
    src={inlineImage.src}
    width={inlineImage.width}
    height={inlineImage.height}
    alt="Descripción útil de la imagen"
  />
  <figcaption>Leyenda opcional.</figcaption>
</figure>
```

No uses imágenes remotas, stock genérico ni material de cliente sin permiso.

## Markdown, MDX, vídeo y código

Markdown admite encabezados, párrafos, listas, enlaces, citas, imágenes, notas al pie, tablas y
bloques de código. Usa MDX únicamente para componentes Astro revisados. Desde un archivo situado
directamente en `src/content/portafolio/`, la importación correcta es:

```mdx
import VideoEmbed from "../../components/content/VideoEmbed.astro"
```

`VideoEmbed` solo acepta `youtube` o `vimeo`, un ID válido y un `title` accesible significativo.
La `caption` es opcional. No pegues scripts, HTML de plataformas ni URLs arbitrarias de iframe.

Los bloques cercados funcionan igual en `.md` y `.mdx`. Indica `js`, `ts`, `html`, `css`, `json`,
`bash` o `text`; Astro los resalta con Shiki durante el build y las líneas largas se desplazan
dentro del bloque.

## Revisar y publicar

Ejecuta `pnpm run dev` y revisa el índice y la ruta directa en escritorio, tablet y móvil. Después:

```sh
pnpm run format
pnpm run check
pnpm run build
```

Antes de publicar, comprueba enlaces, derechos de imágenes, textos alternativos, contenido,
conexiones, `displayOrder` y metadatos. Cambia a `draft: false` solo con portada, alternativa y caso
aprobados. Revisa el diff, usa `git add` únicamente sobre los archivos previstos, crea un commit
descriptivo y haz `git push` a la rama correspondiente.

`src/content/portafolio/ejemplo-mdx.mdx` es una fixture técnica, no una plantilla editorial. Se abre
directamente en desarrollo, usa `fixture: true`, `draft: true` y `P.999`, y queda fuera del índice,
filtros, conteos, conexiones, secuencia y producción.
