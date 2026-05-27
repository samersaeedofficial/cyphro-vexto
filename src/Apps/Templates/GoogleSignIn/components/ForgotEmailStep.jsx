import React, { useState, useRef } from "react";

const ForgotEmailStep = ({ step, setStep, setIsLoading, isLoading }) => {
  // Step 8 States (Phone/Email)
  const [isFocusedRecovery, setIsFocusedRecovery] = useState(false);
  const [recoveryError, setRecoveryError] = useState(false);
  const [recoveryValue, setRecoveryValue] = useState("");
  const recoveryInputRef = useRef(null);

  // Step 9 States (Name)
  const [isFocusedFirst, setIsFocusedFirst] = useState(false);
  const [isFocusedLast, setIsFocusedLast] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const firstNameRef = useRef(null);

  // Jab user Email form par Next click kare
  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (!recoveryValue.trim()) {
      setRecoveryError(true);
      if (recoveryInputRef.current) recoveryInputRef.current.focus();
      return;
    }

    setRecoveryError(false);
    setIsLoading(true);
    // 1.5 seconds loading animation ke baad Name (Step 9) par jaye
    setTimeout(() => {
      setIsLoading(false);
      setStep(9);
    }, 1500);
  };

  // Jab user Name form par Next click kare
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setNameError(true);
      if (firstNameRef.current) firstNameRef.current.focus();
      return;
    }

    setNameError(false);
    setIsLoading(true);
    // Loading ke baad wapis Sign in step (Step 1) ya next process par le jaye
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
    }, 2000);
  };

  // ----------------------------------------------------
  // VIEW 1: Phone / Email Form (Step 8)
  // ----------------------------------------------------
  if (step === 8) {
    return (
      <div className="right-side slide-in-right">
        <form onSubmit={handleRecoverySubmit}>
          <div
            className={`input-box ${isFocusedRecovery || recoveryValue ? "focused" : ""} ${recoveryError ? "error" : ""}`}
          >
            <input
              ref={recoveryInputRef}
              type="text"
              value={recoveryValue}
              onFocus={() => setIsFocusedRecovery(true)}
              onBlur={() => setIsFocusedRecovery(false)}
              onChange={(e) => {
                setRecoveryValue(e.target.value);
                if (recoveryError) setRecoveryError(false);
              }}
              disabled={isLoading}
            />
            <label>Phone number or email</label>
          </div>

          {recoveryError && (
            <div className="error-text">
              <svg viewBox="0 0 24 24" className="error-icon">
                <circle cx="12" cy="12" r="10" />
                <rect x="11" y="7" width="2" height="6" fill="#0e0e0e" />
                <rect x="11" y="15" width="2" height="2" fill="#0e0e0e" />
              </svg>
              <span>Enter a valid email or phone number</span>
            </div>
          )}

          <div className="bottom-buttons" style={{ marginTop: "150px" }}>
            <button type="submit" className="next-btn" disabled={isLoading}>
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: First Name / Last Name Form (Step 9)
  // ----------------------------------------------------
  if (step === 9) {
    return (
      <div className="right-side slide-in-right">
        <form onSubmit={handleNameSubmit}>
          <div
            className={`input-box ${isFocusedFirst || firstName ? "focused" : ""} ${nameError ? "error" : ""}`}
          >
            <input
              ref={firstNameRef}
              type="text"
              value={firstName}
              onFocus={() => setIsFocusedFirst(true)}
              onBlur={() => setIsFocusedFirst(false)}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (nameError) setNameError(false);
              }}
              disabled={isLoading}
            />
            <label>First name</label>
          </div>

          {nameError && (
            <div className="error-text">
              <svg viewBox="0 0 24 24" className="error-icon">
                <circle cx="12" cy="12" r="10" />
                <rect x="11" y="7" width="2" height="6" fill="#0e0e0e" />
                <rect x="11" y="15" width="2" height="2" fill="#0e0e0e" />
              </svg>
              <span>Enter first name</span>
            </div>
          )}

          <div
            className={`input-box ${isFocusedLast || lastName ? "focused" : ""}`}
            style={{ marginTop: nameError ? "10px" : "30px" }}
          >
            <input
              type="text"
              value={lastName}
              onFocus={() => setIsFocusedLast(true)}
              onBlur={() => setIsFocusedLast(false)}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
            <label>Last name (optional)</label>
          </div>

          <div className="bottom-buttons" style={{ marginTop: "60px" }}>
            <button type="submit" className="next-btn" disabled={isLoading}>
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default ForgotEmailStep;
