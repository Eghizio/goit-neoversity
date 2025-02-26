import { useSearchParams } from "react-router-dom";

const SEARCH_KEY = "search";

export const useSearch = (initialParams) => {
  const [searchParams, setSearchParams] = useSearchParams(initialParams);

  const searchQuery = searchParams.get(SEARCH_KEY) ?? "";

  const setSearch = (searchQuery) =>
    setSearchParams((params) => {
      params.set(SEARCH_KEY, searchQuery);
      return params;
    });

  const clearSearch = () =>
    setSearchParams((params) => {
      params.delete(SEARCH_KEY);
      return params;
    });

  return { searchQuery, setSearch, clearSearch };
};
