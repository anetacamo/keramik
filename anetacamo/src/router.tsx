import {
  createRootRoute,
  createRoute,
  createRouter,
  NotFoundRoute,
} from "@tanstack/react-router";
import App from "./App";
import { simpleRoutes, nestedRoutes, allRoutes } from "./routes";
import NotFound from "./components/pages/NotFound";

const rootRoute = createRootRoute({ component: App });

const langRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$lang",
});

const simpleChildren = allRoutes
  .filter((r): r is (typeof simpleRoutes)[number] => !("param" in r))
  .map(({ path, component }) =>
    createRoute({ getParentRoute: () => langRoute, path, component }),
  );

const nestedChildren = nestedRoutes.map(
  ({ path, component, param, detail }) => {
    const parent = createRoute({ getParentRoute: () => langRoute, path });
    return parent.addChildren([
      createRoute({ getParentRoute: () => parent, path: "/", component }),
      createRoute({
        getParentRoute: () => parent,
        path: param,
        component: detail,
      }),
    ]);
  },
);

const routeTree = rootRoute.addChildren([
  langRoute.addChildren([...simpleChildren, ...nestedChildren]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

export const router = createRouter({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
