import React, { useState } from "react";

const SomethingWrong = ({
  email,
  onTryAgain,
  setStep,
  setIsLoading,
  isLoading,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTryAgainHovered, setIsTryAgainHovered] = useState(false);

  // Try another way par click hone ka function jo animation chalaye ga
  const handleTryAnotherWay = () => {
    if (setIsLoading && setStep) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(4); // Options step par wapis le jaye ga
      }, 2000);
    }
  };

  return (
    <div
      className="right-side slide-in-right"
      style={{
        paddingTop: "0px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "360px",
        justifyContent: "space-between",
      }}
    >
      {/* Upper Content wrapper */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        {/* Custom Visual Image */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
            paddingLeft: "140px",
          }}
        >
          <div
            style={{ position: "relative", width: "240px", height: "140px" }}
          >
            <img
              src="/templates/something_wrong.png"
              alt="Something went wrong"
              style={{ width: "450px", height: "auto" }}
            />
          </div>
        </div>

        {/* Sub-header Content Column */}
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
              marginRight: "140px",
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
              maxWidth: "440px",
              marginLeft: "30px",
            }}
          >
            We weren't able to sign you in. Try again or try another way.
          </p>
        </div>
      </div>

      {/* Action Buttons Container */}
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
          onClick={handleTryAnotherWay}
          disabled={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered ? "rgba(168, 199, 250, 0.08)" : "transparent",
            border: "none",
            color: "#a8c7fa",
            fontSize: "14px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "500",
            padding: "10px 16px",
            borderRadius: "100px",
            opacity: isLoading ? 0.6 : 1,
            transition: "background-color 0.15s ease",
          }}
        >
          Try another way
        </button>

        <button
          type="button"
          onClick={onTryAgain}
          disabled={isLoading}
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
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "500",
            opacity: isLoading ? 0.6 : 1,
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
