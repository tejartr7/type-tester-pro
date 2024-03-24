import { useMemo } from "react";
import Character from "@/components/Character";

type WordContainerProps = {
  word: string;
};

const WordContainer = ({ word }: WordContainerProps) => {
  const characters = useMemo(() => {
    return word.split("");
  }, [word]);

  return (
    <div className="flex justify-center">
      <div className="relative left-0 top-0 break-all text-xl opacity-50 lg:text-2xl">
        {characters.map((character, index) => {
          return (
            <Character
              key={index + character}
              character={character}
              isCrossedOut={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WordContainer;
