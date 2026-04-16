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
    chapter: 10,
    verse: 1,
  };

  const url = `https://text.recoveryversion.bible/${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.htm`;
  const resp = await fetch(url);
  const text = await resp.text();
  const verses = extractAllVerses(text);
  writeFileSync(
    `${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.ts`,
    `export const verses = ${JSON.stringify(verses)}`,
    'utf8',
  );
};
fetchChapter();
