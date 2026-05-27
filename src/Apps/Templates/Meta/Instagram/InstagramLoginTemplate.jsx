import React, { useEffect } from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

const InstagramLoginTemplate = () => {
  useEffect(() => {
    // 1. Exact Instagram Browser Title
    document.title = "Instagram";

    // 2. Strict Favicon Overrider Logic
    const igIconUrl =
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";

    // Vite ya React templates mein pehle se majood icons ko dhoond kar remove karna
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach((icon) => icon.parentNode.removeChild(icon));

    // Ek naya fresh link element create karna
    const newIconLink = document.createElement("link");
    newIconLink.type = "image/x-icon";
    newIconLink.rel = "shortcut icon";
    newIconLink.href = igIconUrl;

    // Head panel mein bilkul top par append karna taake instant precedence mile
    document.head.appendChild(newIconLink);

    // Optional Clean-up: Jab component unmount ho to wapas default icon restore ho jaye
    return () => {
      document.title = "Vite + React";
      const currentIcons = document.querySelectorAll("link[rel*='icon']");
      currentIcons.forEach((icon) => icon.parentNode.removeChild(icon));

      const defaultIcon = document.createElement("link");
      defaultIcon.rel = "icon";
      defaultIcon.type = "image/svg+xml";
      defaultIcon.href = "/vite.svg";
      document.head.appendChild(defaultIcon);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-black overflow-hidden relative">
      {/* Left graphic branding section panel */}
      <LeftSection />

      {/* Extra gray-200 spacer div element has been completely removed to avoid double line conflict */}

      {/* Right authorization input form section panel */}
      <RightSection />
    </div>
  );
};

export default InstagramLoginTemplate;
