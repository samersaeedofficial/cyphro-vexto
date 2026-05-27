import React, { useState } from "react";
import { User, CircleHelp } from "lucide-react";

const AnotherWayStep = ({ setStep, email, onOptionClick }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    {
      id: "backup_code",
      title: "Enter one of your 8-digit backup codes",
      subtitle: null,
      isLarge: false,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"
          />
        </svg>
      ),
      action: onOptionClick,
    },
    {
      id: "passkey",
      title: "Use your passkey",
      subtitle: null,
      isLarge: false,
      icon: <User size={24} />,
      action: onOptionClick,
    },
    {
      id: "security_code",
      title: "Get a one-time security code",
      subtitle:
        "Sign in on another device with your security key to get a code",
      isLarge: true, // Specific flag for higher height
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z"
          />
        </svg>
      ),
      action: onOptionClick,
    },
    {
      id: "try_another",
      title: "Try another way",
      subtitle: null,
      isLarge: false,
      icon: <CircleHelp size={24} />,
      action: onOptionClick,
    },
  ];

  return (
    <div className="right-side slide-in-right">
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          position: "relative",
          paddingLeft: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "400",
            color: "#e3e3e3",
            marginTop: "24px",
            marginBottom: "24px",
            fontFamily: "'Google Sans', sans-serif",
            letterSpacing: "0.1px",
            marginLeft: "20px",
          }}
        >
          Choose how you want to sign in:
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {options.map((option) => {
            const isHovered = hoveredOption === option.id;
            return (
              <div
                key={option.id}
                onClick={() => onOptionClick(option.id)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  paddingTop: option.isLarge ? "20px" : "15px",
                  paddingBottom: option.isLarge ? "20px" : "15px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  cursor: "pointer",
                  userSelect: "none",
                  backgroundColor: isHovered
                    ? "rgba(227, 227, 227, 0.08)"
                    : "transparent",
                  borderRadius: "15px",
                  transition: "background-color 0.15s ease",
                  // Decreased margins to reduce vertical gap between hover area and lines
                  marginBottom: "1px",
                  marginTop: "1px",
                }}
              >
                {/* Icon Section */}
                <div
                  style={{
                    color: "#a8c7fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {option.icon}
                </div>

                {/* Text Content Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    flexGrow: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#e3e3e3",
                      fontWeight: "400",
                      fontFamily: "'Google Sans', sans-serif",
                    }}
                  >
                    {option.title}
                  </span>
                  {option.subtitle && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#9aa0a6",
                        fontWeight: "400",
                        fontFamily: "'Google Sans', sans-serif",
                      }}
                    >
                      {option.subtitle}
                    </span>
                  )}
                </div>

                {/* Pure Horizontal Border Line - Adjusted position to perfectly align with tight margins */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: "16px",
                    right: "16px",
                    borderBottom: "1px solid #444746",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnotherWayStep;
