export interface CategoryMeta {
  id: string;
  title?: string;
  text?: string;
  image?: string;
  shop?: boolean;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "ceramics",
    title: "Handbuilt ceramics",
    text: "Every single piece is one of a kind formed by a hand\nWhen one is sold, its gone for good. If you have specific requests, please let me know!",
    image: "09.webp",
    shop: true,
  },
  {
    id: "prints",
    image: "21.png",
    shop: true,
  },
  {
    id: "linoleum",
    image: "23.png",
    shop: true,
  },
  {
    id: "bowl",
    image: "99.png",
  },
  {
    id: "cup",
    image: "53.jpg",
  },
  {
    id: "pot",
    image: "98.png",
  },
];
