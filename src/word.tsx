type WordProps = {
  word: string,
  index: number,
  error: boolean,
  swapWords: (insertAt: number) => void,
  selectedWord: number | null,
  setSelectedWord: (s: number | null) => void
}

export const Word = ({word, index, error, swapWords, selectedWord, setSelectedWord}: WordProps) => {

  const insertableWord = selectedWord !== null && index !== selectedWord;

  if (!insertableWord) {
    return (
      <span 
        className={`word ${selectedWord === index ? 'selected' : ''} ${error ? 'error' : ''}`}
        onClick={() => index === selectedWord ? setSelectedWord(null) : setSelectedWord(index)}
      >
        {word}
      </span>
    );
  }
  
  // const clickLeft = () => {
  //   const insertAt = index < selectedWord ? index : index - 1;
  //   console.log('click left, position', insertAt);
  //   swapWords(insertAt);
  // }
  // const clickRight = () => {
  //   const insertAt = index < selectedWord ? index + 1 : index;
  //   console.log('click right, position', insertAt);
  //   swapWords(insertAt);
  // }

  return (
    <span className="wdz">
      {/* {index !== selectedWord + 1 && <span className="hit left" onClick={clickLeft}/>}
      {index !== selectedWord - 1 && <span className="hit right" onClick={clickRight}/>} */}
      {/* <span className="dropZone left" /> */}
      <span className={`word ${error ? 'error' : ''}`} onClick={() => swapWords(index)}>{word}</span>
      {/* <span className="dropZone right"  /> */}
    </span>
  );
}