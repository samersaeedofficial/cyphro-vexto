import React from "react";

const LeftSection = () => {
  return (
    <div className="w-full lg:w-[55%] relative flex flex-col p-8 lg:p-16 border-r border-gray-100 min-h-[500px] lg:min-h-screen">
      {/* Facebook Logo */}
      <div className="mb-4">
        <svg viewBox="0 0 36 36" className="w-12 h-12 fill-[#0866FF]">
          <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h-3v-5h3v-3.671C14 19.58 17.58 18 20.35 18H23v5h-2.148C19.86 23 19 23.753 19 25.109V29h4l-1 5h-3v1.87z" />
        </svg>
      </div>

      {/* Hero Typography */}
      <div className="z-10 mt-auto pb-10">
        <h1 className="text-[3.5rem] lg:text-[4.5rem] font-bold tracking-tight text-[#1C1E21] leading-[1.05]">
          Explore
          <br />
          the
          <br />
          things
          <br />
          <span className="text-[#0866FF]">you love.</span>
          <span className="text-black">.</span>
        </h1>
      </div>

      {/* Overlapping Image Collage Area */}
      <div className="absolute top-10 right-4 w-[70%] h-[70%] pointer-events-none hidden md:block">
        {/* Top Left - Laughing Emoji */}
        <div className="absolute top-[15%] left-[5%] text-5xl drop-shadow-md z-20">
          😆
        </div>

        {/* Middle Left - Blue Knot Pillow */}
        <div className="absolute top-[25%] left-[10%] w-[180px] h-[180px] bg-[#EAE2D8] rounded-3xl overflow-hidden shadow-sm z-10 border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1584100936595-c0654b355040?w=300&q=80"
            alt="Knot Pillow"
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md p-1.5 rounded-lg">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
            </svg>
          </div>
        </div>

        {/* Main Tall Image - Skateboarder */}
        <div className="absolute top-[10%] right-[10%] w-[260px] h-[400px] rounded-[2rem] overflow-hidden shadow-xl z-0 border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=500&q=80"
            alt="Skateboarder"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-indigo-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full"></div> 16:45
          </div>
          {/* UI Overlay dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-12 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Left - Tickets */}
        <div className="absolute bottom-[5%] left-[20%] w-[160px] bg-white rounded-3xl shadow-xl z-20 border border-gray-100 p-2 pb-6">
          <div className="absolute -top-3 left-3 bg-[#0866FF] text-white p-1.5 rounded-lg shadow-md z-30">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <div className="w-full h-[120px] bg-red-100 rounded-2xl overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80"
              alt="Tickets"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-2 space-y-2">
            <div className="w-full h-2 bg-gray-100 rounded-full"></div>
            <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Center - Profile Circle */}
        <div className="absolute bottom-[2%] left-[45%] w-[100px] h-[100px] rounded-full border-[5px] border-[#0866FF] overflow-hidden shadow-2xl z-30">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Heart Button */}
        <div className="absolute bottom-[18%] right-[22%] w-14 h-14 bg-[#FF0054] rounded-full flex items-center justify-center shadow-lg z-20 shadow-pink-500/30">
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
