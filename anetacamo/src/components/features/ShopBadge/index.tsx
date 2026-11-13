import { type Blog } from "../../../api";
import { useCart } from "../../../CartContext";
import { useTranslation } from "../../../LangContext";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import styles from "./ShopBadge.module.scss";

interface ShopBadgeProps {
  blog: Blog;
}

export default function ShopBadge({ blog }: ShopBadgeProps) {
  const { addItem, items } = useCart();
  const { t } = useTranslation();
  const inCart = items.some((i) => i.blogId === blog.id);
  const displayPrice = blog.price ? `${blog.price}dkk` : "";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inCart) {
      addItem({
        blogId: blog.id,
        title: blog.title,
        image: blog.images[0],
        price: displayPrice,
      });
    }
  };

  return (
    <Button
      noStyles
      className={`${styles.shoppingInfo} ${inCart ? styles.inCart : ""}`}
      onClick={handleClick}
      aria-label={
        inCart
          ? `${blog.title} ${t("inCart")}`
          : `Add ${blog.title} to cart, ${displayPrice}`
      }
    >
      <div className={styles.shoppingInfoText}>
        <p>{inCart ? t("inCart") : t("available")}</p>
        <p>{displayPrice}</p>
      </div>
      <div className={styles.shopIcon}>
        <img src="/images/shopping_bag.png" alt="" />
        {!inCart && <Badge label="+" />}
      </div>
    </Button>
  );
}
