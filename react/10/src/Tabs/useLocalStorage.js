import { useEffect, useState } from "react";

const DEFAULT_LOCAL_STORAGE_KEY = "__react_tabs";

export const useLocalStorage = (
  initialValue,
  localStorageKey = DEFAULT_LOCAL_STORAGE_KEY
) => {
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
