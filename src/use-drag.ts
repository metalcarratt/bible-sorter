import { useEffect, useState, type RefObject } from 'react';

export const useDrag = (
  selectedWord: number | null,
  setSelectedWord: (n: number | null) => void,
  swapWords: (i: number) => void,
  wordRefs: RefObject<HTMLElement[]>,
) => {
  const [dragging, setDragging] = useState(false);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const handlePointerDown = (index: number) => {
    console.log('pointer down on', index);
    setSelectedWord(index);
    setDragging(true);
  };

  const handlePointerUp = () => {
    console.log('pointer release on', dropTarget, selectedWord);
    if (dropTarget !== null && selectedWord !== null) {
      // console.log('about to swap words');
      swapWords(dropTarget);
    }

    setDragging(false);
    setDropTarget(null);
    setSelectedWord(null);
  };

  const dragOverTarget = (index: number) => {
    // console.log('drag over ', index);
    if (dragging) {
      setDropTarget(index);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!dragging) return;
    const native = e.nativeEvent;
    const x = native.clientX;
    const y = native.clientY;
    console.log('move', x, y);
    for (const wordEl of wordRefs.current) {
      // console.log('wordEl', wordEl);
      if (!wordEl) continue;
      const rect = wordEl.getBoundingClientRect();
      // if (x >= rect.left)
      //   console.log(
      //     'rect',
      //     wordEl.dataset.index,
      //     rect.left,
      //     rect.right,
      //     rect.top,
      //     rect.bottom,
      //   );
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        const targetIndex = Number(wordEl.dataset.index);
        console.log('targetIndex', targetIndex);
        updateDropTarget(targetIndex, x - rect.left, rect.width);
        break;
      }
    }
  };

  const updateDropTarget = (
    targetIndex: number,
    offsetX: number,
    width: number,
  ) => {
    if (selectedWord === null) return;

    const isLeft = offsetX < width / 2;
    const insertAt = isLeft
      ? targetIndex < selectedWord
        ? targetIndex
        : targetIndex - 1
      : targetIndex < selectedWord
        ? targetIndex + 1
        : targetIndex;

    setDropTarget(insertAt);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleUp = () => handlePointerUp();
    window.addEventListener('pointerup', handleUp);

    return () => window.removeEventListener('pointerup', handleUp);
  }, [dragging]);

  return {
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    dragOverTarget,
  };
};

export type UseDragType = ReturnType<typeof useDrag>;
