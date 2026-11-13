import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSearch } from "../../../useSearch";
import { useTranslation } from "../../../LangContext";
import { useBlogs, imageUrl } from "../../../api";
import styles from "./SearchField.module.scss";

const MAX_RESULTS = 6;

export default function SearchField() {
  const { query, setQuery } = useSearch();
  const { lang } = useTranslation();
  const { visible } = useBlogs();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);

  const lowerQuery = query.trim().toLowerCase();
  const results = lowerQuery
    ? visible
        .filter(
          (b) =>
            b.title.toLowerCase().includes(lowerQuery) ||
            b.description?.toLowerCase().includes(lowerQuery) ||
            (b.glaze ?? []).some((g) => g.toLowerCase().includes(lowerQuery)),
        )
        .slice(0, MAX_RESULTS)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showResults = open && lowerQuery.length > 0;

  return (
    <form
      ref={containerRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (!lowerQuery) return;
        setOpen(false);
        navigate({ to: `/${lang}/browse` });
      }}
      className={styles.form}
    >
      <label htmlFor="searchInput"></label>
      <div className={styles.wrapper}>
        <span className={styles.icon}>⌕</span>
        <input
          id="searchInput"
          className={styles.searchField}
          value={query}
          type="search"
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        />
      </div>
      {showResults && (
        <ul className={styles.results}>
          {results.length === 0 ? (
            <li className={styles.empty}>—</li>
          ) : (
            results.map((blog) => (
              <li key={blog.id}>
                <Link
                  to={`/${lang}/blog/${blog.id}`}
                  className={styles.result}
                  onClick={() => setOpen(false)}
                >
                  <img
                    src={imageUrl(blog.images[0])}
                    alt=""
                    className={styles.thumb}
                  />
                  <span className={styles.resultTitle}>{blog.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
