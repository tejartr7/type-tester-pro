'use client'
import { useEffect, useState, useRef, useCallback } from 'react';

export const useCounter = (initialValue: number, interval = 1000) => {
  const [counter, setCounter] = useState(initialValue);
  const intervalRef = useRef<number>();

  const startCounter = useCallback(() => {
    if (intervalRef.current == undefined) return;
    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) {
          return prev - interval;
        } else {
          clearInterval(intervalRef.current!);
          return prev;
        }
      });
    }, interval);
  }, [interval]);

  const resetCounter = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    setCounter(initialValue);
  }, [initialValue]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return { counter, startCounter, resetCounter };
};
