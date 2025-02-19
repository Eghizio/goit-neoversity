import { useTitle } from "../hooks/useTitle";

export const TitleChanger = () => {
  const { title, updateTitle, resetTitle } = useTitle();

  return (
    <section className="border">
      <p>Title: {title}</p>

      <input
        type="text"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
      />

      <button type="button" onClick={resetTitle}>
        Reset title
      </button>
    </section>
  );
};
