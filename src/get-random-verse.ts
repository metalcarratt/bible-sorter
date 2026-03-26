import { flatBible } from './flat-bible';

export const getRandomVerse = () =>
  flatBible[Math.floor(Math.random() * flatBible.length)];
