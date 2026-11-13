import { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useBlogs } from "../../../api";
import { sortByDateDesc } from "../../../helpers/sortByDate";
import { isAvailable, matchesTag, matchesQuery } from "../../../helpers/blogFilters";
import BlogCard from "../../features/BlogCard";
import LineDivider from "../../ui/LineDivider";
import CategoryTags from "../../ui/CategoryTags";
import MultilineText from "../../ui/MultilineText";
import AvailableFilter from "../../features/AvailableFilter";
import GlazeFilter from "../../features/GlazeFilter";
import Button from "../../ui/Button";
import LoadingText from "../../ui/LoadingText";
import { CATEGORIES } from "../../../constants/categories";
import { useTranslation } from "../../../LangContext";
import { useSearch } from "../../../useSearch";
import blogStyles from "../Blog/Blog.module.scss";
import styles from "./Browse.module.scss";

export default function Browse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t } = useTranslation();
  const { query, setQuery } = useSearch();
  const [availableOnly, setAvailableOnly] = useState(false);
  const { visible, isLoading } = useBlogs();

  const tag = new URLSearchParams(location.search).get("tag") ?? "";
  const meta = tag
    ? CATEGORIES.find((c) => c.id.toLowerCase() === tag.toLowerCase())
    : null;

  const byTag = tag ? visible.filter((b) => matchesTag(b, tag)) : visible;
  const displayed = byTag
    .filter((b) => !availableOnly || isAvailable(b))
    .filter((b) => matchesQuery(b, query));

  function clearTag() {
    navigate({ to: `/${lang}/browse` });
  }

  if (isLoading) return <LoadingText centered />;

  const heading = meta?.title ?? (tag ? `#${tag}` : t("allItems"));

  return (
    <>
      <div className={blogStyles.blogContainer}>
        <div className="center">
          <h2>{heading}</h2>
          {meta?.text && (
            <p>
              <MultilineText text={meta.text} />
            </p>
          )}
        </div>
        <LineDivider />
      </div>
      <div className={styles.browseHeader}>
        <div className={styles.browseLeft}>
          <p>
            {displayed.length}{" "}
            {displayed.length === 1 ? t("item") : t("items")}
          </p>
          {tag && (
            <Button
              noStyles
              className={styles.tag}
              onClick={clearTag}
              aria-label={`Remove filter: #${tag}`}
            >
              #{tag} ×
            </Button>
          )}
          {query && (
            <Button
              noStyles
              className={styles.tag}
              onClick={() => setQuery("")}
              aria-label={`Remove filter: ${query}`}
            >
              {query} ×
            </Button>
          )}
          {availableOnly && (
            <Button
              noStyles
              className={styles.tag}
              onClick={() => setAvailableOnly(false)}
              aria-label={`Remove filter: ${t("available")}`}
            >
              {t("available")} ×
            </Button>
          )}
        </div>
        <div className={styles.filter}>
          <AvailableFilter active={availableOnly} onChange={setAvailableOnly} />
          <GlazeFilter items={byTag} />
        </div>
      </div>
      {displayed.length === 0 ? (
        <p className="center">
          {t("noResults")} {query && <strong>{query}</strong>}
        </p>
      ) : (
        <div className={styles.grid}>
          {sortByDateDesc(displayed).map((blog) => (
            <BlogCard key={blog.id} blog={blog} className={styles.gridItem} />
          ))}
        </div>
      )}
      <LineDivider />
      <CategoryTags items={visible} />
      <LineDivider />
    </>
  );
}
