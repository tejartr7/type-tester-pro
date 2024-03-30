// Countdown.js
import React, { useEffect, useState } from "react";
import { useSystem } from "@/hooks/use-system";

const Countdown = () => {
  const { counter } = useSystem();
  const [remainingTime, setRemainingTime] = useState(counter);

  useEffect(() => {
    // Update remainingTime every second
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1000);
      }
    }, 1000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [remainingTime]); // Re-run effect when remainingTime changes

  // Calculate formatted countdown
  const formattedCountdown = {
    minutes: Math.floor(remainingTime / 60000),
    seconds: Math.floor((remainingTime % 60000) / 1000),
  };

  return (
    <div className="flex justify-end">
      <div className="rounded-lg p-3">
        <span className="text-right font-mono text-lg lg:text-xl">
          {formattedCountdown.minutes < 10
            ? `0${formattedCountdown.minutes}`
            : formattedCountdown.minutes}
          :
          {formattedCountdown.seconds < 10
            ? `0${formattedCountdown.seconds}`
            : formattedCountdown.seconds}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
