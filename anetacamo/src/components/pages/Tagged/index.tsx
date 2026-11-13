import { useTranslation } from "../../../LangContext";
import { useBlogs } from "../../../api";
import { CATEGORIES } from "../../../constants/categories";
import CategoryItem from "../../features/CategoryItem";
import CategoryTags from "../../ui/CategoryTags";
import LineDivider from "../../ui/LineDivider";
import LoadingText from "../../ui/LoadingText";

export default function Tagged() {
  const { t } = useTranslation();
  const { visible, isLoading } = useBlogs();

  if (isLoading) return <LoadingText centered />;

  return (
    <div className="carousel tagged">
      <h1 className="center">{t("tagged")}</h1>
      <CategoryItem categories={CATEGORIES} />
      <LineDivider />
      <CategoryTags items={visible} />
    </div>
  );
}
