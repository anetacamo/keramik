import { useTheme } from "../../../ThemeContext";
import Button from "../../ui/Button";
import styles from "./ThemeSwitcher.module.scss";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button noStyles onClick={toggleTheme} aria-label="Toggle theme">
      <span className={styles.themeIcon}>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </Button>
  );
}
