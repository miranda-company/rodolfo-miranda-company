# Lista de preparación para lanzamiento

Estas tareas deben completarse antes de retirar `noindex`, conectar el dominio
o presentar el jardín como una publicación terminada.

## Edición

- [ ] Aprobar la biografía de Yo y reemplazar las cuatro etapas provisionales de
      la trayectoria.
- [ ] Sustituir el párrafo biográfico pendiente y retirar su aviso editorial.
- [ ] Revisar y aprobar los resúmenes y cuerpos de `umbral`, `margen` y
      `archivo`.
- [ ] Revisar y aprobar los resúmenes, comentarios y cuerpos de `modulor`,
      `cosas` y `orden`.
- [ ] Retirar los avisos de copia provisional cuando el contenido correspondiente
      esté aprobado.
- [ ] Revisar y aprobar los seis casos de Portafolio que entran en producción:
      `syra-coffee`, `bsc`, `minka-icm`, `cn-sant-andreu`,
      `modulab-barcelona` y `eloquent`.
- [ ] Confirmar en cada caso publicado el periodo, rol, organización, resultados,
      derechos, créditos, enlaces, alternativas y leyendas.
- [ ] Mantener los ocho placeholders restantes de Portafolio como drafts hasta
      sustituir todo el contenido pendiente.
- [ ] Normalizar `archiveNumber` y `displayOrder` antes de publicar cualquiera
      de esos placeholders.
- [ ] Aprobar o reemplazar cada URL externa provisional antes de publicar su
      entrada.
- [ ] Confirmar que cada referencia aprobada usa `editorialState: revisado` y
      que ningún aviso provisional se ha retirado antes de la aprobación.

## Imágenes y contenido enriquecido

- [ ] Confirmar derechos, procedencia y aprobación de cada imagen editorial,
      portada y galería.
- [ ] Revisar que toda imagen significativa tenga texto alternativo útil y que
      las leyendas no dupliquen información innecesariamente.
- [ ] Mantener activos locales en las carpetas por colección y evitar imágenes
      remotas no controladas.
- [ ] Verificar los cuerpos `.rich-content` de Notas, Portafolio y Mediateca en
      escritorio y móvil, incluidos tablas, notas al pie, citas y enlaces.

## Idiomas y metadatos

- [ ] Confirmar el alcance editorial de la primera versión en español.
- [ ] Preparar la versión inglesa antes de activar cualquier ruta de traducción.
- [ ] Revisar títulos, descripciones, URL canónicas y metadatos sociales.
- [ ] Mantener `noindex` y el bloqueo de `robots.txt` hasta la aprobación final.
- [ ] Retirar el bloqueo de indexación solo después de verificar el entorno de
      producción.

## Vídeo, MDX y código

- [ ] Confirmar que cada vídeo aprobado de YouTube o Vimeo sigue disponible y
      permite reproducción embebida.
- [ ] Verificar que cada iframe tiene un `title` accesible, específico y acorde
      con el contenido real.
- [ ] Revisar captions editoriales y enlaces de respaldo hacia la página
      canónica de cada vídeo.
- [ ] Confirmar el uso de `youtube-nocookie.com` para YouTube y `dnt=1` para
      Vimeo.
- [ ] Configurar en el hosting la política CSP necesaria para los reproductores
      externos y revisar sus requisitos de medios, privacidad y terceros.
- [ ] Evaluar el comportamiento final de cookies y el contexto legal aplicable
      antes de decidir si hace falta un mecanismo de consentimiento.
- [ ] Confirmar que ninguna entrada con `fixture: true`, incluidos su HTML,
      metadatos, imágenes técnicas, IDs de vídeo y muestras, aparece en
      producción.
- [ ] Confirmar que ningún proyecto publicado contiene etiquetas, captions,
      vídeos o imágenes descritos como pruebas técnicas aunque no use
      `fixture: true`.
- [ ] Rechazar componentes que acepten iframes arbitrarios o scripts pegados;
      cada futuro proveedor necesita un componente revisado y permitido.
- [ ] Comprobar en móvil que las líneas largas de los bloques de código se
      desplazan dentro del bloque sin desbordar la página.

## Rutas, hosting y dominio

- [ ] Elegir y configurar un proveedor de hosting.
- [ ] Configurar redirects permanentes de `/biblioteca` a `/mediateca` y de
      `/biblioteca/*` a `/mediateca/*` en el hosting.
- [ ] Eliminar el solapamiento entre `/biblioteca/modulor` y
      `/biblioteca/[slug]` para que el build termine sin avisos de rutas.
- [ ] Verificar rutas directas, fragments y páginas de error en el entorno
      desplegado.
- [ ] Conectar `www.rodolfomiranda.company` y verificar DNS, HTTPS y redirección
      del dominio raíz si se utiliza.
- [ ] Ejecutar la comprobación, la compilación y la revisión responsive final.

## Higiene del repositorio

- [x] Excluir archivos `.DS_Store` del repositorio.
- [ ] Retirar recursos duplicados o sin uso después de confirmar cuál es la
      copia canónica de cada imagen.
- [ ] Decidir y documentar el alcance mínimo de pruebas automatizadas antes del
      lanzamiento.
