import { useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const css = {
  player: {
    backgroundColor: "black",
  },
  row: {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  btn: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};

export const VideoPlayer = ({ source }) => {
  const playerRef = useRef();

  const play = () => playerRef.current.play();

  const pause = () => playerRef.current.pause();

  return (
    <div style={css.player}>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>

      {/* <div style={css.row}>
        <button style={css.btn} className="hoverable" onClick={play}>
          <FaPlay size={24} />
        </button>
        <button style={css.btn} className="hoverable" onClick={pause}>
          <FaPause size={24} />
        </button>
      </div> */}
    </div>
  );
};
