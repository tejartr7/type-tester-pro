import { useMemo, useEffect, useState, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (Number(timeLeft) === Number(1000)) {
      
    } else if (Number(timeLeft) > Number(1000)) {
    }
  }, [timeLeft]);

  useEffect(() => {
    // Focus the input field when the component mounts or when timeLeft changes
    if (inputRef.current && Number(timeLeft) !== 1000) {
      inputRef.current.focus();
    }
  }, [timeLeft]);

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
      {/* Render the input field */}
      <input
        ref={inputRef}
        type="text"
        className="block w-full"
        onKeyDown={handleKeyDown}
        autoFocus
        disabled={Number(timeLeft) === Number(1000)}
      />
    </div>
  );
};

export default UserInput;
