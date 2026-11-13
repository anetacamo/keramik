import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { menuRoutes } from "../../../routes";
import { useTranslation } from "../../../LangContext";
import { fetchSubmissions } from "../../../api";
import { getAdminToken } from "../../../helpers/auth";
import Badge from "../../ui/Badge";
import styles from "./MenuLinks.module.scss";

export default function MenuLinks() {
  const { t, lang } = useTranslation();
  const isAdmin = !!getAdminToken();
  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
    enabled: isAdmin,
  });
  const unresolvedCount = submissions.filter(
    (s) => s.status === "unresolved" || !s.status,
  ).length;

  return (
    <div>
      {menuRoutes.map((route) => {
        if (route.path === "/submissions" && !isAdmin) return null;
        return (
          <Link
            key={route.path}
            className={styles.menuLink}
            to={`/$lang${route.path}`}
            params={{ lang }}
          >
            <span
              className={
                route.path === "/submissions"
                  ? styles.menuItemWithBadge
                  : undefined
              }
            >
              {t(route.labelKey)}
              {route.path === "/submissions" && (
                <Badge count={unresolvedCount} />
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
