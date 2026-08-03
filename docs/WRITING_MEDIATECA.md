# Escribir referencias de Mediateca

Las referencias se guardan como Markdown o MDX en `src/content/mediateca/`. Usa
`docs/templates/mediateca.md` para contenido estándar y `docs/templates/mediateca-mdx.mdx` cuando
la nota editorial necesite un componente aprobado.

## Crear una referencia segura

1. Elige un *slug* breve, en minúsculas, sin acentos y separado por guiones, por ejemplo
   `manual-de-sistemas.md`. El archivo genera `/mediateca/manual-de-sistemas`.
2. Asigna un número único `M.###`. El siguiente número editorial disponible es `M.014`; `M.999`
   está reservado para la fixture técnica y se rechaza en una referencia normal.
3. Empieza con `draft: true` y no añadas `fixture`. Las referencias draft aparecen en desarrollo,
   pero no generan rutas de producción.
4. Selecciona el `format` real: `book`, `article`, `website`, `tool`, `video`, `podcast` u `other`.
5. Elige el consumo principal en `engagementMode`: `read`, `watch` o `listen`. La interfaz los
   muestra como LEER, VER o ESCUCHAR; no sustituyen el formato.
6. Conserva `editorialState: provisional` mientras comentario, contexto o cuerpo necesiten revisión.
   Usa `revisado` solo después de la aprobación; entonces desaparece el aviso provisional y el
   encabezado pasa a “Comentario”. `editorialState` no sustituye a `draft`.
7. Elige el `status` editorial (`en-curso`, `consultado`, `de-referencia` o `por-explorar`). Sigue
   apareciendo como metadata aunque no sea un filtro del catálogo.
8. Usa IDs de archivo sin extensión en `relatedNotes` y `relatedMedia`. Verifica `externalUrl`
   contra la fuente canónica antes de publicar.

## Cubierta e imágenes editoriales

Una cubierta opcional puede guardarse en `src/assets/images/mediateca/<slug>/` y referenciarse con
`coverImage`. Las imágenes incluidas en el cuerpo son independientes de la cubierta. Cada imagen
significativa necesita texto alternativo útil; una leyenda es opcional. En MDX, desde un archivo
directamente bajo la colección, importa el activo así:

```mdx
import inlineImage from "../../assets/images/mediateca/mi-slug/imagen.jpg"
```

Usa el patrón semántico `<figure>`, `<img>` y `<figcaption>` de la plantilla MDX, preservando
`width` y `height`. No uses URLs remotas como sustituto del repositorio de activos aprobado.

## Markdown, MDX, vídeo y código

Markdown cubre encabezados, párrafos, listas, enlaces, citas, imágenes, notas al pie, tablas y
código. MDX se reserva para componentes Astro aprobados. La importación correcta de vídeo desde
`src/content/mediateca/` es:

```mdx
import VideoEmbed from "../../components/content/VideoEmbed.astro"
```

`VideoEmbed` solo admite YouTube y Vimeo. Requiere un ID validado y un `title` accesible específico;
la `caption` es opcional. La aplicación construye `youtube-nocookie.com` o Vimeo con `dnt=1`, carga
el iframe de forma diferida y ofrece un enlace externo visible. No pegues scripts ni iframes.

Los bloques cercados funcionan igual en `.md` y `.mdx`. Usa identificadores como `js`, `ts`,
`html`, `css`, `json`, `bash` o `text`; el resaltado Shiki es estático y no añade runtime cliente.

## Revisar y publicar

Ejecuta `pnpm run dev`, revisa `/mediateca`, la ruta directa, los filtros y las conexiones. Después:

```sh
pnpm run format
pnpm run check
pnpm run build
```

Confirma autoría, comentario, URL externa, modo de consulta, textos alternativos y relaciones.
Cambia `editorialState` a `revisado` únicamente tras la aprobación editorial y `draft` a `false`
solo cuando la referencia esté lista para producción. Revisa el diff, añade los archivos previstos,
crea un commit descriptivo y haz `git push` a la rama correspondiente.

`src/content/mediateca/ejemplo-mdx.mdx` es una fixture técnica, no una recomendación ni una plantilla.
Usa `fixture: true`, `draft: true` y `M.999`; solo tiene ruta directa en desarrollo y queda fuera del
catálogo, filtros, conteos, conexiones y producción.
