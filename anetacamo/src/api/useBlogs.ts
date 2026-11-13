import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./blogs";

export function useBlogs() {
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
  const visible = blogs.filter((b) => !b.skip);
  return { blogs, visible, isLoading, error };
}
