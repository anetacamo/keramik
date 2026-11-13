import { createContext } from "react";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);
