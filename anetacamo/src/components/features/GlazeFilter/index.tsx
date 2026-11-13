import type { Blog } from "../../../api";
import { useTranslation } from "../../../LangContext";
import Button from "../../ui/Button";
import styles from "./GlazeFilter.module.scss";
import { useSearch } from "../../../useSearch";

const glazeColors: Record<string, string> = {
  "runny white": "#f5f0e8",
  "white with seablue": "#a8c8d4",
  teal: "#2a8a8a",
  "dark blue": "#1a3a5c",
  "pink mint blue": "#c8a2c8",
  mint: "#98e8c8",
};

interface GlazeFilterProps {
  items: Blog[];
}

export default function GlazeFilter({ items }: GlazeFilterProps) {
  const glazes = [...new Set(items.flatMap((b) => b.glaze ?? []))].sort();
  const { query, setQuery } = useSearch();
  const { t } = useTranslation();

  if (glazes.length === 0) return null;

  return (
    <div className={styles.glazeFilter}>
      <p>{t("filterByColor")}</p>
      {glazes.map((glaze) => (
        <Button
          noStyles
          key={glaze}
          className={`${styles.dot}${glaze === query ? ` ${styles.active}` : ""}`}
          style={{ backgroundColor: glazeColors[glaze] || "#ccc" }}
          aria-label={glaze}
          aria-pressed={glaze === query}
          onClick={() => setQuery(glaze === query ? "" : glaze)}
        >
          &nbsp;
        </Button>
      ))}
    </div>
  );
}
