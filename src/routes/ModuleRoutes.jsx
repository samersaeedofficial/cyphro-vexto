import { ModulePage } from "@/Apps/Modules/ModulePage";
import WifiAnalyzer from "@/Apps/Modules/Wifi&Network/WifiAnalyzer/WifiAnalyzer";
import WordlistGen from "@/Apps/Modules/Password&Auth/WordlistGen/WordlistGen";
import PasswordCracker from "@/Apps/Modules/Password&Auth/PasswordCracker/PasswordCracker";

export const ModuleRoutes = [
  {
    path: "/modules/wifi-analyzer",
    component: WifiAnalyzer,
  },
  {
    path: "/modules/wordlist-generator",
    component: WordlistGen,
  },
  {
    path: "/modules/password-cracker",
    component: PasswordCracker,
  },
  {
    path: "/modules/:id",
    component: ModulePage,
  },
];
