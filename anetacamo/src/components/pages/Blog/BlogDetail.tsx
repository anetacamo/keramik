import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "../../../api";
import { useTranslation } from "../../../LangContext";
import ImageGallery from "../../ui/ImageGallery";
import LoadingText from "../../ui/LoadingText";
import styles from "./BlogDetail.module.scss";

export default function BlogDetail() {
  const { blogId } = useParams({ from: "/$lang/blog/$blogId" });
  const { t } = useTranslation();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlog(blogId),
  });

  if (isLoading) return <LoadingText />;
  if (error || !blog) return <p>{t("blogNotFound")}</p>;

  return (
    <ImageGallery
      images={blog.images}
      alt={blog.title}
      className={styles.detail}
      imageClassName={styles.heroImage}
    >
      <h3 className={styles.title}>{blog.title}</h3>
    </ImageGallery>
  );
}
