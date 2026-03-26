import { useEffect, useState } from 'react';
import './App.scss'
import { Word } from './word';
import { initWords } from './init-words';
import { getVerse } from './get-verse';
import { getRandomVerse } from './get-random-verse';
import { Hint } from './hint';
import type { VerseDetail } from './flat-bible';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [errors, setErrors] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [originalWords, setOriginalWords] = useState<string[]>([]);
  const [verseRef, setVerseRef] = useState('');
  const [loading, setLoading] = useState(false);

  const getNewWord = async (randomVerse: VerseDetail) => {
    const verse = await getVerse(randomVerse);
      const originalWords = verse.words.split(' ');
      setWords(initWords(verse.words));
      setOriginalWords(originalWords);
      setVerseRef(verse.ref);
      setLoading(false);
  }

  const newWord = () => {
    const randomVerse = getRandomVerse();
    console.log('random verse', randomVerse);
    setVerseRef(`${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse}`);
    setLoading(true);
    setSuccess(false);
    setErrors([]);
    
    getNewWord(randomVerse);
  }

  useEffect(() => {
    newWord();
  }, []);

  const swapWords = (insertAt: number) => {
    if (!selectedWord) {
      return;
    }
    const _words = [...words];
    const word = _words[selectedWord];
    _words.splice(selectedWord, 1);
    _words.splice(insertAt, 0, word);
    setWords(_words);
    setSelectedWord(null);
    setErrors([]);

    checkWords(_words);
  }

  const checkWords = (words: string[]) => {
    console.log('originalWords on check', originalWords);
    const _errors: number[] = [];
    words.forEach((word, index) => {
      if (word !== originalWords[index]) {
        console.log(`word ${word} does not match ${originalWords[index]} at index ${index}`);
        _errors.push(index);
      }
    });
    console.log('all errors', _errors);
    setErrors(_errors);

    if (_errors.length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  const printVerseRef = /^\d/.test(verseRef)
    ? verseRef[0] + ' ' + verseRef.slice(1)
    : verseRef;

  return (
    <section id="center">
      {success && <h4>Correct!</h4>}
      {loading && <p>Loading...</p>}
      <div className="verseContainer">
        {words.map((w, i) =>
          <Word 
            word={w} 
            index={i}
            error={errors.includes(i)}
            swapWords={swapWords} 
            selectedWord={selectedWord} 
            setSelectedWord={setSelectedWord}
          />
        )}
      </div>
      <div className="reference">{printVerseRef}</div>
      <Hint words={originalWords} />
      {success && <button onClick={newWord}>New word</button>}
    </section> 
  )
}

export default App

