import { useTranslation } from "../../../LangContext";

export default function CV() {
  const { t } = useTranslation();
  return <h1>{t("cv")}</h1>;
}
