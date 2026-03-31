import type { VerseDetail } from '../flat-bible';
import type { Verse } from '../get-verse';

export const getAsvVerse = async (verseDetail: VerseDetail): Promise<Verse> => {
  // const data = await fetchVerse("John 3:16");
  // console.log(data.verses[0].text);

  const ref = `${verseDetail.book} ${verseDetail.chapter}:${verseDetail.verse}`;

  const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=asv`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const text = data.verses[0].text;

  return {
    ref: `${verseDetail.book} ${verseDetail.chapter}:${verseDetail.verse}`,
    words: text ?? '',
  };
};
