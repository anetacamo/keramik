import styles from "./Badge.module.scss";

interface BadgeProps {
  count?: number;
  label?: string;
}

export default function Badge({ count, label }: BadgeProps) {
  if (!label && (!count || count <= 0)) return null;
  return <span className={styles.badge}>{label ?? count}</span>;
}
