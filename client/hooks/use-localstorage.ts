"use client";
export const useLocalStorage = () => {
  const setLocalStorageValue = (key: string, value: number) => {
    if (typeof window === "undefined") {
      //localStorage.setItem(key, JSON.stringify(value));
      return null;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Something went wrong at use local storage hook:", error);
    }
  };

  const getLocalStorageValue = (key: string) => {
    if (typeof window === "undefined") {
      return 0;
    }
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Something went wrong at get local storage hook:", error);
      return null;
    }
  };

  return { setLocalStorageValue, getLocalStorageValue };
};
