import type { TranslationKey } from "./translations";
import Blog from "./components/pages/Blog";
import BlogDetail from "./components/pages/Blog/BlogDetail";
import Cart from "./components/pages/Cart";
import CV from "./components/pages/CV";
import Shop from "./components/pages/Shop";
import Tagged from "./components/pages/Tagged";
import Browse from "./components/pages/Browse";
import FormSubmits from "./components/pages/FormSubmits";

export interface SimpleRoute {
  path: string;
  labelKey: TranslationKey;
  component: () => React.JSX.Element;
}

export interface NestedRoute extends SimpleRoute {
  param: string;
  detail: () => React.JSX.Element;
}

export const languages = ["en", "dk"] as const;

export const simpleRoutes: SimpleRoute[] = [
  { path: "/", labelKey: "blog", component: Blog },
  { path: "/cart", labelKey: "cart", component: Cart },
  { path: "/cv", labelKey: "cv", component: CV },
  { path: "/shop", labelKey: "shop", component: Shop },
  { path: "/submissions", labelKey: "formSubmits", component: FormSubmits },
  { path: "/browse", labelKey: "browse", component: Browse },
  { path: "/tagged", labelKey: "tagged", component: Tagged },
];

export const nestedRoutes: NestedRoute[] = [
  {
    path: "/blog",
    labelKey: "blog",
    component: Blog,
    param: "$blogId",
    detail: BlogDetail,
  },
];

export const allRoutes = [...simpleRoutes, ...nestedRoutes];

export const menuRoutes = [
  ...[...simpleRoutes, ...nestedRoutes].filter(
    (r) => r.path !== "/" && r.path !== "/cv" && r.path !== "/browse",
  ),
];
