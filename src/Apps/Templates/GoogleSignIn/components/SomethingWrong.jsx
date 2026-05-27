import React, { useState } from "react";

const SomethingWrong = ({ email, onTryAgain }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTryAgainHovered, setIsTryAgainHovered] = useState(false);

  return (
    <div
      className="right-side slide-in-right"
      style={{
        paddingTop: "0px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "360px", // UI blocks ko separate rakhne ke liye vertical height
        justifyContent: "space-between",
      }}
    >
      {/* Upper Content wrapper: Illustration on top, text underneath */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Horizontal center alignment
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        {/* Custom Visual Vector Illustration (Pencil Design) - Renders on Top */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px", // Illustration aur text ke darmiyan space
            paddingLeft: "140px", // Pencil ko right side push karne ke liye taaki text center me balance lage
          }}
        >
          <div
            style={{ position: "relative", width: "240px", height: "140px" }}
          >
            <svg
              viewBox="0 0 200 150"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              {/* Horizontal baseline canvas */}
              <line
                x1="10"
                y1="110"
                x2="110"
                y2="110"
                stroke="#444746"
                strokeWidth="1.5"
              />
              <line
                x1="130"
                y1="110"
                x2="150"
                y2="110"
                stroke="#444746"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <line
                x1="160"
                y1="110"
                x2="180"
                y2="110"
                stroke="#444746"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* Broken pencil tip on ground */}
              <path d="M 111 106 L 115 110 L 109 110 Z" fill="#C4C7C5" />

              {/* Action/Impact sparks lines */}
              <line
                x1="80"
                y1="90"
                x2="70"
                y2="75"
                stroke="#8E918F"
                strokeWidth="1.5"
              />
              <line
                x1="100"
                y1="95"
                x2="102"
                y2="80"
                stroke="#8E918F"
                strokeWidth="1.5"
              />
              <line
                x1="88"
                y1="103"
                x2="74"
                y2="101"
                stroke="#8E918F"
                strokeWidth="1.5"
              />

              {/* Main Diagonal Pencil Body */}
              <g transform="translate(110, 105) rotate(-42)">
                {/* Wooden Cone Tip */}
                <path d="M 0 0 L 15 -10 L 15 10 Z" fill="#F5CCA0" />
                {/* Lead Tip inside cone */}
                <path d="M 0 0 L 5 -3.3 L 5 3.3 Z" fill="#444746" />

                {/* Pencil Body Shaft */}
                <path
                  d="M 15 -10 L 100 -10 L 100 10 L 15 10 Z"
                  fill="#FABD05"
                />
                {/* Pencil Inner Strips for depth */}
                <path d="M 15 -3 L 100 -3 L 100 3 L 15 3 Z" fill="#EA9B00" />

                {/* Metallic Eraser Ring Holder */}
                <path
                  d="M 100 -10 L 112 -10 L 112 10 L 100 10 Z"
                  fill="#A8C7FA"
                />
                {/* Pink Eraser Tip */}
                <path
                  d="M 112 -10 L 120 -10 C 124 -10 124 10 120 10 L 112 10 Z"
                  fill="#F28B82"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Sub-header Content Column - Placed directly below the illustration */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "400",
              color: "#e3e3e3",
              marginBottom: "16px",
              fontFamily: "inherit",
              letterSpacing: "0.2px",
              marginRight: "140px", // Text ko center se left side par shift karne ke liye margin property
            }}
          >
            2-Step Verification
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "#c4c7c5",
              lineHeight: "1.5",
              marginBottom: "0px",
              maxWidth: "440px", // Text layout wider lagay image ki tarah
              marginLeft: "30px",
            }}
          >
            We weren't able to sign you in. Try again or try another way.
          </p>
        </div>
      </div>

      {/* Action Buttons Container Aligned Strictly to Bottom Right */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              console.log("Routing back to try another way options");
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered ? "rgba(168, 199, 250, 0.08)" : "transparent",
            border: "none",
            color: "#a8c7fa",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
            padding: "10px 16px",
            borderRadius: "100px",
            transition: "background-color 0.15s ease",
          }}
        >
          Try another way
        </button>

        <button
          type="button"
          onClick={onTryAgain}
          onMouseEnter={() => setIsTryAgainHovered(true)}
          onMouseLeave={() => setIsTryAgainHovered(false)}
          style={{
            background: isTryAgainHovered ? "#b9d3fb" : "#a8c7fa",
            border: "none",
            color: "#062e6f",
            height: "40px",
            padding: "0 24px",
            borderRadius: "100px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default SomethingWrong;
