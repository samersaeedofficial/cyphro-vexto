import React from "react";

const LeftSide = ({ step, email }) => {
  return (
    <div className="left-side">
      <div className="google-logo">
        <svg viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.4 0 24 0 14.64 0 6.57 5.38 2.62 13.22l7.98 6.19C12.43 13.74 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24.5c0-1.64-.14-3.21-.4-4.73H24v8.96h12.7c-.55 2.96-2.23 5.46-4.73 7.14l7.65 5.93C44.1 37.66 46.5 31.68 46.5 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.6 28.59a14.5 14.5 0 010-9.18l-7.98-6.19A23.96 23.96 0 000 24c0 3.84.92 7.48 2.62 10.78l7.98-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.65-5.93c-2.13 1.43-4.86 2.25-8.25 2.25-6.26 0-11.57-4.24-13.4-9.91l-7.98 6.19C6.57 42.62 14.64 48 24 48z"
          />
        </svg>
      </div>

      {step === 1 ? (
        <>
          <h1>Sign in</h1>
          <p>
            with your Google Account. This account will be available to other
            Google apps in the browser.
          </p>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
          <div className="profile-pill">
            <svg
              className="profile-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
            </svg>
            <span className="profile-email">{email}</span>
            <svg
              className="profile-arrow"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftSide;
