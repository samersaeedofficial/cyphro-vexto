import React from "react";

const LeftSection = () => {
  return (
    <div className="w-full lg:w-[55%] min-h-[700px] lg:min-h-screen bg-white flex items-center justify-center p-4 lg:p-8 overflow-hidden hidden lg:block">
      {/* 1. bg-white: Yeh color image ke background se exact 1:1 blend ho jayega, seamless look ke liye.
        2. max-w-[720px] & max-h-[560px]: Dimensions barha di hain taake size perfectly bada aur sharp dikhe.
      */}
      <div className="w-full h-full max-w-[750px] max-h-[700px] flex items-center justify-center">
        <img
          src="/templates/facebook_rightside.png"
          alt="Facebook Leftside Preview"
          className="w-full h-full object-contain antialiased"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default LeftSection;
