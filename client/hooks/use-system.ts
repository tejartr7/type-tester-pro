// hooks/useSystem.ts
import { useCallback, useState, useEffect } from "react";
import { useCounter } from "@/hooks/use-counter";
import { useKeyDown } from "@/hooks/use-keydown";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useModal } from "@/hooks/useModal";
import { useWord } from "@/hooks/use-word";
import { calWPM, calAccuracy, calErrorPercentage } from "@/utils/index";
import type { Results, HistoryType } from "@/types/types";

export const useSystem = () => {
  const [results, setResults] = useState<Results>({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    error: 0,
  });

  const [history, setHistory] = useState<HistoryType>({
    wordHistory: "",
    typedHistory: "",
  });

  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();
  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [time, setTime] = useState(() => getLocalStorageValue("time") || 30000);
  const { counter, resetCounter, startCounter } = useCounter(time);
  const { word, updateWord, totalWord } = useWord(50);
  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);
  const { modalIsOpen, aboutModal, openModal, closeModal } = useModal();

  const restartTest = useCallback(() => {
    resetCounter();
    updateWord(true);
    resetCursorPointer();
    resetCharTyped();
    setTypingState("idle");
    setTotalCharacterTyped("");
  }, [
    resetCounter,
    updateWord,
    resetCursorPointer,
    resetCharTyped,
    setTypingState,
    setTotalCharacterTyped,
  ]);

  const checkCharacter = useCallback(
    (index: number) => {
      if (charTyped[index] === word[index]) {
        return true;
      } else {
        return false;
      }
    },
    [charTyped, word]
  );

  useEffect(() => {
    console.log("history is ", history);
  }, [history]);

  if (word.length === charTyped.length) {
    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }

  if (typingState === "start") {
    startCounter();
    setTypingState("typing");
  }

  if (Number(counter) === Number(0)) {
    console.log("totalWord", totalWord);
    console.log("totalCharacterTyped", totalCharacterTyped);
    console.log("word is ", word);
    const { accuracy } = calAccuracy(word, totalCharacterTyped);
    const { wpm, cpm } = calWPM(totalCharacterTyped, accuracy, time, word);
    const error = calErrorPercentage(accuracy);

    setResults({
      accuracy,
      wpm,
      cpm,
      error,
    });

    setHistory({
      wordHistory: totalWord,
      typedHistory: totalCharacterTyped,
    });

    openModal("result");
    restartTest();
  }

  return {
    charTyped,
    counter,
    cursorPosition,
    modalIsOpen,
    aboutModal,
    results,
    time,
    history,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    setTime,
    resetCounter,
    setLocalStorageValue,
    updateWord,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
  };
};
