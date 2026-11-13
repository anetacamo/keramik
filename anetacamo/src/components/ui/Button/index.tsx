import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  noStyles?: boolean;
  active?: boolean;
}

export default function Button({
  children,
  noStyles = false,
  active = false,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const base = noStyles ? styles.noStyles : styles.button;
  const classes = [base, active && styles.active, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
