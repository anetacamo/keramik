import { useState, type FormEvent, type ReactNode } from "react";
import { getAdminToken, setAdminToken } from "../../../helpers/auth";
import { useTranslation } from "../../../LangContext";
import { fetchSubmissions } from "../../../api";
import Button from "../../ui/Button";
import styles from "./AdminGate.module.scss";

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [authenticated, setAuthenticated] = useState(!!getAdminToken());
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get("token") as string;

    setAdminToken(token);

    try {
      await fetchSubmissions();
      setAuthenticated(true);
      setError(false);
    } catch {
      setError(true);
      setAdminToken("");
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className={styles.gate}>
      <p>{t("enterAdminToken")}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="password"
            name="token"
            placeholder="Token"
            className="large"
            autoFocus
            aria-label={t("enterAdminToken")}
          />
          <Button type="submit">{t("enter")}</Button>
        </div>
      </form>
      {error && <p className={styles.error} role="alert">{t("invalidToken")}</p>}
    </div>
  );
}
