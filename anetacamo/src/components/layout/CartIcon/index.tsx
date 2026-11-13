import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import { useCart } from "../../../CartContext";
import { calculateTotal } from "../../../helpers/calculateTotal";
import Badge from "../../ui/Badge";
import styles from "./CartIcon.module.scss";

export default function CartIcon() {
  const { lang, t } = useTranslation();
  const { items } = useCart();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const total = calculateTotal(items);

  const updatePopoverPosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    popoverRef.current.style.setProperty(
      "--popover-top",
      `${rect.bottom + 10}px`,
    );
    popoverRef.current.style.setProperty(
      "--popover-left",
      `${rect.left + rect.width / 2}px`,
    );
  }, []);

  useEffect(() => {
    if (!isPopoverOpen) return;

    updatePopoverPosition();

    const handleViewportChange = () => updatePopoverPosition();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPopoverOpen(false);
      }
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPopoverOpen, updatePopoverPosition]);

  if (items.length === 0) return null;

  return (
    <>
      <span
        ref={triggerRef}
        className={styles.cartIcon}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsPopoverOpen(false);
          }
        }}
      >
        <Link
          to="/$lang/cart"
          params={{ lang }}
          onFocus={() => setIsPopoverOpen(true)}
          onBlur={() => setIsPopoverOpen(false)}
        >
          <img src="/images/shopping_bag.png" alt={t("cart")} />
          <Badge count={items.length} />
        </Link>
      </span>

      {isPopoverOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={styles.popover}
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <span className={styles.arrow} aria-hidden="true" />
            <p className={styles.row}>
              <span>{t("items")}</span>
              <strong>{items.length}</strong>
            </p>
            <p className={styles.row}>
              <span>{t("total")}</span>
              <strong>{total}dkk</strong>
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
