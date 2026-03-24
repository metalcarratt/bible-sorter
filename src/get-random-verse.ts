import { bibleVerseCounts } from './bible-verse-counts';

const bibleChapters = bibleVerseCounts;

type BibleChapters = Record<string, number[]>;

export type VerseDetail = {
  book: string;
  bookNumber: string;
  chapter: number;
  verse: number;
};

function buildFlatBibleArray(bibleChapters: BibleChapters) {
  const flat: VerseDetail[] = [];

  // for (const [bookIndex, [book, chapters] of Object.entries(bibleChapters).entries()) {
  for (const [bookIndex, [book, chapters]] of Object.entries(
    bibleChapters,
  ).entries()) {
    // const chapters = bibleChapters[book];

    chapters.forEach((verseCount, chapterIndex) => {
      for (let v = 1; v <= verseCount; v++) {
        flat.push({
          book,
          bookNumber: String(bookIndex + 1).padStart(2, '0'),
          chapter: chapterIndex + 1,
          verse: v,
        });
      }
    });
  }

  return flat;
}

const flatBible = buildFlatBibleArray(bibleChapters);

export const getRandomVerse = () =>
  flatBible[Math.floor(Math.random() * flatBible.length)];
