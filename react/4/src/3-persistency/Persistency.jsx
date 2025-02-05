/* Persistency using LocalStorage */
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "__fav_number";
const FavouriteNumber = ({ initialNumber = 42 }) => {
  const [number, setNumber] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);

      return localValue ? JSON.parse(localValue) : initialNumber;
    } catch (_) {
      console.log("Ooopsie.");
      return initialNumber;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(number));
  }, [number]);

  const onChange = (event) => {
    const value = event.target.valueAsNumber;

    setNumber(isNaN(value) ? 0 : value);
  };

  return (
    <div className="col border">
      <h2>My fav number is: {number}</h2>

      <input type="number" value={number} onChange={onChange} />
    </div>
  );
};

/* Custom Hook, Syncing State & LocalStorage */
const useLocalStorage = (localStorageKey, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(localStorageKey);

      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (_) {
      console.log("Ooopsie.");
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const LOCAL_STORAGE_KEY_2 = "__fav_number_2";
const SmartFavouriteNumber = ({ initialNumber = 7 }) => {
  const [number, setNumber] = useLocalStorage(
    LOCAL_STORAGE_KEY_2,
    initialNumber
  );

  const onChange = (event) => {
    const value = event.target.valueAsNumber;

    setNumber(isNaN(value) ? 0 : value);
  };

  return (
    <div className="col border">
      <h2>My fav number is: {number}</h2>

      <input type="number" value={number} onChange={onChange} />
    </div>
  );
};

export const Persistency = () => {
  return (
    <main className="col wide-gap">
      <h1>Persistency</h1>

      <FavouriteNumber />

      {/* <SmartFavouriteNumber /> */}
    </main>
  );
};
