import { BiTimer } from "react-icons/bi";
import Countdown from '@/components/CountDown';
import React from 'react'; // Import React

type TimeCategoryProps = {
  time: number;
  setTime: (value: number) => void;
  setLocalStorage: (key: string, value: number) => void;
  resetCounter: (value: number) => void;
  theme: string;
  counter: number;
  restart: () => void;
};

// Wrap the Countdown component with React.memo
const MemoizedCountdown = React.memo(Countdown);

const TimeCategory = ({
  time,
  setTime,
  restart,
  resetCounter,
  counter,
  theme,
  setLocalStorage,
}: TimeCategoryProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <BiTimer className="text-3xl" />
      <div className="flex gap-4 rounded-lg">
        <span
          className={`category ${
            time === 15000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(15000);
            setLocalStorage("time", 15000);
            resetCounter(15000);
            restart();
          }}
          style={{
            color: time === 15000 ? "text-decoration: underline" : "",
          }}
        >
          15s
        </span>
        <span
          className={`category ${
            time === 30000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(30000);
            setLocalStorage("time", 30000);
            resetCounter(30000);
            restart();
          }}
          style={{
            color: time === 30000 ? "text-decoration: underline" : "",
          }}
        >
          30s
        </span>
        <span
          className={`category ${
            time === 60000 ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => {
            setTime(60000);
            setLocalStorage("time", 60000);
            resetCounter(60000);
            restart();
          }}
          style={{
            color: time === 60000 ? "text-decoration: underline" : "",
          }}
        >
          60s
        </span>
      </div>
      {/* Use the MemoizedCountdown component */}
      <MemoizedCountdown time={time} countdown={counter} reset={resetCounter} theme={theme} />
    </div>
  );
};

export default TimeCategory;
