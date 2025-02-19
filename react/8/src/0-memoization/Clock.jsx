import { useEffect, useState } from "react";

const pad = (num, length = 2) => num.toString().padStart(length, "0");

export const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 123);

    return () => clearInterval(interval);
  }, []);

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const miliseconds = pad(date.getMilliseconds(), 3);

  return (
    <div style={{ fontSize: "xxx-large" }}>
      {hours}:{minutes}:{seconds}:{miliseconds}
    </div>
  );
};
