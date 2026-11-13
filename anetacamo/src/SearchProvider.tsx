import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState(
    () => new URLSearchParams(window.location.search).get("query") ?? "",
  );

  const setQuery = useCallback(function setQuery(newQuery: string) {
    setQueryState(newQuery);
    //console.log("new search set");
    const url = new URL(window.location.href);
    if (newQuery) {
      url.searchParams.set("query", newQuery);
    } else {
      url.searchParams.delete("query");
    }
    history.replaceState(null, "", url);
  }, []);

  return <SearchContext value={{ query, setQuery }}>{children}</SearchContext>;
}
