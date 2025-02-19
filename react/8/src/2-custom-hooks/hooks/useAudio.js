import { useMemo } from "react";

export const useAudio = (audiopath) =>
  useMemo(() => new Audio(audiopath), [audiopath]);
