import { Link, useParams } from "@tanstack/react-router";
import Image from "../../ui/Image";
import styles from "./Logo.module.scss";

export default function Logo() {
  const { lang } = useParams({ strict: false });

  return (
    <div>
      <Link to="/$lang" params={{ lang: lang ?? "en" }}>
        <Image
          src="/images/anetacamo_small.png"
          alt="AnetaCamo logo"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}
