"use client";
import React from "react";
import WordWrapper from "@/components/WordWrapper";
import { useSystem } from "@/hooks/use-system";
import WordContainer from "@/components/WordContainer";
import UserInput from "@/components/UserInput";

const WordWrapperModal = () => {
  const {
    charTyped,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    checkCharacter,
  } = useSystem();

  return (
    <div className="word-wrapper-modal">
      <WordWrapper
        focused={wordContainerFocused}
        setFocused={setWordContainerFocused}
      >
        <WordContainer word={word} />
        <UserInput word={word} check={checkCharacter} charTyped={charTyped} />
      </WordWrapper>
    </div>
  );
};

export default WordWrapperModal;
