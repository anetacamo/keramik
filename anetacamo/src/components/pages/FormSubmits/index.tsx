import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../../../api";
import { useTranslation } from "../../../LangContext";
import { formatDate } from "../../../helpers/formatDate";
import { calculateTotal } from "../../../helpers/calculateTotal";
import DotDivider from "../../ui/DotDivider";
import Badge from "../../ui/Badge";
import AdminGate from "../../features/AdminGate";
import Button from "../../ui/Button";
import LoadingText from "../../ui/LoadingText";
import {
  SUBMISSION_STATUSES,
  type SubmissionStatus,
} from "../../../constants/submissionStatuses";
import styles from "./FormSubmits.module.scss";

export default function FormSubmits() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      updateSubmissionStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSubmission(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });

  return (
    <AdminGate>
      <div>
        <DotDivider />
        <h2>{t("formSubmits")}</h2>
        {isLoading && <LoadingText />}
        <ul className={styles.formList}>
          {submissions.map((s) => {
            const unresolvedIndex =
              s.status === "unresolved" || !s.status
                ? submissions
                    .filter((sub) => sub.status === "unresolved" || !sub.status)
                    .indexOf(s) + 1
                : null;

            return (
              <li key={s.id} className={styles.submissionItem}>
                <div className={styles.bagIconWrapper}>
                  <img
                    src="/images/shopping_bag.png"
                    alt="bag"
                    className={styles.bagIcon}
                  />
                  {unresolvedIndex && <Badge count={unresolvedIndex} />}
                </div>
                <div>
                  {s.message && <p className={styles.message}>{s.message}</p>}
                  <p>
                    <strong>{s.name}</strong> {s.email}
                    <i>
                      {" "}
                      {t("onDate")} {formatDate(s.createdAt)}
                    </i>
                  </p>
                  <p>
                    <strong>{s.type}</strong>{" "}
                    <i className="purple">
                      {s.cartItems.length} {t("items")}{" "}
                    </i>
                    {calculateTotal(s.cartItems)} dkk
                  </p>
                  <p className={styles.actions}>
                    <strong>{t("status")}</strong>
                    {SUBMISSION_STATUSES.map((status) => (
                      <Button
                        noStyles
                        key={status}
                        className={
                          s.status === status
                            ? styles.activeStatus
                            : styles.action
                        }
                        onClick={() =>
                          statusMutation.mutate({ id: s.id, status })
                        }
                      >
                        {status}
                      </Button>
                    ))}{" "}
                    ||
                    <Button
                      noStyles
                      className={styles.deleteAction}
                      onClick={() => deleteMutation.mutate(s.id)}
                    >
                      {t("delete")}
                    </Button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AdminGate>
  );
}
