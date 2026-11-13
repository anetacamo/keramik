import type { Blog } from "../api";
import { sortByDateDesc } from "./sortByDate";

export function isAvailable(blog: Blog): boolean {
  return Boolean(blog.stock && blog.stock > 0);
}

export function matchesTag(blog: Blog, tag: string): boolean {
  const lower = tag.toLowerCase();
  return blog.category.some((c) => c.toLowerCase() === lower);
}

export function matchesQuery(blog: Blog, query: string): boolean {
  if (!query) return true;
  const lower = query.toLowerCase();
  return (
    blog.title.toLowerCase().includes(lower) ||
    Boolean(blog.description?.toLowerCase().includes(lower)) ||
    (blog.glaze ?? []).some((g) => g.toLowerCase().includes(lower))
  );
}

export interface FilterBlogsOptions {
  tag?: string;
  query?: string;
  available?: boolean;
  glaze?: string;
  limit?: number;
}

export function filterBlogs(
  blogs: Blog[],
  options?: FilterBlogsOptions,
): Blog[] {
  let result = blogs;

  if (options?.tag) {
    result = result.filter((b) => matchesTag(b, options.tag!));
  }
  if (options?.query) {
    result = result.filter((b) => matchesQuery(b, options.query!));
  }
  if (options?.available) {
    result = result.filter(isAvailable);
  }
  if (options?.glaze) {
    result = result.filter((b) =>
      (b.glaze ?? []).some(
        (g) => g.toLowerCase() === options.glaze?.toLowerCase(),
      ),
    );
  }

  result = sortByDateDesc(result);

  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}
