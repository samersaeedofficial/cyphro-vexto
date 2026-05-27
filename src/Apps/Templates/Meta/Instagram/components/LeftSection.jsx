import React from "react";

const LeftSection = () => {
  return (
    /* Yahan humne 'bg-black' ko hata kar exact hex code '#0c1017' lagaya hai 
      jo aapki image ke background ka real color hai. 
    */
    <div className="w-full lg:w-[55%] min-h-[700px] lg:min-h-screen bg-[#0c1017] flex items-center justify-center p-4 lg:p-8 overflow-hidden hidden lg:block">
      <div className="w-full h-full max-w-[800px] max-h-[750px] flex items-center justify-center">
        <img
          src="/templates/instagram_rightside.png"
          alt="Instagram Leftside Preview"
          className="w-full h-full object-contain antialiased"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default LeftSection;
