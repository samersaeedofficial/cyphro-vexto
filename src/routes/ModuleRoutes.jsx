import { ModulePage } from "@/Apps/Modules/ModulePage";
import WifiAnalyzer from "@/Apps/Modules/Wifi&Network/WifiAnalyzer/WifiAnalyzer";
import WordlistGen from "@/Apps/Modules/Password&Auth/WordlistGen/WordlistGen";
import PasswordCracker from "@/Apps/Modules/Password&Auth/PasswordCracker/PasswordCracker";
import PhishingManager from "@/Apps/Modules/SocialEngineering/PhishingManager/PhishingManager";
import GoogleSignInTemplate from "@/Apps/Templates/GoogleSignIn/GoogleSignInTemplate";
import FaceBookLoginTemplate from "@/Apps/Templates/Meta/Facebook/FaceBookLoginTemplate";
import InstagramLoginTemplate from "@/Apps/Templates/Meta/Instagram/InstagramLoginTemplate";
import MicrosoftLoginTemplate from "@/Apps/Templates/Microsoft/MicrosoftLoginTemplate";

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
    path: "/modules/phishing",
    component: PhishingManager,
  },
  {
    path: "/template/google-signin",
    component: GoogleSignInTemplate,
  },
  {
    path: "/template/facebook-login",
    component: FaceBookLoginTemplate,
  },
  {
    path: "/template/instagram-login",
    component: InstagramLoginTemplate,
  },
  {
    path: "/template/microsoft-login",
    component: MicrosoftLoginTemplate,
  },
  {
    path: "/modules/:id",
    component: ModulePage,
  },
];
