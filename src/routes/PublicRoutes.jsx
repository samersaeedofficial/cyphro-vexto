import { Landing } from "@/Apps/Home/Landing";
import { ModuleInfo } from "@/Apps/Home/components/ModuleInfo";

export const PublicRoutes = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/info/:id",
    component: ModuleInfo,
  },
];
