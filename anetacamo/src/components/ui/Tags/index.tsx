import { Link } from "@tanstack/react-router";
import { slugify } from "../../../helpers/slugify";
import { useTranslation } from "../../../LangContext";
import type { Blog } from "../../../api";
import styles from "./Tags.module.scss";

interface TagsProps {
  blog: Blog;
}

export default function Tags({ blog }: TagsProps) {
  const { t, lang } = useTranslation();
  if (!blog.category.length) return null;

  return (
    <p className={styles.allTags}>
      <span className="bolded">{t("taggedLabel")}</span>{" "}
      {blog.category.map((cat) => (
        <Link to={`/${lang}/browse?tag=${slugify(cat)}`} key={cat}>
          #{cat}
        </Link>
      ))}
    </p>
  );
}
