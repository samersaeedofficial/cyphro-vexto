import React, { useState, useEffect, useRef } from "react";

const EmailStep = ({ setStep, email, setEmail, setIsLoading, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

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
          <a
            href="https://support.google.com/chrome/answer/6130773?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Learn more about using Guest mode
          </a>
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
};

export default EmailStep;
