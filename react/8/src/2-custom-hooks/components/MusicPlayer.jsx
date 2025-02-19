import { useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useAudio } from "../hooks/useAudio";

const css = {
  player: {
    backgroundColor: "black",
    width: "100%",
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

const pad = (num) => num.toString().padStart(2, "0");

const parseTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  return `${pad(minutes)}:${pad(secondsRemaining)}`;
};

export const MusicPlayer = ({ source }) => {
  const audio = useAudio(source);
  const ref = useRef(null);

  const play = audio.play.bind(audio);

  const pause = audio.pause.bind(audio);

  useEffect(() => {
    const updateTime = () => {
      const audioProgress = (
        (audio.currentTime / audio.duration) *
        100
      ).toFixed(2);

      const currentTime = parseTime(Math.round(audio.currentTime));
      const totalTime = parseTime(Math.round(audio.duration));

      console.log(`${audioProgress}%`, `${currentTime} / ${totalTime}`);

      if (ref.current) {
        ref.current.style.background = `linear-gradient(90deg, orange 0%, orange ${audioProgress}%, black ${audioProgress}%, black 100%)`;
      }
    };

    const interval = setInterval(updateTime, 300);

    if (audio.paused) clearInterval(interval);

    return () => clearInterval(interval);
  }, [audio.paused]);

  // console.log(audio.paused);

  return (
    <section style={css.player} ref={ref}>
      <div style={css.row}>
        <button style={css.btn} className="hoverable" onClick={play}>
          <FaPlay size={24} color={audio.paused ? "white" : "dodgerblue"} />
        </button>

        <button style={css.btn} className="hoverable" onClick={pause}>
          <FaPause size={24} color={audio.paused ? "dodgerblue" : "white"} />
        </button>
      </div>
    </section>
  );
};
