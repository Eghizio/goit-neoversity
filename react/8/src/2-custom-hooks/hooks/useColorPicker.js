import { useEffect, useState } from "react";

export const useColorPicker = () => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const pickElementColor = ({ target }) => {
      const c = target.style.backgroundColor ?? target.style.color;

      setColor(c ?? null);
    };

    document.body.addEventListener("mousemove", pickElementColor, controller);

    return () => controller.abort();
  }, []);

  return color;
};
