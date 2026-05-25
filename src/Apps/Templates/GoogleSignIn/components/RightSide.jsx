import React, { useState, useEffect, useRef } from "react";

const RightSide = ({
  step,
  setStep,
  email,
  setEmail,
  setIsLoading,
  isLoading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  // Step 2 (Password) States
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);
  const createMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target)
      ) {
        setShowCreateMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 2000);
  };

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
      console.log("Login Success! Email:", email, "Pass:", password);
    }, 2000);
  };

  // STEP 1 UI (EMAIL)
  if (step === 1) {
    return (
      <div className="right-side">
        <form onSubmit={handleEmailSubmit}>
          <div
            className={`input-box ${isFocused || email ? "focused" : ""} ${error ? "error" : ""}`}
          >
            <input
              ref={inputRef}
              type="text"
              value={email}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(false);
              }}
            />
            <label>Email or phone</label>
          </div>

          {error && (
            <div className="error-text">
              <svg viewBox="0 0 24 24" className="error-icon">
                <circle cx="12" cy="12" r="10" />
                <rect x="11" y="7" width="2" height="6" fill="#0e0e0e" />
                <rect x="11" y="15" width="2" height="2" fill="#0e0e0e" />
              </svg>
              <span>Enter an email or phone number</span>
            </div>
          )}

          <a href="/" className="forgot-link">
            Forgot email?
          </a>

          <p className="guest-text">
            Not your computer? Use Guest mode to sign in privately.
            <a href="/"> Learn more about using Guest mode</a>
          </p>

          <div className="bottom-buttons">
            <div className="create-account-wrapper" ref={createMenuRef}>
              <button
                type="button"
                className={`create-btn ${showCreateMenu ? "active" : ""}`}
                onClick={() => setShowCreateMenu(!showCreateMenu)}
              >
                Create account
              </button>

              {showCreateMenu && (
                <div className="create-menu">
                  <ul>
                    <li>For my personal use</li>
                    <li>For my child</li>
                    <li>For work or my business</li>
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="next-btn" disabled={isLoading}>
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // STEP 2 UI (PASSWORD)
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
          />
          <span className="custom-checkbox">
            <svg className="checkmark" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </span>
          <span className="checkbox-label">Show password</span>
        </label>

        <div className="bottom-buttons">
          <button type="button" className="try-another-way">
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

export default RightSide;
