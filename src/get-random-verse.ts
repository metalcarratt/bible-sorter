import { flatBible } from './flat-bible';

export const getRandomVerse = (version: string) => {
  if (version === 'Saved') {
    return flatBible[Math.floor(Math.random() * 267)];
  }

  return flatBible[Math.floor(Math.random() * flatBible.length)];
};
