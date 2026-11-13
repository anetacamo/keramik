import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import { useCart } from "../../../CartContext";
import { imageUrl } from "../../../api";
import { calculateTotal } from "../../../helpers/calculateTotal";
import Button from "../../ui/Button";
import styles from "./YourBag.module.scss";

export default function YourBag() {
  const { items, removeItem } = useCart();
  const { t, lang } = useTranslation();

  const totalPrice = calculateTotal(items);

  return (
    <>
      {items.length > 0 ? (
        <p>
          {items.length} {items.length === 1 ? t("item") : t("items")} &rarr;{" "}
          {totalPrice} dkk
        </p>
      ) : (
        <>
          <p>{t("noItems")}</p>
          <Link to="/$lang/shop" params={{ lang }}>
            <Button style={{ marginTop: 20 }}>{t("goToShop")}</Button>
          </Link>
        </>
      )}

      <div className={styles.cartItems}>
        {items.map((item) => (
          <div className={styles.cartItem} key={item.blogId}>
            <Link to={`/${lang}/blog/${item.blogId}`}>
              <img src={imageUrl(item.image)} alt={item.title} />
            </Link>
            <div className={styles.cartItemDesc}>
              <div className={styles.cartItemInfo}>
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
              <Button
                noStyles
                className={styles.removeButton}
                onClick={() => removeItem(item.blogId)}
                aria-label="Remove item"
              >
                &times;
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
