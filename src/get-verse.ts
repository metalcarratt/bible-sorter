import type { VerseDetail } from './flat-bible';
import { getAsvVerse } from './verse-sources/asv';
import { getRvcVerse } from './verse-sources/rcv';

export type Verse = {
  ref: string;
  words: string;
};

export const getVerse = async (
  verseDetail: VerseDetail,
  version: string,
  updateLog: (log: string) => void,
): Promise<Verse> => {
  if (version === 'RCV') {
    return await getRvcVerse(verseDetail, updateLog);
  } else if (version === 'ASV') {
    return await getAsvVerse(verseDetail, updateLog);
  } else {
    return j13_1;
  }
};

const j13_1 = {
  ref: 'John 13:1',
  words:
    'Now before the Feast of the Passover, Jesus knowing that His hour had come for Him to depart out of this world unto the Father, having loved His own who were in the world, He loved them to the uttermost.',
};

// const j13_6 = {
//   ref: 'John 13:6',
//   words:
//     'He came then to Simon Peter. Peter said to Him, Lord, do You wash my feet?',
// };
