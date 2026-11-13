import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "../../../LangContext";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const { t } = useTranslation();
  const { lang } = useParams({ strict: false });

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>{t("pageNotFound")}</p>
      <Link to="/$lang" params={{ lang: lang ?? "en" }}>
        {t("backToHome")}
      </Link>
    </div>
  );
}
