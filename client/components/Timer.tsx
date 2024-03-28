"use client";
import { BiTimer } from "react-icons/bi";
import { useSystem } from "@/hooks/use-system";
import { useState } from "react";
import Countdown from '@/components/CountDown';
type TimerProps = {
  time: number;
  setTime: (value: number) => void;
  restart: () => void;
};

export const Timer = () => {
  const [showPallet, setShowPallet] = useState(false);

  const {
    charTyped,
    counter,
    word,
    wordContainerFocused,
    modalIsOpen,
    aboutModal,
    history,
    time,
    results,
    resetCounter,
    setLocalStorageValue,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTime,
  } = useSystem();

  const handleTimeChange = (newTime: number) => {
    setTime(newTime);
    localStorage.setItem("time", newTime.toString());
    restartTest();
    window.location.reload();
  };

  return (
    <div
      className="flex items-center justify-center gap-3 mt-3"
      suppressHydrationWarning
    >
      <BiTimer className="text-3xl" />
      <div className="flex gap-4 rounded-lg">
        <span
          className={`category ${
            time === 15000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => handleTimeChange(15000)}
        >
          15s
        </span>
        <span
          className={`category ${
            time === 30000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => handleTimeChange(30000)}
        >
          30s
        </span>
        <span
          className={`category ${
            time === 60000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => handleTimeChange(60000)}
        >
          60s
        </span>
      </div>
    </div>
  );
};

export default Timer;
