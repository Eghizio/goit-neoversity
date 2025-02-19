import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "./components/VideoPlayer";

const FavouriteNumber = () => {
  const [number, setNumber] = useState(42);
  const favourite = useRef(-1);

  const makeFavourite = () => {
    favourite.current = number;
  };

  return (
    <div className="border">
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.valueAsNumber)}
      />

      <button type="button" onClick={makeFavourite}>
        Make favourite!
      </button>

      <p>Favourite number is {favourite.current}</p>
    </div>
  );
};

const randomColour = () => "#" + ((Math.random() * 0xffffff) << 0).toString(16);

const Box = ({ id }) => (
  <div
    id={id}
    className="hoverable"
    style={{ backgroundColor: randomColour(), width: "30px", height: "30px" }}
  />
);

const Boxes = ({ amount }) => {
  const ref = useRef();

  useEffect(() => {
    const onBoxClick = ({ target }) => {
      console.log(target.id);

      document.body.style.backgroundColor = target.style.backgroundColor;
    };

    if (ref.current) {
      ref.current.addEventListener("click", onBoxClick);
    }

    return () => {
      ref?.current?.removeEventListener("click", onBoxClick);
    };
  }, []);

  const boxes = Array.from({ length: amount }, (_, i) => (
    <Box key={i} id={i} />
  ));

  return (
    <article ref={ref} style={{ display: "flex", flexWrap: "wrap" }}>
      {boxes}
    </article>
  );
};

export const Ref = () => (
  <main className="col wide-gap">
    <h1>Ref - useRef Hook</h1>

    <VideoPlayer source="http://media.w3.org/2010/05/sintel/trailer.mp4" />

    {/* <FavouriteNumber /> */}

    {/* <Boxes amount={420} /> */}
  </main>
);
