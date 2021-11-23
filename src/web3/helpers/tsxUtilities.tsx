export function stylizeHaikuOption(haiku: string): JSX.Element | JSX.Element[] {
    const tsx: JSX.Element | JSX.Element[] = [];
    const haikuSplit = haiku.split('\n');
    haikuSplit.forEach(line => {
      const haikuLine = (<p className='haikuOption'>{line}</p>);
      tsx.push(haikuLine);
    });
    return (tsx);
  }