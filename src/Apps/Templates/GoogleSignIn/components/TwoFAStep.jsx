import React, { useState, useRef, useEffect } from "react";

const TwoFAStep = ({ setStep, email, setIsLoading, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [trustDevice, setTrustDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, []);

  const handleTwoFASubmit = (e) => {
    e.preventDefault();
    if (!code.trim() || code.length < 6) {
      setError(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(
        "2FA Verification Success! Email:",
        email,
        "Code Entered:",
        code,
        "Device Trusted:",
        trustDevice,
      );
    }, 2000);
  };

  return (
    <div className="right-side slide-in-right">
      <form onSubmit={handleTwoFASubmit}>
        <h6
          style={{
            fontSize: "26px",
            fontWeight: "400",
            letterSpacing: "-0.5px",
            marginBottom: "15px",
          }}
        >
          2-Step Verification
        </h6>
        <p
          className="left-side-text"
          style={{
            fontSize: "15px",
            color: "#e3e3e3",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          Enter one of your 8-digit backup codes
        </p>

        <div
          className={`input-box ${isFocused || code ? "focused" : ""} ${error ? "error" : ""}`}
          style={{ marginBottom: "0px" }}
        >
          <input
            ref={inputRef}
            type="text"
            maxLength={8}
            value={code}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, ""));
              if (error) setError(false);
            }}
          />
          <label>Enter a backup code</label>
        </div>

        {/* Error text ko input line se vertically nichay clear area me shift kiya */}
        {error ? (
          <div
            className="error-text"
            style={{
              marginTop: "16px", // Vertically thora nichay kiya taake field ke bilkul andar wrap na ho
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f2b8b5",
              fill: "#f2b8b5",
              fontSize: "13px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="error-icon"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>Enter a code</span>
          </div>
        ) : (
          <div style={{ height: "32px" }} />
        )}

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

        <div className="bottom-buttons" style={{ marginTop: "12px" }}>
          <button
            type="button"
            className="try-another-way"
            onClick={() => setStep(2)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              background: "none",
              border: "none",
              color: "#a8c7fa",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "500",
              backgroundColor: isHovered
                ? "rgba(168, 199, 250, 0.12)"
                : "transparent",
              padding: "8px 16px",
              borderRadius: "100px",
              marginLeft: "-16px",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
          >
            Try another way
          </button>
          <button type="submit" className="next-btn" disabled={isLoading}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFAStep;
