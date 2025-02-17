import { FaSearch } from "react-icons/fa";

const color = {
  primary: "#ff6600",
  secondary: "#f6f6ef",
  text: "#828282",
};

const css = {
  form: {
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: color.text,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  input: {
    backgroundColor: color.secondary,
    padding: "0.5rem 1rem",
  },
  button: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    color: color.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const SearchBar = ({ onSearch, defaultQuery }) => {
  const search = (event) => {
    event.preventDefault();

    const query = event.target.elements["query"].value.trim();

    if (query.length === 0) {
      return alert("Please enter search query!");
    }

    onSearch(query);
  };

  return (
    <form style={css.form} onSubmit={search}>
      <input
        style={css.input}
        type="text"
        name="query"
        defaultValue={defaultQuery}
      />

      <button style={css.button} type="submit" aria-label="Search">
        <FaSearch size={24} />
      </button>
    </form>
  );
};
