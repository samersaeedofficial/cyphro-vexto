import React, { useState } from "react";
import { User } from "lucide-react";
import { CircleHelp } from "lucide-react";

// -- NEW: added onOptionClick prop --
const AnotherWayStep = ({ setStep, email, onOptionClick }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    {
      id: "backup_code",
      title: "Enter one of your 8-digit backup codes",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"
          />
        </svg>
      ),
      // -- CHANGED: Call onOptionClick function --
      action: onOptionClick,
    },
    {
      id: "passkey",
      title: "Use your passkey",
      icon: <User />,
      // -- CHANGED: Call onOptionClick function --
      action: onOptionClick,
    },
    {
      id: "try_another",
      title: "Try another way",
      icon: <CircleHelp />,
      // -- CHANGED: Call onOptionClick function --
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
          left: "20px",
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
          }}
        >
          Choose how you want to sign in:
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
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
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #444746",
                  backgroundColor: isHovered
                    ? "rgba(227, 227, 227, 0.08)"
                    : "transparent",
                  borderRadius: "15px",
                  transition: "background-color 0.15s ease",
                  marginLeft: "-12px",
                  marginRight: "-12px",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    color: "#a8c7fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {option.icon}
                </div>

                <span
                  style={{
                    fontSize: "15px",
                    color: "#e3e3e3",
                    fontWeight: "400",
                    fontFamily: "'Google Sans', sans-serif",
                  }}
                >
                  {option.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnotherWayStep;
