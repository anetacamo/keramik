import { useState } from "react";
import { useCart } from "../../../CartContext";
import { useTranslation } from "../../../LangContext";
import ShopSection from "../../layout/ShopSection";
import YourBag from "../../features/YourBag";
import Button from "../../ui/Button";
import ContactForm from "../../features/ContactForm";
import LineDivider from "../../ui/LineDivider";
import MultilineText from "../../ui/MultilineText";
import { SHIPPING_FEE } from "../../../constants/shipping";
import styles from "./Cart.module.scss";

export default function Cart() {
  const { items } = useCart();
  const { t } = useTranslation();
  const [checkout, setCheckout] = useState("cart");
  return (
    <div className="cart">
      <div className="center">
        <ShopSection title={t("yourBag")}>
          <YourBag />
        </ShopSection>
        {items.length > 0 && (
          <ShopSection title={t("checkout")}>
            {checkout === "cart" && (
              <div style={{ paddingBottom: 32 }}>
                <p>{t("howToReceive")}</p>
                <p>
                  <i>
                    {t("mailingCost", { shippingFee: SHIPPING_FEE })} <br />
                    {t("pickupFree")}
                  </i>
                </p>
              </div>
            )}
            <div className={styles.buttonContainer}>
              <Button
                active={checkout === "pickup"}
                onClick={() => setCheckout("pickup")}
              >
                {t("pickupInAarhus")}
              </Button>
              <Button
                active={checkout === "post"}
                onClick={() => setCheckout("post")}
              >
                {t("receiveByPost")}
              </Button>
            </div>
          </ShopSection>
        )}
        {checkout === "pickup" && (
          <ShopSection title={t("pickupInAarhus")}>
            <p>
              <MultilineText text={t("pickupInfo")} />
            </p>
            <ContactForm type={"pickup"} messageText={t("pickupMessageHint")} />
          </ShopSection>
        )}
        {checkout === "post" && (
          <>
            <ShopSection title={t("receiveByPost")} active={[0, 1, 2]}>
              <p>
                <MultilineText
                  text={t("shippingInfo", { shippingFee: SHIPPING_FEE })}
                />
              </p>
              <ContactForm type={"post"} messageText={t("postMessageHint")} />
            </ShopSection>
          </>
        )}
        <LineDivider />
      </div>
    </div>
  );
}
