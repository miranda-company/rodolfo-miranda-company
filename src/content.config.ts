import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const language = z.enum(["es", "en"]).default("es");
const translationKey = z.string().min(1).optional();

const notas = defineCollection({
  loader: glob({ base: "./src/content/notas", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    state: z.enum(["semilla", "en-crecimiento", "perenne"]),
    tags: z.array(z.string().min(1)).default([]),
    relatedNotes: z.array(reference("notas")).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    language,
    translationKey,
  }),
});

const biblioteca = defineCollection({
  loader: glob({ base: "./src/content/biblioteca", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      creator: z.string().min(1),
      type: z.enum(["book", "article", "website", "tool", "video", "podcast", "other"]),
      summary: z.string().min(1),
      commentary: z.string(),
      externalUrl: z.url(),
      coverImage: image().optional(),
      tags: z.array(z.string().min(1)).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      language,
      translationKey,
    }),
});

const portafolio = defineCollection({
  loader: glob({ base: "./src/content/portafolio", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      year: z.number().int().min(1900),
      role: z.string().min(1),
      disciplines: z.array(z.string().min(1)).min(1),
      client: z.string().min(1).optional(),
      projectStatus: z.string().min(1),
      coverImage: image().optional(),
      gallery: z.array(image()).default([]),
      projectLinks: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.url(),
          }),
        )
        .default([]),
      featured: z.boolean().default(false),
      displayOrder: z.number().int().nonnegative(),
      draft: z.boolean().default(false),
      language,
      translationKey,
    })
    .superRefine((entry, context) => {
      if (!entry.draft && !entry.coverImage) {
        context.addIssue({
          code: "custom",
          message: "Los proyectos publicados requieren una imagen de portada.",
          path: ["coverImage"],
        });
      }
    }),
});

const experimentos = defineCollection({
  loader: glob({ base: "./src/content/experimentos", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    shortDescription: z.string().min(1),
    status: z.enum(["en-curso", "publicado", "pausado"]),
    startedAt: z.coerce.date(),
    releasedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date(),
    githubUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    tags: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    displayOrder: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
    language,
    translationKey,
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    draft: z.boolean().default(false),
    language,
    translationKey,
  }),
});

const homepage = defineCollection({
  loader: file("./src/content/site/homepage.json"),
  schema: z.object({
    heroTitle: z.tuple([z.string().min(1), z.string().min(1)]),
    positioning: z.string().min(1),
    connectionLabel: z.string().min(1),
    indexLabel: z.string().min(1),
    panels: z
      .array(
        z.object({
          index: z.string().regex(/^\d{2}$/),
          title: z.string().min(1),
          description: z.string().min(1),
          metadata: z.string().min(1),
          reveal: z.string().min(1),
          href: z.string().startsWith("/"),
          kind: z.enum(["yo", "notas", "biblioteca", "contacto"]),
        }),
      )
      .length(4),
  }),
});

const ahora = defineCollection({
  loader: file("./src/content/site/ahora.json"),
  schema: z.object({
    label: z.string().min(1),
    period: z.string().min(1),
    title: z.string().min(1),
    notesHeading: z.string().min(1),
    notesLinkLabel: z.string().min(1),
    libraryHeading: z.string().min(1),
    libraryLinkLabel: z.string().min(1),
    processHeading: z.string().min(1),
    processIndex: z.string().min(1),
    processTitle: z.tuple([z.string().min(1), z.string().min(1)]),
    processStatus: z.string().min(1),
    processLinkLabel: z.string().min(1),
  }),
});

export const collections = {
  notas,
  biblioteca,
  portafolio,
  experimentos,
  pages,
  homepage,
  ahora,
};
