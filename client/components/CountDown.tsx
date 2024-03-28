'use client'
import React, { useEffect } from 'react';
import { useSystem } from '@/hooks/use-system';

const Countdown = () => {
  const { counter } = useSystem();

  const formatedCountdown = {
    minutes: Math.floor(counter / 60000),
    seconds: Math.floor((counter % 60000) / 1000),
  };

  return (
    <div className='flex justify-end'>
      <div className='rounded-lg p-3'>
        <span className='text-right font-mono text-lg lg:text-xl'>
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
