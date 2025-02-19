import { useEffect, useState } from "react";

const pad = (num, length = 2) => num.toString().padStart(length, "0");

export const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 234);

    return () => clearInterval(interval);
  }, []);

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const miliseconds = pad(date.getMilliseconds(), 3);

  return (
    <div>
      {hours}:{minutes}:{miliseconds}
    </div>
  );
};
