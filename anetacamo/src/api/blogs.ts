export const API_BASE = "/api";
export const BLOGS_API = `${API_BASE}/blogs`;

export type Blog = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  category: string[];
  images: string[];
  skip?: boolean;
  likes: number;
  stock?: number;
  price?: number;
  glaze?: string[];
};

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(BLOGS_API);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlog(id: string): Promise<Blog> {
  const res = await fetch(`${BLOGS_API}/${id}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export function imageUrl(filename: string): string {
  return `${API_BASE}/images/${filename}`;
}

export async function likeBlog(id: string): Promise<Blog> {
  const res = await fetch(`${BLOGS_API}/${id}/like`, { method: "POST" });
  if (!res.ok) throw new Error(`Failed to like blog ${id}`);
  return res.json();
}
