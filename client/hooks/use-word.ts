"use client";
import { useState, useCallback, useEffect } from "react";
import { generateWord } from "@/utils/index";
export const useWord = (numberOfWords: number) => {
  const [word, setWord] = useState<string>(
    () => generateWord(numberOfWords) + " "
  );
  const [totalWord, setTotalWord] = useState<string>(word);

  useEffect(() => {
    setWord(generateWord(numberOfWords) + " ");
  }, [numberOfWords]);

  const appendWord = useCallback((word: string) => {
    setTotalWord((prev) => prev + word);
  }, []);

  const eraseWord = useCallback((word: string) => {
    setTotalWord(word);
  }, []);

  const updateWord = useCallback(
    (erase = false) => {
      setWord(() => {
        const genWord = generateWord(numberOfWords) + " ";
        if (erase) eraseWord(genWord);
        else appendWord(genWord);
        return genWord;
      });
    },
    [numberOfWords, appendWord, eraseWord]
  );

  return { word, totalWord, setTotalWord, updateWord, appendWord };
};
