import { type CartItem } from "../../../CartContext";
import { useTranslation } from "../../../LangContext";
import { calculateTotal } from "../../../helpers/calculateTotal";
import { SHIPPING_FEE } from "../../../constants/shipping";
import styles from "./CartSummary.module.scss";

interface Props {
  items: CartItem[];
  type?: string;
}

export default function CartSummary({ items, type }: Props) {
  const { t } = useTranslation();
  if (items.length === 0) return null;

  const subtotal = calculateTotal(items);
  const isPost = type === "post";
  const total = isPost ? subtotal + SHIPPING_FEE : subtotal;

  return (
    <div className={styles.cartSummary}>
      <p className={styles.title}>{t("cartItemsLabel")}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.blogId}>
            {item.title}: {item.price}
          </li>
        ))}
      </ul>
      <p className={styles.total}>
        {isPost && <>{t("shipping")}: {SHIPPING_FEE}dkk &rarr; </>}
        {t("total")}: {total}dkk
      </p>
      <p className={styles.hint}>
        <i>{t("cartEditHint")}</i>
      </p>
    </div>
  );
}
