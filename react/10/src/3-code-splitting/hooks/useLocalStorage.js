import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue, localStorageKey) => {
  const [state, setState] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(localStorageKey);
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (error) {
      console.error(
        `Failed to get "${localStorageKey}" value from Local Storage. Returning initial value.`,
        error
      );
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
