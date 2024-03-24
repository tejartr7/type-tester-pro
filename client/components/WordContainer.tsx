import { useMemo } from 'react';
import Character from '@/components/Character';

type WordContainerProps = {
  word: string;
};

const WordContainer = ({ word }: WordContainerProps) => {
  const characters = useMemo(() => {
    return word.split('');
  }, [word]);

  return (
    <div className='relative left-0 top-0 break-all text-xl opacity-80 lg:text-2xl'>
      {characters.map((character, index) => {
        return <Character key={index + character} character={character} isCrossedOut={false} />;
      })}
    </div>
  );
};

export default WordContainer;
