import { faker } from '@faker-js/faker';

import { AccuracyMetrics } from '@/types/types';

export const isAllowedCode = (code: string): boolean => {
  return (
    code.startsWith('Key') ||
    code === 'Backspace' ||
    code === 'Space' ||
    code === 'Minus'
  );
};

export const generateWord = (n: number): string => {
  return faker.word.words(n);
};

export const calAccuracy = (expectedWord: string, typedWord: string) => {
  let correctChars = 0;
  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] === expectedWord[i]) {
      correctChars++;
    }
  }
  

  const accuracyMetrics: AccuracyMetrics = {
    correctChars,
    incorrectChars: typedWord.length - correctChars,
    accuracy: (correctChars / typedWord.length) * 100,
  };
  return accuracyMetrics;
};

export const calWPM = (
  typedWord: string,
  accuracy: number,
  time: number,
  expectedWord: string,
) => {
  let correctChars = 0;
  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] === expectedWord[i]) {
      correctChars++;
    }
  }
  const minutes = time / 60000;
  const wordsTyped =  correctChars / 5;
  const grossWPM = wordsTyped / minutes;
  const netWPM = Math.round(grossWPM * (accuracy / 100));

  const results = {
    wpm: netWPM,
    cpm: typedWord.length / minutes,
  };
  return results;
};

export const calErrorPercentage = (accuracy: number) => {
  return 100 - accuracy;
};
