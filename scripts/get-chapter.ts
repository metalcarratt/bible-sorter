import { writeFileSync } from 'fs';
import { parseHTML } from 'linkedom';

function nodeToHtml(node: ChildNode): string {
  return node.textContent ?? '';
}

const extractAllVerses = (htmlString: string) => {
  const { document } = parseHTML(htmlString);

  const versesSection = document.querySelector('section#verses');
  if (!versesSection) return [];

  return Array.from(versesSection.children).map((p) => {
    const children = Array.from(p.childNodes);
    const [, ...rest] = children;
    return rest.map(nodeToHtml).join('');
  });
};

const fetchChapter = async () => {
  const verseDetail = {
    book: 'Exodus',
    bookNumber: '02',
    chapter: 20,
    // verse: 1,
  };

  const chs = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  for (const ch of chs) {
    verseDetail.chapter = ch;

    const url = `https://text.recoveryversion.bible/${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.htm`;
    console.log('calling url', url);
    const resp = await fetch(url);
    const text = await resp.text();
    const verses = extractAllVerses(text);
    console.log('writing file');
    writeFileSync(
      `${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.json`,
      `${JSON.stringify(verses)}`,
      'utf8',
    );
  }
};
fetchChapter();
