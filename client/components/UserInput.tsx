import { useMemo } from "react";
import Character from "@/components/Character";

type UserInputProps = {
  charTyped: string;
  check: (index: number) => boolean;
  word: string;
};

const UserInput = ({ check, charTyped, word }: UserInputProps) => {
  const characters = useMemo(() => {
    return charTyped.split("");
  }, [charTyped]);

  return (
    <div className="md:character absolute left-0 top-0 z-10 break-all text-xl lg:text-2xl">
      {characters.map((_, index) => {
        const isCorrect = check(index); 
        return (
          <Character
            key={index}
            character={word.charAt(index)}
            state={check(index)}
            isCrossedOut={isCorrect}
          />
        );
      })}
    </div>
  );
};

export default UserInput;