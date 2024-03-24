"use client";
import { useState, useEffect, useCallback } from "react";
import { useCursorPosition } from "@/hooks/use-cursorpointer";
import { isAllowedCode } from "@/utils/index";

type TypingState = "idle" | "start" | "typing";

export const useKeyDown = (active: boolean) => {
  const [typingState, setTypingState] = useState<TypingState>("idle");
  const [charTyped, setCharTyped] = useState<string>("");
  const [totalCharacterTyped, setTotalCharacterTyped] = useState<string>("");

  const { cursorPosition, updateCursorPosition, resetCursorPointer } =
    useCursorPosition();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!active || !isAllowedCode(event.code)) return;

      if (event.key === " ") {
        // Prevent default action of Spacebar key
        event.preventDefault();
        updateCursorPosition("increase");
      }

      if (event.key === "Backspace") {
        // Prevent default action of Backspace key
        event.preventDefault();

        if (charTyped.length > 0 && cursorPosition > 0) {
          setCharTyped((prev) => prev.slice(0, charTyped.length - 1));
          setTotalCharacterTyped((prev) =>
            prev.slice(0, totalCharacterTyped.length - 1)
          );
          updateCursorPosition("decrease");
        }
        return;
      }

      if (typingState !== "typing" && event.key === " ") {
        // Prevent default action of Spacebar key
        event.preventDefault();
        return;
      }

      if (typingState === "idle") {
        setTypingState("start");
      }

      setCharTyped((prev) => prev + event.key);
      setTotalCharacterTyped((prev) => prev + event.key);

      // Move the cursor position by 1 when a character is typed
      updateCursorPosition("increase");
    },
    [
      active,
      charTyped,
      cursorPosition,
      updateCursorPosition,
      typingState,
      totalCharacterTyped,
    ]
  );

  const resetCharTyped = useCallback(() => {
    setCharTyped("");
  }, [setCharTyped]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return {
    charTyped,
    totalCharacterTyped,
    setTotalCharacterTyped,
    cursorPosition,
    resetCharTyped,
    resetCursorPointer,
    typingState,
    setTypingState,
  };
};
