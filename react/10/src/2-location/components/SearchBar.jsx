import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const btnStyle = {
  backgroundColor: "transparent",
  border: "none",
  position: "absolute",
  top: "0",
};

const css = {
  bar: {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
  },
  search: { position: "relative" },
  input: {
    padding: "0.5rem",
    paddingRight: "1.5rem",
    width: "200px",
    border: "none",
    backgroundColor: "lightgray",
  },
  clearBtn: {
    ...btnStyle,
    right: "0",
    top: "50%",
    transform: "translate(0, -50%)",
  },
  searchBtn: {
    backgroundColor: "lightgray",
    border: "none",
    // fontWeight: "bold",
  },
};

export const SearchBar = () => {
  const { searchQuery, setSearch, clearSearch } = useSearch();
  const [query, setQuery] = useState(searchQuery);

  const onChange = (event) => setQuery(event.target.value);

  const searchProducts = (event) => {
    event.preventDefault();

    if (query.trim().length === 0) return clearSearch();

    setSearch(query);
  };

  const clearQuery = () => {
    clearSearch();
    setQuery("");
  };

  return (
    <form style={css.bar} onSubmit={searchProducts}>
      <div style={css.search}>
        <input
          style={css.input}
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />

        <button
          className="hoverable"
          style={css.clearBtn}
          type="button"
          onClick={clearQuery}
        >
          ❌
        </button>
      </div>

      <button className="hoverable" style={css.searchBtn} type="submit">
        Search 🔎
      </button>
    </form>
  );
};
