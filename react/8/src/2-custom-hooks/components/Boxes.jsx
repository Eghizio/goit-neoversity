import { useRef, memo } from "react";
import { useColorPicker } from "../hooks/useColorPicker";

const randomColour = () => "#" + ((Math.random() * 0xffffff) << 0).toString(16);

/* memo */
const Box = ({ id }) => (
  <div
    id={id}
    className="hoverable"
    style={{ backgroundColor: randomColour(), width: "30px", height: "30px" }}
  />
);

const MemoizedBox = memo(Box);

export const Boxes = ({ amount }) => {
  const ref = useRef(null);
  const color = useColorPicker();

  if (ref.current) {
    ref.current.style.backgroundColor = color;
  }

  return (
    <section className="border" ref={ref}>
      <p>Color: {color}</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.from({ length: amount }, (_, i) => (
          <Box key={i} id={i} />
        ))}
      </div>
    </section>
  );
};
