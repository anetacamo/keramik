import { Link, useLocation } from "@tanstack/react-router";
import { languages } from "../../../routes";
import styles from "./LanguageSwitcher.module.scss";

export default function LanguageSwitcher() {
  const { pathname } = useLocation();

  const switchLangPath = (newLang: string) => {
    const withoutLang = pathname.replace(/^\/[^/]+/, "");
    return `/${newLang}${withoutLang || "/"}`;
  };

  return (
    <div>
      {languages.map((l, index) => (
        <span key={l}>
          <Link className={styles.link} to={switchLangPath(l)}>
            {l.toUpperCase()}
          </Link>
          {index !== languages.length - 1 && " | "}
        </span>
      ))}
    </div>
  );
}
