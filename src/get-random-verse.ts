import { flatBible } from './flat-bible';

export const getRandomVerse = (version: string) => {
  if (version === 'Saved') {
    return flatBible[Math.floor(Math.random() * 1474)];
  }

  return flatBible[Math.floor(Math.random() * flatBible.length)];
};
