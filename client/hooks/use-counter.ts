import { useEffect, useState, useRef, useCallback } from 'react';

export const useCounter = (initialValue: number) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [counter, setCounter] = useState(initialValue);

  const startCounter = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) {
          return prev - 1000; // subtract 1000 milliseconds (1 second)
        }
        if (prev === 0) clearInterval(intervalRef.current!);

        return prev;
      });
    }, 1000); // set interval to 1000 milliseconds (1 second)
  }, []);

  const resetCounter = useCallback((newTime: number = initialValue) => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCounter(newTime);
  }, [initialValue]);

  useEffect(() => {
    resetCounter(initialValue);
  }, [initialValue]);

  return { counter, startCounter, resetCounter };
};
