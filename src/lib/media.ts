import { getCollection, type CollectionEntry } from "astro:content"

export function compareMediaByRecent(
  first: CollectionEntry<"mediateca">,
  second: CollectionEntry<"mediateca">,
) {
  return (
    second.data.updatedAt.getTime() - first.data.updatedAt.getTime() ||
    first.data.archiveNumber.localeCompare(second.data.archiveNumber, "es")
  )
}

export function isEditorialMedia(entry: CollectionEntry<"mediateca">) {
  return !entry.data.fixture
}

export function isTechnicalMediaFixture(entry: CollectionEntry<"mediateca">) {
  return entry.data.fixture
}

export async function getVisibleSpanishMedia(includeDrafts: boolean) {
  return (await getCollection("mediateca"))
    .filter(
      (entry) =>
        isEditorialMedia(entry) &&
        (includeDrafts || !entry.data.draft) &&
        entry.data.language === "es",
    )
    .sort(compareMediaByRecent)
}

export async function getDevelopmentSpanishMediaFixtures() {
  return (await getCollection("mediateca"))
    .filter(
      (entry) =>
        isTechnicalMediaFixture(entry) &&
        entry.data.draft &&
        entry.data.language === "es",
    )
    .sort(compareMediaByRecent)
}
