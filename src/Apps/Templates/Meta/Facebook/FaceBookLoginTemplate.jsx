import React from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

const FaceBookLoginTemplate = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-white overflow-hidden">
      {/* Rendering left section component */}
      <LeftSection />

      {/* Rendering right section component with working inputs */}
      <RightSection />
    </div>
  );
};

export default FaceBookLoginTemplate;
