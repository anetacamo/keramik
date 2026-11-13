import type { Blog } from "../api";

export function sortByDateDesc(blogs: Blog[]): Blog[] {
  return [...blogs].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
}
