import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import { imageUrl } from "../../../api";
import { slugify } from "../../../helpers/slugify";
import type { CategoryMeta } from "../../../constants/categories";
import styles from "./CategoryItem.module.scss";

interface Props {
  categories: CategoryMeta[];
}

export default function CategoryItem({ categories }: Props) {
  const { lang } = useTranslation();

  return (
    <div className={styles.cards}>
      {categories.map((category) => (
        <div className={styles.card}>
          <h2 className={styles.absoluteCenter}>#{category.id}</h2>
          <Link
            to={`/${lang}/browse?tag=${slugify(category.id)}`}
            key={category.id}
          >
            {category.image && (
              <img
                alt={`tagged ${category.id}`}
                src={imageUrl(category.image)}
                className={styles.coverImage}
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
