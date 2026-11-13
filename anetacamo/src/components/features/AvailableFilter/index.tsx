import { useTranslation } from "../../../LangContext";
import Button from "../../ui/Button";
import styles from "./AvailableFilter.module.scss";

interface AvailableFilterProps {
  active: boolean;
  onChange: (active: boolean) => void;
}

export default function AvailableFilter({
  active,
  onChange,
}: AvailableFilterProps) {
  const { t } = useTranslation();
  return (
    <Button
      noStyles
      className={styles.filter}
      onClick={() => onChange(!active)}
      role="switch"
      aria-checked={active}
    >
      <span>{t("availableOnly")}</span>
      <div className={`${styles.toggle}${active ? ` ${styles.active}` : ""}`}>
        <div className={styles.knob} />
      </div>
    </Button>
  );
}
