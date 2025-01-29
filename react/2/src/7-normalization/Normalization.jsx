import "modern-normalize";

const links = ["First", "Second", "Third"];

export const Normalization = () => {
  return (
    <main>
      <h1>Normalization</h1>
      <button>Click me</button>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </main>
  );
};
