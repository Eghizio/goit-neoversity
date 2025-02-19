import { useEffect, useRef, useState } from "react";

export const useTitle = (newTitle) => {
  const originalTitle = useRef(document.title);
  const [title, setTitle] = useState(newTitle ?? originalTitle.current);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const updateTitle = (updatedTitle) => setTitle(updatedTitle);

  const resetTitle = () => setTitle(originalTitle.current);

  return { title, updateTitle, resetTitle };
};
