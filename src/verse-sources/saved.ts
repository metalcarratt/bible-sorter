import type { VerseDetail } from '../flat-bible';

export const getSavedVerse = async (verseDetail: VerseDetail) => {
  console.log('get saved verse');
  const verses = await loadSavedChapter(verseDetail);
  const words = verses?.[verseDetail.verse - 1];
  console.log('words', words);
  return {
    ref: `${verseDetail.book} ${verseDetail.chapter}:${verseDetail.verse}`,
    words,
  };
};

// type ChapterModule = {
//   verses: string[];
// };

// const chapterModules = import.meta.glob<ChapterModule>('../../data/rcv/*/*.ts');

async function loadSavedChapter(verseDetail: VerseDetail) {
  const key = `${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}`;
  console.log('key', key);
  const chapter = localStorage.getItem(key);
  if (chapter) {
    const psch = JSON.parse(chapter) as string[];
    console.log('psch', psch);
    return psch;
  }
  // const path = `../../data/rcv/${verseDetail.bookNumber}_${verseDetail.book}/${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.ts`;
  // console.log('path', path);
  // const importer = chapterModules[path];
  // console.log('1');
  // if (!importer) {
  //   console.log('chapter file not found');
  //   throw new Error(`Chapter file not found: ${path}`);
  // }
  // console.log('2');
  // const mod = await importer();
  // console.log('3');
  // return mod.verses;
}
