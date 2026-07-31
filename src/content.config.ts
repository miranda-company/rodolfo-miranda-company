import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const language = z.enum(["es", "en"]).default("es");
const translationKey = z.string().min(1).optional();
const internalUrl = z.string().startsWith("/");
const linkedSegment = z.object({
  text: z.string().min(1),
  href: internalUrl.optional(),
});
const linkedParagraph = z.array(linkedSegment).min(1);

const notas = defineCollection({
  loader: glob({ base: "./src/content/notas", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    state: z.enum(["semilla", "en-crecimiento", "perenne"]),
    archiveNumber: z.string().regex(/^N\.\d{3}$/),
    cardFormat: z.enum(["compact", "standard", "visual", "featured"]),
    tags: z.array(z.string().min(1)).default([]),
    relatedNotes: z.array(reference("notas")).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    language,
    translationKey,
  }),
});

const mediateca = defineCollection({
  loader: glob({ base: "./src/content/mediateca", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      creator: z.string().min(1),
      format: z.enum(["book", "article", "website", "tool", "video", "podcast", "other"]),
      engagementMode: z.enum(["read", "watch", "listen"]),
      summary: z.string().min(1),
      commentary: z.string().min(1),
      whyHere: z.string().min(1),
      recurringIdeas: z.array(z.string().min(1)).default([]),
      publicationYear: z.number().int().min(1400).max(2100).optional(),
      status: z.enum(["en-curso", "consultado", "de-referencia", "por-explorar"]),
      archiveNumber: z.string().regex(/^M\.\d{3}$/),
      updatedAt: z.coerce.date(),
      externalUrl: z.url().optional(),
      coverImage: image().optional(),
      tags: z.array(z.string().min(1)).default([]),
      relatedNotes: z.array(reference("notas")).default([]),
      relatedMedia: z.array(reference("mediateca")).default([]),
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

const timelineEntry = z
  .object({
    role: z.string().min(1),
    organization: z.string().min(1),
    period: z.string().min(1),
    description: z.string().min(1),
    organizationUrl: z.url().optional(),
    caseStudyLabel: z.string().min(1).optional(),
    caseStudyUrl: internalUrl.optional(),
    current: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  })
  .superRefine((entry, context) => {
    if (entry.caseStudyUrl && !entry.caseStudyLabel) {
      context.addIssue({
        code: "custom",
        message: "Un enlace de caso requiere una etiqueta visible.",
        path: ["caseStudyLabel"],
      });
    }

    if (entry.placeholder && (entry.organizationUrl || entry.caseStudyUrl)) {
      context.addIssue({
        code: "custom",
        message: "Las etapas provisionales no pueden publicar enlaces.",
      });
    }
  });

const profile = defineCollection({
  loader: file("./src/content/site/yo.json"),
  schema: z
    .object({
      hero: z.object({
        label: z.string().min(1),
        name: z.string().min(1),
        positioning: z.string().min(1),
        profileMeta: z.string().min(1),
        disciplines: z.string().min(1),
      }),
      portrait: z.object({
        alt: z.string().min(1),
        annotation: z.string().min(1),
        replacementNote: z.string().min(1),
      }),
      context: z.object({
        index: z.string().min(1),
        title: z.string().min(1),
        paragraphs: z.array(linkedParagraph).min(1),
      }),
      currentContext: z.object({
        index: z.string().min(1),
        title: z.string().min(1),
        paragraphs: z.array(linkedParagraph).min(1),
      }),
      timeline: z.object({
        index: z.string().min(1),
        title: z.string().min(1),
        entries: z.array(timelineEntry).length(5),
      }),
      history: z.object({
        index: z.string().min(1),
        title: z.string().min(1),
        paragraphs: z.array(linkedParagraph).min(1),
        pendingParagraph: z.string().min(1),
        pendingLabel: z.string().min(1),
      }),
      closing: z.object({
        index: z.string().min(1),
        label: z.string().min(1),
        links: z
          .array(
            z.object({
              label: z.string().min(1),
              href: internalUrl,
            }),
          )
          .length(3),
      }),
      language,
    })
    .superRefine((entry, context) => {
      if (entry.timeline.entries.filter((timelineItem) => timelineItem.current).length !== 1) {
        context.addIssue({
          code: "custom",
          message: "La trayectoria requiere exactamente una etapa actual.",
          path: ["timeline", "entries"],
        });
      }

      if (entry.timeline.entries.filter((timelineItem) => timelineItem.placeholder).length !== 4) {
        context.addIssue({
          code: "custom",
          message: "La trayectoria requiere cuatro etapas provisionales.",
          path: ["timeline", "entries"],
        });
      }
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
          kind: z.enum(["yo", "notas", "mediateca", "contacto"]),
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
    mediatecaHeading: z.string().min(1),
    mediatecaLinkLabel: z.string().min(1),
    processHeading: z.string().min(1),
    processIndex: z.string().min(1),
    processTitle: z.tuple([z.string().min(1), z.string().min(1)]),
    processStatus: z.string().min(1),
    processLinkLabel: z.string().min(1),
  }),
});

export const collections = {
  notas,
  mediateca,
  portafolio,
  experimentos,
  pages,
  profile,
  homepage,
  ahora,
};
