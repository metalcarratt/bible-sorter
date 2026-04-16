import { useEffect, useState } from 'react';
import './App.scss'
import { Word } from './word';
import { initWords } from './init-words';
import { getVerse } from './get-verse';
import { getRandomVerse } from './get-random-verse';
import { Hint } from './hint';
import type { VerseDetail } from './flat-bible';
import { getRandomBackground } from './backgrounds';
import { MenuModal } from './menu-modal';
import { ApiLogModal } from './api-log-modal';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [errors, setErrors] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [originalWords, setOriginalWords] = useState<string[]>([]);
  const [verseRef, setVerseRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState('');
  const [version, setVersion] = useState<string>('RCV');
  const [showMenu, setShowMenu] = useState(false);
  const [apiLog, setApiLog] = useState<string[]>([]);
  const [controlMode, setControlMode] = useState<string>('left');
 
  const updateLog = (log: string) => {
    setApiLog([...apiLog, log]);
  }

  const getNewWord = async (randomVerse: VerseDetail) => {
    try {
    const verse = await getVerse(randomVerse, version, updateLog);
    const originalWords = verse.words.split(' ');
    setWords(initWords(verse.words));
    setOriginalWords(originalWords);
    setVerseRef(verse.ref);
    setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const newWord = () => {
    const randomVerse = getRandomVerse();
    console.log('random verse', randomVerse);
    const verseRef = `${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse}`
    setVerseRef(verseRef);
    setLoading(true);
    setSuccess(false);
    setErrors([]);
    setWords([]);
    setSelectedWord(null);
    setOriginalWords([]);
    setBackground(getRandomBackground());
    setApiLog(['Fetching verse '+ verseRef + ' from ' + version]);
    
    getNewWord(randomVerse);
  }

  useEffect(() => {
    // newWord();
  }, []);

  const swapWords = (index: number) => {
    if (selectedWord === null) {
      return;
    }
    let insertAt;
    if (controlMode === 'left') {
      insertAt = index < selectedWord ? index : index - 1;
    } else if (controlMode === 'right') {
      insertAt = index < selectedWord ? index + 1 : index;
    } else {
      return actualSwap(index, selectedWord);
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

  const actualSwap = (index1: number, index2: number) => {
    const _words = [...words];
    [_words[index1], _words[index2]] = [_words[index2], _words[index1]];
    setWords(_words);
    setSelectedWord(null);
    setErrors([]);

    checkWords(_words);
  }

  const checkWords = (words: string[]) => {
    // console.log('originalWords on check', originalWords);
    const _errors: number[] = [];
    words.forEach((word, index) => {
      if (word !== originalWords[index]) {
        // console.log(`word ${word} does not match ${originalWords[index]} at index ${index}`);
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
    <section id="center" className="background" style={{ backgroundImage: `url(/bible-sorter/${background})` }}>
      {success && <h4 className="bg">Correct!</h4>}
      {loading && <p className="bg">Loading...</p>}
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
      <div className="reference bg">
        {printVerseRef}
        <span
          className={`control-icon start ${controlMode === 'right' ? 'selected' : ''}`}
          onClick={() => setControlMode('left')}
        >
          ▷
        </span>
        <span
          className={`control-icon ${controlMode === 'left' ? 'selected' : ''}`}
          onClick={() => setControlMode('right')}
        >
          ◁
        </span>
        <span
          className={`control-icon end ${controlMode === 'swap' ? 'selected' : ''}`}
          onClick={() => setControlMode('swap')}
        >
          ⇄
        </span>
      </div>
      <Hint words={originalWords} />
      <button className="bg" onClick={newWord}>New word</button>
      <button className="menu" onClick={() => setShowMenu(true)}>☰</button>
      
      {showMenu && <MenuModal version={version} setVersion={setVersion} close={() => setShowMenu(false)} apiLog={apiLog} />}
      {loading && <ApiLogModal apiLog={apiLog} />}
    </section> 
  )
}

export default App



