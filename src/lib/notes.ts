import { getCollection, type CollectionEntry } from "astro:content"

export const NOTE_MATURITY = {
  semilla: {
    label: "Semilla",
    notice:
      "Esta nota es una semilla. Es un apunte inicial que todavía puede cambiar de forma.",
  },
  "en-crecimiento": {
    label: "En crecimiento",
    notice:
      "Esta nota está en crecimiento. Puede cambiar a medida que aparecen nuevas conexiones.",
  },
  perenne: {
    label: "Perenne",
    notice:
      "Esta nota es perenne. Su estructura es estable, aunque puede seguir recibiendo ajustes y conexiones.",
  },
} as const

export function compareNotesByRecent(
  first: CollectionEntry<"notas">,
  second: CollectionEntry<"notas">,
) {
  const dateDifference =
    second.data.updatedAt.getTime() - first.data.updatedAt.getTime()
  return (
    dateDifference ||
    first.data.archiveNumber.localeCompare(second.data.archiveNumber, "es")
  )
}

export function isEditorialNote(entry: CollectionEntry<"notas">) {
  return !entry.data.fixture
}

export function isTechnicalNoteFixture(entry: CollectionEntry<"notas">) {
  return entry.data.fixture
}

export async function getVisibleSpanishNotes(includeDrafts: boolean) {
  return (await getCollection("notas"))
    .filter(
      (entry) =>
        isEditorialNote(entry) &&
        (includeDrafts || !entry.data.draft) &&
        entry.data.language === "es",
    )
    .sort(compareNotesByRecent)
}

export async function getDevelopmentSpanishNoteFixtures() {
  return (await getCollection("notas"))
    .filter(
      (entry) =>
        isTechnicalNoteFixture(entry) &&
        entry.data.draft &&
        entry.data.language === "es",
    )
    .sort(compareNotesByRecent)
}

export function formatNoteDate(date: Date) {
  return date.toISOString().slice(0, 10).split("-").reverse().join(".")
}

export function hasEditorialNoteBody(entry: CollectionEntry<"notas">) {
  const body = entry.body?.trim()
  if (!body) return false
  if (!entry.filePath?.endsWith(".mdx")) return true

  const contentWithoutAuthoringImports = body
    .replace(/^\s*import\s+.+?\s+from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*import\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*export\s+.+$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .trim()

  return contentWithoutAuthoringImports.length > 0
}
