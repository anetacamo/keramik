import { useTranslation } from "../../../LangContext";
import { useBlogs } from "../../../api";
import { filterBlogs } from "../../../helpers/blogFilters";
import { CATEGORIES } from "../../../constants/categories";
import CategoryItem from "../../features/CategoryItem";
import CategoryTags from "../../ui/CategoryTags";
import BlogCard from "../../features/BlogCard";
import LineDivider from "../../ui/LineDivider";
import LoadingText from "../../ui/LoadingText";
import styles from "./Shop.module.scss";

export default function Shop() {
  const { t } = useTranslation();
  const { visible, isLoading, error } = useBlogs();

  if (isLoading) return <LoadingText centered />;
  if (error) return <p className="center">{t("couldNotLoadItems")}</p>;

  const shopCategories = CATEGORIES.filter((c) => c.shop);
  const recentItems = filterBlogs(visible, { available: true, limit: 6 });

  return (
    <div className="carousel tagged">
      <h1 className="center">{t("shop")}</h1>
      <CategoryItem categories={shopCategories} />
      <LineDivider />
      <CategoryTags items={visible} />
      <LineDivider />

      <h3>{t("recentInShop")}</h3>
      <div className={styles.grid}>
        {recentItems.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            className={styles.gridItem}
          />
        ))}
      </div>
    </div>
  );
}
