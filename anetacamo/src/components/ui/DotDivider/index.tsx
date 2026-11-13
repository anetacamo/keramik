import styles from "./DotDivider.module.scss";

interface DotDividerProps {
  count?: number;
  active?: number[];
}

export default function DotDivider({ count = 3, active }: DotDividerProps) {
  return (
    <div className={styles.divider}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`${styles.dot}${active?.includes(i) ? ` ${styles.active}` : ""}`}
        ></div>
      ))}
    </div>
  );
}
