import { useTranslation } from "../../../LangContext";
import { useBlogs } from "../../../api";
import { sortByDateDesc } from "../../../helpers/sortByDate";
import { formatDate } from "../../../helpers/formatDate";
import Tags from "../../ui/Tags";
import BlogCard from "../../features/BlogCard";
import LoadingText from "../../ui/LoadingText";
import styles from "./Blog.module.scss";

export default function Blog() {
  const { t } = useTranslation();
  const { blogs, isLoading } = useBlogs();
  return (
    <div className={styles.blogContainer}>
      <p>
        {t("newestIn")} <strong>{t("blog")}</strong>
      </p>
      {isLoading && <LoadingText />}
      <div className={styles.blogs}>
        {sortByDateDesc(blogs).map((blog) => (
          <BlogCard key={blog.id} blog={blog} className={styles.blog}>
            <div className={styles.textContainer}>
              <div>
                <p>{blog.title}</p>
                <br />
                {blog.description ? <p>{blog?.description}</p> : null}
                <Tags blog={blog} />
                {blog.date && (
                  <p>
                    <span className="bolded">{t("published")}</span>{" "}
                    {formatDate(blog.date)}
                  </p>
                )}
              </div>
            </div>
          </BlogCard>
        ))}
      </div>
    </div>
  );
}
