'use client'
import { useEffect } from "react";

type CountdownProps = {
  time: number;
  countdown: number;
  theme: string;
  reset: (value:number) => void;
};

const Countdown = ({ time,countdown, reset,theme }: CountdownProps) => {
  useEffect(() => {
    reset(time);
  }, [reset]);

  const formatedCountdown = {
    minutes: new Date(countdown).getUTCMinutes(),
    seconds: new Date(countdown).getUTCSeconds(),
  };

  return (
    <div className="flex justify-end">
      <div
        className=" rounded-lg p-3"
      >
        <span
          className="text-right font-mono text-lg lg:text-xl p-2
          dark:bg-white dark:text-black bg-black text-white"
          style={{
            borderRadius: "5px",
          }}
        >
          CountDown:
          {formatedCountdown.minutes < 10
            ? `0${formatedCountdown.minutes}`
            : formatedCountdown.minutes}
          :
          {formatedCountdown.seconds < 10
            ? `0${formatedCountdown.seconds}`
            : formatedCountdown.seconds}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
