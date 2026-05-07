import { PublicRoutes } from "./PublicRoutes";
import { AppRoutes } from "./AppRoutes";
import { ModuleRoutes } from "./ModuleRoutes";
import NotFound from "@/pages/NotFound";

export const allRoutes = [
  ...PublicRoutes,
  ...AppRoutes,
  ...ModuleRoutes,
  { component: NotFound },
];

export { PublicRoutes, AppRoutes, ModuleRoutes };
