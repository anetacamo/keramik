import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import { type Blog } from "../../../api";
import ShopBadge from "../ShopBadge";
import Like from "../Like";
import ImageGallery from "../../ui/ImageGallery";

type Props = {
  blog: Blog;
  children?: React.ReactNode;
  className?: string;
};

export default function BlogCard({ blog, children, className }: Props) {
  const { lang } = useTranslation();

  return (
    <div className={className}>
      <Link to={`/${lang}/blog/${blog.id}`}>
        <ImageGallery images={blog.images} alt={blog.title} preventDefault>
          {blog.stock && blog.stock > 0 && <ShopBadge blog={blog} />}
          <Like blogId={blog.id} likes={blog.likes} floating />
        </ImageGallery>
      </Link>
      {children}
    </div>
  );
}
