import type { VerseDetail } from './flat-bible';

export type Verse = {
  ref: string;
  words: string;
};

export const getVerse = async (verseDetail: VerseDetail): Promise<Verse> => {
  return j13_1;

  // const url = `https://text.recoveryversion.bible/${verseDetail.bookNumber}_${verseDetail.book}_${verseDetail.chapter}.htm`;
  // // console.log('constructed url', url);
  // let resp;
  // try {
  //   resp = await fetch(
  //     `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  //   );
  // } catch (e) {
  //   resp = await fetch(
  //     `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  //   );
  // }
  // // const resp = await fetch(`http://localhost:4000/proxy?url=${url}`);
  // const text = await resp.text();
  // // console.log('html', text);
  // const verseWords = findVerseInHtml(text, verseDetail);
  // // console.log('verseWords', verseWords);

  // return {
  //   ref: `${verseDetail.book} ${verseDetail.chapter}:${verseDetail.verse}`,
  //   words: verseWords ?? '',
  // };

  // return j13_6;
};

const findVerseInHtml = (htmlString: string, verseDetail: VerseDetail) => {
  // parse html
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // find verses section
  const versesSection = doc.querySelector('section#verses');
  if (!versesSection) return;

  // find p tag
  const p = versesSection.children[verseDetail.verse - 1];
  // const searchID = `p#${verseDetail.book.slice(0, 3)}${verseDetail.chapter}-${verseDetail.verse}`;
  // console.log('search id', searchID);
  // const p = versesSection.querySelector(searchID);
  // if (!p) return;

  // get the contents
  const children = Array.from(p.childNodes);
  const [, ...rest] = children; // remove the first <b> tag
  const resultHtml = rest.map(nodeToHtml).join(''); // convert remaining nodes back to HTML/text

  return resultHtml;
};

function nodeToHtml(node: ChildNode): string {
  return node.textContent ?? '';
}

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
