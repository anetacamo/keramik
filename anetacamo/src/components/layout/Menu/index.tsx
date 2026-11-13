import styles from "./Menu.module.scss";
import Logo from "../Logo";
import MenuLinks from "../MenuLinks";
import SearchField from "../SearchField";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import CartIcon from "../CartIcon";

export default function Menu() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <div className={styles.middleNav}>
        <MenuLinks />
        <SearchField />
      </div>
      <div className={styles.rightMenu}>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <CartIcon />
      </div>
    </nav>
  );
}
