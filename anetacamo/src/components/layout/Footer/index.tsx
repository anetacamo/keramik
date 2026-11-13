import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import Image from "../../ui/Image";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { t, lang } = useTranslation();
  return (
    <footer className={styles.menuLinks}>
      <Link to={`/${lang}/cv`}>
        <Image src="/images/work.png" alt="work" className="desktop" />
      </Link>
      <h4>
        <a href="mailto:anetacamo@gmail.com">anetacamo@gmail.com</a>
      </h4>
      <h4 style={{ marginBottom: 0 }}>{t("footerCredit")}</h4>
    </footer>
  );
}
