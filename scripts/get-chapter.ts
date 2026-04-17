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
    book: 'Genesis',
    bookNumber: '01',
    chapter: 20,
    // verse: 1,
  };

  const chs = [33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 48];

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
