import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Popover.module.scss";

interface PopoverProps {
  text: string;
  className?: string;
}

export default function Popover({ text, className }: PopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [placement, setPlacement] = useState<"top" | "bottom">("top");

  useLayoutEffect(() => {
    function updatePlacement() {
      const tooltipRect = ref.current?.getBoundingClientRect();
      const parentRect = ref.current?.parentElement?.getBoundingClientRect();
      if (!tooltipRect || !parentRect) return;

      const spaceNeeded = tooltipRect.height + 8;
      setPlacement(parentRect.top < spaceNeeded ? "bottom" : "top");
    }

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [text]);

  return (
    <div
      ref={ref}
      className={`${styles.popover} ${styles[placement]} ${className ?? ""}`}
    >
      {text}
    </div>
  );
}
