"use client";
import React, { useEffect, useState } from "react";
import WordWrapper from "@/components/WordWrapper";
import { useSystem } from "@/hooks/use-system";
import WordContainer from "@/components/WordContainer";
import UserInput from "@/components/UserInput";
import ModalComponent from "@/components/Modal";
import ModalContent from "@/components/ModelContainer";
import Countdown from "@/components/CountDown";
import Timer from "@/components/Timer";

const WordWrapperModal = () => {
  const {
    charTyped,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    checkCharacter,
    modalIsOpen,
    closeModal,
    time,
    results,
    history,
    counter,
    resetCounter,
    theme,
    setLocalStorageValue,
    setTime,
    restartTest,
  } = useSystem();
  return (
    <div className="word-wrapper-modal">
      <Timer
        time={time}
        setLocalStorage={setLocalStorageValue}
        setTime={setTime}
        restart={restartTest}
        resetCounter={resetCounter}
        counter={counter}
        theme={theme}
      />
      
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
        theme={theme}
      >
        <ModalContent totalTime={time} results={results} history={history} />
      </ModalComponent>
    </div>
  );
};

export default WordWrapperModal;
