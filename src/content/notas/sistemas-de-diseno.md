---
title: "Sistemas de diseño"
summary: "¿Qué es un design system y para qué sirve?"
publishedAt: 2026-10-25
updatedAt: 2026-10-25
state: "semilla"
archiveNumber: "N.003"
cardFormat: "standard"
tags:
  - "Diseño"
  - "Sistemas"
relatedNotes: []
featured: true
draft: false
language: "es"
---

A diario usamos herramientas digitales que nos permiten hacer una variedad de cosas: desde pedir indicaciones de cómo llegar a un lugar, reservar una mesa en un restaurante hasta revisar nuestra bandeja de correo electrónico.

Es probable que al utilizarlas ni siquiera nos detengamos a pensar sobre cómo funcionan y qué está pasando tras bambalinas. Y esa es la intención, pero eso es más fácil decirlo que hacerlo.

La facilidad de uso de estos productos digitales no viene sin esfuerzo. Hacia finales de 2025 Google (Alphabet) registraba más de 194,000 empleados a nivel mundial. Alinear tantas personas entre diseño, ingeniería y negocio requiere sistemas. Y uno de los sistemas más importantes para los equipos que desarrollan productos digitales es el sistema de diseño (design system).

Algunos de los sitemas de diseño más usados:
- [Material Design de Google](https://m3.material.io/).
- [Carbon Design System de IBM](https://www.carbondesignsystem.com/).
- [Fluent de Microsoft](https://m3.material.io/).
---
## ¿Por qué son importantes los sistemas de diseño?

Sin un sistema de diseño las empresas que producen productos digitales no tendrían una guía a seguir. Cada vez que desarrollaran una nueva aplicación, una pantalla, una nueva funcionalidad tendrían que empezar de cero. Esto sería insostenible. De ahí la importancia de tener un sistema. Un sistema permite tener una referencia de cómo se espera que el producto funcione, se vea y evolucione.

Por la parte que corresponde a los usuarios, los sistemas de diseño son muy importantes. Garantizan que las personas que usan nuestros productos no tengan que aprender cómo funcionan cada vez que interactuan con ellos. 

### Beneficios de tener un sistema de diseño

- Eficiencia: no tienes que re-inventar el hilo negro cada vez. 
- Consistencia: re-usabilidad para ganar consistencia.
- Innovación: [libera tiempo de diseñadores e ingenieros](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system) para poder pensar en mejores soluciones o nuevos productos y funcionalidades.

> The most useful design system products manifest as both design and code. - Dan Mall
---
## Elementos de un sistema de diseño

### Componentes

### Design Tokens

Los tokens son variables de estilo que pueden almacenar un color, el espaciado o el tamaño de ciertos elementos de la interfaz de usuario (UI). Permiten mantener y crecer las aplicaciones de forma sostenible.

Por poner un ejemplo, en el sistema hexadecimal el color negro es #000000. Este valor puede no ser comprendido por cualquier persona. Sería más amigable crear una variable llamada "color-negro" y guardar en ella el valor hexa #000000. Así, podemos utilizar color-negro que resulta más comprensible. Pero ¿qué pasa si queremos cambiar de color? tendríamos que cambiar el valor hexadecimal y además cambiar el nombre de la variable en todos los lugares en los que la hayamos utilizado. He ahí que en el proceso de desarrollo se utilicen nombres semánticos para las variables. En vez de "color-negro", podríamos usar "color-principal" o primario.

Los nombres semánticos describen el uso del token, mientras que las variables primitivass almacenan la información cruda.
Esto permite que podamos hacer temas y cambiar el estilo de nuestra aplicación de forma sencilla.

Las variables primitivas no deberían de ser usadas directamente en el diseño de nuestra aplicación.
Al proceso en desarrollo de crear variables que hacen referencia a otras variables se le llama "Tokenization".


### Color system
---
## Lecturas recomendadas
- [Atomic Design de Brad Frost](https://atomicdesign.bradfrost.com/table-of-contents/)
- [Principles of Design de Tim Berners-Lee](https://www.w3.org/DesignIssues/Principles.html)
- [How do design systems improve developer efficiency? por Sonia Singla](https://backlight.dev/blog/how-do-design-systems-improve-developer-efficiency)
- [Design Tokens Specification by the Design Tokens Community Group](https://www.designtokens.org/tr/2025.10/)
- [Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Courses and collections, Figma](https://help.figma.com/hc/en-us/sections/23691657321239)
---
## Herramientas
- [StoryBook](https://storybook.js.org/)
- [ZeroHeight](https://zeroheight.com/)
- [Figma](https://figma.com/)
- [Visual Studio Code](https://code.visualstudio.com/)