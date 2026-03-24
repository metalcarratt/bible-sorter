export const initWords = (words: string) => {
  return shuffle(words.split(' '));
};

const shuffle = (list: string[]): string[] => {
  const arr = [...list]; // copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
