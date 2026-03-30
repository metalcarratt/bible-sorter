import type { RefObject } from "react";
import type { UseDragType } from "./use-drag";

type WordProps = {
  word: string,
  index: number,
  error: boolean,
  swapWords: (insertAt: number) => void,
  selectedWord: number | null,
  setSelectedWord: (s: number | null) => void,
  drag: UseDragType,
  wordRefs: RefObject<HTMLElement[]>
}

export const Word = ({word, index, error, swapWords, selectedWord, setSelectedWord, drag, wordRefs}: WordProps) => {

  const insertableWord = selectedWord !== null && index !== selectedWord;

  if (!insertableWord) {
    return (
      <span 
        className={`word ${selectedWord === index ? 'selected' : ''} ${error ? 'error' : ''}`}
        
        onPointerDown={() => drag.handlePointerDown(index)}
        // onPointerUp={() => drag.handlePointerUp()}
        onPointerMove={(e) => drag.handlePointerMove(e)}
        // onClick={() => index === selectedWord ? setSelectedWord(null) : setSelectedWord(index)}
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

  // const dragOverLeft = () => {
  //   const insertAt = index < selectedWord ? index : index - 1;
  //   console.log('click left, position', insertAt);
  //   drag.dragOverTarget(insertAt);
  // }

  // const dragOverRight = () => {
  //   const insertAt = index < selectedWord ? index + 1 : index;
  //   console.log('click right, position', insertAt);
  //   drag.dragOverTarget(insertAt);
  // }

  return (
    <span className="wdz">
      {index !== selectedWord + 1 && <span className="hit left" ref={el => {wordRefs.current[index] = el!}} data-index={index}/>}
      {index !== selectedWord - 1 && <span className="hit right" ref={el => {wordRefs.current[index] = el!}} data-index={index}/>}
      <span className="dropZone left" />
      <span
        className={`word ${error ? 'error' : ''}`}
        
      >{word}</span>
      <span className="dropZone right"  />
    </span>
  );
}