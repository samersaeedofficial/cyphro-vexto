import React, { useState, useEffect, useRef } from "react";

const languages = [
  "Afrikaans",
  "azərbaycan",
  "bosanski",
  "català",
  "Čeština",
  "Cymraeg",
  "Dansk",
  "Deutsch",
  "eesti",
  "English (United Kingdom)",
  "English (United States)",
  "Español (España)",
  "Español (Latinoamérica)",
  "Français",
];

const GoogleSignInTemplate = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);

  // Dropdown States
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (United States)");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(true);
      return;
    }

    setError(false);
    console.log("Submitted Email:", email);
  };

  return (
    <>
      <div className="google-page">
        <div className="signin-card">
          {/* LEFT SIDE */}
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

            <h1>Sign in</h1>

            <p>
              with your Google Account. This account will be available to other
              Google apps in the browser.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-side">
            <form onSubmit={handleSubmit}>
              <div
                className={`input-box ${
                  isFocused || email ? "focused" : ""
                } ${error ? "error" : ""}`}
              >
                <input
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
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
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
                <button type="button" className="create-btn">
                  Create account
                </button>

                <button type="submit" className="next-btn">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="lang-dropdown-container" ref={dropdownRef}>
            <div
              className={`dropdown-trigger ${showDropdown ? "active" : ""}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedLang}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>

            {showDropdown && (
              <div className="custom-dropdown-menu">
                <ul>
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className={selectedLang === lang ? "selected" : ""}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowDropdown(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="footer-links">
            <a href="/">Help</a>
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
          </div>
        </div>
      </div>

      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family: "Google Sans",Roboto,Arial,sans-serif;
          background: #1f1f1f;
        }

        .google-page{
          width:100%;
          min-height:100vh;
          background:#1f1f1f;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          padding:24px;
        }

        .signin-card{
          width:100%;
          max-width:1140px;
          background:#0e0e0e;
          border-radius:28px;
          display:flex;
          justify-content:space-between;
          padding: 32px 40px; 
        }

        .left-side{
          width:50%;
          display:flex;
          flex-direction:column;
          padding-right: 16px;
        }

        .google-logo {
          margin-top: 10px; /* Added to move logo and left content down slightly */
        }

        .google-logo svg{
          width:40px;
          height:40px;
        }

        .left-side h1{
          color:#fff;
          font-size:36px; 
          font-weight:400;
          margin-top:28px;
          letter-spacing: -0.5px;
          font-family: sans-serif; 
        }

        .left-side p{
          color:#e3e3e3;
          font-size:16px; 
          line-height:26px;
          margin-top:20px;
          max-width:440px;
          font-weight:400;
          font-family: "Google Sans", sans-serif; 
        }

        .right-side{
          width:50%;
          display:flex;
          align-items:flex-start;
          justify-content:center;
          padding-top:56px; 
        }

        .right-side form{
          width:100%;
          max-width:500px; 
          display:flex;
          flex-direction:column;
          margin-top: 16px; /* Added to move input field and right content down without adding padding to container */
        }

        .input-box{
          width:100%;
          height:56px; 
          position:relative;
        }

        .input-box input{
          width:100%;
          height:100%;
          background:transparent;
          border:1px solid #8d8d8d;
          border-radius:4px;
          outline:none;
          color:white;
          font-size:18px;
          padding:16px;
          transition:0.2s ease-in-out;
        }

        /* AUTOFILL FIX */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #0e0e0e inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        .input-box label{
          position:absolute;
          top:50%;
          left:16px;
          transform:translateY(-50%);
          color:#b0b0b0;
          font-size:18px;
          background:#0e0e0e;
          padding:0 6px;
          transition:0.2s ease-in-out;
          pointer-events:none;
        }

        .input-box.focused label{
          top:0;
          font-size:13px;
          color:#8ab4f8;
        }

        .input-box.focused input{
          border:2px solid #8ab4f8;
        }

        .input-box.error input{
          border:2px solid #f28b82;
        }

        .input-box.error label{
          color:#f28b82;
        }

        .error-text{
          display:flex;
          align-items:center;
          gap:8px;
          color:#f28b82;
          margin-top:10px;
          font-size:13px;
        }

        .error-text svg{
          width:18px;
          height:18px;
          fill:#f28b82;
        }

        .forgot-link{
          margin-top:14px;
          color:#8ab4f8;
          text-decoration:none;
          font-size:15px;
          font-weight:500;
          width:fit-content;
        }

        .forgot-link:hover{
          text-decoration:underline;
        }

        .guest-text{
          margin-top:56px;
          margin-left: 12px; 
          color:#c7c7c7;
          font-size:15px;
          line-height:24px;
        }

        .guest-text a{
          color:#8ab4f8;
          text-decoration:none;
          font-weight:500;
        }

        .guest-text a:hover {
          text-decoration: underline;
        }

        .bottom-buttons{
          margin-top: 36px; 
          display:flex;
          justify-content:flex-end;
          align-items:center;
          gap:16px;
        }

        .create-btn{
          background:transparent;
          border:none;
          color:#8ab4f8;
          font-size:15px;
          font-weight:500;
          cursor:pointer;
          padding:12px 18px;
          border-radius:50px;
          transition: 0.2s;
        }

        .create-btn:hover{
          background:rgba(138,180,248,.08);
        }

        .next-btn{
          background:#8ab4f8;
          border:none;
          color:#062e6f;
          height:44px;
          padding:0 28px;
          border-radius:999px;
          font-size:15px;
          font-weight:500;
          cursor:pointer;
          transition: 0.2s;
        }
        
        .next-btn:hover {
          background: #a8c7fa;
        }

        .footer{
          width:100%;
          max-width:1140px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:20px;
          padding:0 8px;
        }

        /* CUSTOM DROPDOWN CSS */
        .lang-dropdown-container {
          position: relative;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #c7c7c7;
          font-size: 13px;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 4px;
          transition: background 0.2s;
          margin-left: -10px;
        }

        .dropdown-trigger:hover, .dropdown-trigger.active {
          background: rgba(255, 255, 255, 0.05);
        }

        .custom-dropdown-menu {
          position: absolute;
          bottom: 100%;
          left: 0;
          background: #303134;
          border-radius: 8px;
          width: 250px;
          max-height: 350px;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          z-index: 10;
          margin-bottom: 8px;
          padding: 8px 0;
        }

        .custom-dropdown-menu::-webkit-scrollbar {
          width: 8px;
        }
        .custom-dropdown-menu::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb {
          background: #5f6368;
          border-radius: 10px;
          border: 2px solid #303134;
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb:hover {
          background: #9aa0a6;
        }

        .custom-dropdown-menu ul {
          list-style: none;
        }

        .custom-dropdown-menu li {
          padding: 12px 24px;
          color: #e8eaed;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .custom-dropdown-menu li:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .custom-dropdown-menu li.selected {
          background: #474a4d;
          color: #fff;
        }

        .footer-links{
          display:flex;
          gap:12px; 
        }

        .footer-links a{
          color:#c7c7c7;
          text-decoration:none;
          font-size:13px;
          transition: 0.2s;
          padding: 6px 10px;
          border-radius: 4px;
        }

        .footer-links a:hover{
          background: rgba(255, 255, 255, 0.05);
        }

        @media(max-width:900px){
          .signin-card{
            flex-direction:column;
            padding:32px;
          }

          .left-side{
            width:100%;
            padding-right: 0;
          }

          .right-side{
            width:100%;
            padding-top:40px;
            justify-content: flex-start;
          }

          .right-side form {
            max-width: 100%;
          }

          .left-side h1{
            font-size:32px;
          }
        }

        @media(max-width:600px){
          .google-page{
            padding:0;
            background:#0e0e0e;
            justify-content: flex-start;
          }

          .signin-card{
            border-radius:0;
            padding:24px;
          }

          .footer{
            padding:20px 24px;
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default GoogleSignInTemplate;
