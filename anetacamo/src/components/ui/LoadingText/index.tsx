import { useTranslation } from "../../../LangContext";

interface LoadingTextProps {
  centered?: boolean;
}

export default function LoadingText({ centered = false }: LoadingTextProps) {
  const { t } = useTranslation();
  return <p className={centered ? "center" : undefined}>{t("loading")}</p>;
}
