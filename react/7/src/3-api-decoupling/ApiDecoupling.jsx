import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { Hackernews } from "./Hackernews";

export const ApiDecoupling = () => {
  const [searchQuery, setSearchQuery] = useState("react");

  return (
    <main className="col wide-gap">
      <h1>API Decoupling</h1>

      <SearchBar onSearch={setSearchQuery} defaultQuery={searchQuery} />

      <Hackernews topic={searchQuery} />
    </main>
  );
};
