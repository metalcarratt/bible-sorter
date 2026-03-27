import { useState } from "react";

export const Hint = ({words}: {words: string[]}) => {
  const [show, setShow] = useState<number>(0);
  
  const showHint = (e: React.MouseEvent<HTMLAnchorElement>, hint: number) => {
    setShow(hint);
    e.preventDefault();

    setTimeout(() => setShow(0), 5000);
  }

  if (!show) {
    return <span className="bg">
      Hints:{' '}
      {words.length > 5 && <><a href="#" onClick={(e) => showHint(e, 1)}>Five words</a>{' | '}</>}
      {words.length > 15 && <><a href="#" onClick={(e) => showHint(e, 2)}>Ten words</a>{' | '}</>}
      {words.length > 20 && <><a href="#" onClick={(e) => showHint(e, 3)}>Fifteen words</a>{' | '}</>}
      <a href="#" onClick={(e) => showHint(e, 4)}>All</a>
    </span>;
  }

  const hint = show === 1 ? words.slice(0, 5).join(' ') + '...'
    : show === 2 ? words.slice(0, 10).join(' ') + '...'
    : show === 3 ? words.slice(0, 15).join(' ') + '...'
    : words.join(' ');

  return (<span className="bg">{hint} <a href="#" onClick={(e) => showHint(e, 0)}>Hide</a></span>);
}