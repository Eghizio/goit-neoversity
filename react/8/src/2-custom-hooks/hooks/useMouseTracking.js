import { useEffect, useState } from "react";

export const useMouseTracking = () => {
  const [xy, setXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const trackMouse = ({ clientX: x, clientY: y }) => {
      setXY({ x, y });
    };

    document.body.addEventListener("mousemove", trackMouse);
  }, []);

  return xy;
};
