"use client";
import React from "react";
import WordWrapper from "@/components/WordWrapper";
import { useSystem } from "@/hooks/use-system";
import WordContainer from "@/components/WordContainer";
import UserInput from "@/components/UserInput";
import ModalComponent from "@/components/Modal";
import ModalContent from "@/components/ModelContainer";
import Countdown from "@/components/CountDown";

const WordWrapperModal = () => {
  const {
    charTyped,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    checkCharacter,
    aboutModal,
    modalIsOpen,
    closeModal,
    time,
    results,
    history,
    counter,
    resetCounter,
  } = useSystem();
  // console.log("word is " + word);
  return (
    <div className="word-wrapper-modal">
      <Countdown />
      <WordWrapper
        focused={wordContainerFocused}
        setFocused={setWordContainerFocused}
      >
        <WordContainer word={word} />
        <UserInput word={word} check={checkCharacter} charTyped={charTyped} />
      </WordWrapper>
      <ModalComponent
        type="result"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent totalTime={time} results={results} history={history} />
      </ModalComponent>
    </div>
  );
};

export default WordWrapperModal;
