import { useMouseTracking } from "./hooks/useMouseTracking";
import { Boxes } from "./components/Boxes";
import { TitleChanger } from "./components/TitleChanger";
import { MusicPlayer } from "./components/MusicPlayer";

export const CustomHooks = () => {
  const { x, y } = useMouseTracking();
  // console.log("Tracking", { x, y });

  if (x < 10 || y < 10) {
    // alert("Please don't leave the page!");
    console.log("Please don't leave the page!");
  }

  return (
    <main className="col wide-gap">
      <h1>Custom Hooks</h1>

      <a href="https://tanstack.com/query/latest" target="_blank">
        useFetch -&gt; React Query
      </a>

      {/* <Boxes amount={360} /> */}

      {/* <TitleChanger /> */}

      {/* <MusicPlayer source="/brainpower.mp3" /> */}
      {/* <MusicPlayer source="/romantic-song.mp3" /> */}
    </main>
  );
};
