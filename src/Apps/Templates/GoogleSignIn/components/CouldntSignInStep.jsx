import React from "react";

const CouldntSignInStep = ({ onTryAgain }) => {
  return (
    <div
      className="right-side slide-in-right"
      style={{ paddingTop: "56px" }} // Added top padding to match other right-side components
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          left: "20px",
        }}
      >
        <p
          style={{
            fontSize: "16px", // Standard body text size
            color: "#e3e3e3",
            lineHeight: "1.6", // Good readability line height
            marginBottom: "24px", // Vertical gap before list
          }}
        >
          You didn't provide enough info for Google to be sure this account is
          really yours. Google asks for this info to keep your account secure.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#e3e3e3",
            marginBottom: "16px", // Gap before list items
          }}
        >
          If possible, when signing in:
        </p>

        <ul
          style={{
            color: "#e3e3e3",
            listStyleType: "disc", // Standard disc bullet points
            paddingLeft: "24px", // Left padding for bullet points indent
            marginBottom: "24px", // Vertical gap after list
            fontSize: "15px", // Slightly smaller than body text to match picture
            lineHeight: "1.6",
          }}
        >
          <li style={{ marginBottom: "8px" }}>
            Answer as many questions as you can
          </li>
          <li>Use a device where you've signed in before</li>
        </ul>

        <p
          style={{
            fontSize: "15px", // Matches list size
            color: "#e3e3e3",
            marginBottom: "16px",
            lineHeight: "1.6",
          }}
        >
          If your account is managed with Family Link, we’ve sent an email to
          your parent to change your password.
        </p>

        <a
          href="https://support.google.com/accounts/answer/7299973?hl=en" // Account recovery link
          target="_blank"
          style={{
            fontSize: "15px",
            color: "#a8c7fa", // Google's dark mode blue
            textDecoration: "none",
            fontWeight: "500", // Semi-bold font weight
            marginBottom: "32px", // Large gap before button
            width: "fit-content", // Only clickable text area
            marginLeft: "-6px", // Remove standard padding indent
            padding: "2px 6px",
            borderRadius: "4px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "rgba(168, 199, 250, .08)")
          } // Hover background
          onMouseLeave={(e) => (e.target.style.background = "transparent")} // Hover hide
        >
          More tips to recover your account
        </a>

        {/* Right-aligned bottom button */}
        <div
          className="bottom-buttons"
          style={{
            marginTop: "12px", // Vertical gap from text above
            display: "flex",
            justifyContent: "flex-end", // Align button to the right
          }}
        >
          <button
            type="button"
            className="next-btn"
            // Use parent function to handle click with loading
            onClick={onTryAgain}
            style={{
              background: "#a8c7fa", // Filled background blue
              border: "none",
              color: "#062e6f", // Dark text color for contrast
              height: "44px", // Full button height
              padding: "0 28px", // Horizontal padding
              borderRadius: "999px", // Pill-shaped button
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s", // Smooth color transitions
            }}
            onMouseEnter={(e) => (e.target.style.background = "#b9d3fb")} // Button hover color
            onMouseLeave={(e) => (e.target.style.background = "#a8c7fa")} // Button base color
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouldntSignInStep;
