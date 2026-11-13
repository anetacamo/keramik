import type { ReactNode } from "react";
import DotDivider from "../../ui/DotDivider";
import LineDivider from "../../ui/LineDivider";

interface ShopSectionProps {
  title: string;
  children: ReactNode;
  active?: number[];
}

export default function ShopSection({
  title,
  children,
  active,
}: ShopSectionProps) {
  return (
    <div>
      <LineDivider />
      <DotDivider active={active} />
      <h2>{title}</h2>
      {children}
    </div>
  );
}
