import React, { useState, useRef } from "react";

const PasswordStep = ({ setStep, email, setIsLoading, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Password Verified! Moving to 2FA Step. Email:", email);
      setStep(3);
    }, 2000);
  };

  // Animated line dikhane ke liye naya handler
  const handleTryAnotherWay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4); // Animated line chalne ke baad Options layout par le jaye ga
    }, 2000); // 2 seconds tak animation dikhane ke liye
  };

  return (
    <div className="right-side slide-in-right">
      <form onSubmit={handlePasswordSubmit}>
        <div className="passkey-banner">
          <svg className="passkey-icon" viewBox="0 0 24 24">
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
          <span className="passkey-text">
            Select "Try another way" to use your passkey for an easier, more
            secure sign-in
          </span>
        </div>

        <p className="verify-text">To continue, first verify it’s you</p>

        <div
          className={`input-box ${isFocused || password ? "focused" : ""} ${error ? "error" : ""}`}
        >
          <input
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            disabled={isLoading}
          />
          <label>Enter your password</label>
        </div>

        {error && (
          <div className="error-text">
            <svg viewBox="0 0 24 24" className="error-icon">
              <circle cx="12" cy="12" r="10" />
              <rect x="11" y="7" width="2" height="6" fill="#0e0e0e" />
              <rect x="11" y="15" width="2" height="2" fill="#0e0e0e" />
            </svg>
            <span>Enter a password</span>
          </div>
        )}

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="custom-checkbox-input"
            disabled={isLoading}
          />
          <span className="custom-checkbox">
            <svg className="checkmark" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </span>
          <span className="checkbox-label">Show password</span>
        </label>

        <div className="bottom-buttons">
          <button
            type="button"
            className="try-another-way"
            onClick={handleTryAnotherWay}
            disabled={isLoading}
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

export default PasswordStep;
