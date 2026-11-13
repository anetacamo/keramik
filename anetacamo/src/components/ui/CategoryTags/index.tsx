import { Link } from "@tanstack/react-router";
import { slugify } from "../../../helpers/slugify";
import { useTranslation } from "../../../LangContext";
import type { Blog } from "../../../api";
import styles from "./CategoryTags.module.scss";

interface CategoryTagsProps {
  items: Blog[];
}

export default function CategoryTags({ items }: CategoryTagsProps) {
  const { t, lang } = useTranslation();
  const allCategories = [
    ...new Set(items.flatMap((item) => item.category)),
  ].sort();

  return (
    <div className={styles.categoryTags}>
      <p>{t("allFeaturedTags")}</p>
      <p>
        {allCategories.map((cat) => (
          <Link key={cat} to={`/${lang}/browse?tag=${slugify(cat)}`}>
            #{cat}{" "}
          </Link>
        ))}
      </p>
    </div>
  );
}
