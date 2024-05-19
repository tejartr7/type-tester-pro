import { useMemo, useEffect, useState } from "react";
import Character from "@/components/Character";
import { useSystem } from "@/hooks/use-system";

type UserInputProps = {
  charTyped: string;
  check: (index: number) => boolean;
  word: string;
};

const UserInput = ({ check, charTyped, word }: UserInputProps) => {
  const { time } = useSystem();
  const [timeLeft, setTimeLeft] = useState<number>(time);

  const characters = useMemo(() => {
    return charTyped.split("");
  }, [charTyped]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (timeLeft === 0) {
      event.preventDefault();
      return;
    }
  };

  return (
    <div className="md:character absolute left-0 top-0 z-10 break-all text-xl lg:text-2xl">
      {characters.map((char, index) => {
        const isCorrect = check(index);
        return (
          <Character
            key={index}
            character={word.charAt(index)}
            state={charTyped.charAt(index) ? isCorrect : undefined} // Pass undefined if the character hasn't been typed yet
            isCrossedOut={!isCorrect}
          />
        );
      })}
      <input
        type="text"
        className="hidden"
        onKeyDown={handleKeyDown}
        autoFocus
        disabled={Number(timeLeft) === Number(1000)}
      />
    </div>
  );
};

export default UserInput;
