import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeBlog } from "../../../api";
import { useTranslation } from "../../../LangContext";
import Button from "../../ui/Button";
import Popover from "../../ui/Popover";
import styles from "./Like.module.scss";

interface LikeProps {
  blogId: string;
  likes: number;
  floating?: boolean;
}

export default function Like({ blogId, likes, floating }: LikeProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => likeBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Button
      noStyles
      className={`${styles.like} ${floating ? styles.floating : ""}`}
      onClick={handleClick}
      disabled={isPending}
      aria-label={`Like, ${likes} likes`}
    >
      ♥ {likes}
      <Popover text={t("giveLike")} className={styles.popover} />
    </Button>
  );
}
