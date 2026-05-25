import React, { useState } from "react";

const GoogleSignInTemplate = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(true);
      return;
    }

    setError(false);
    console.log(email);
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
          <div className="lang">
            <select>
              <option>English (United States)</option>
            </select>
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
        }

        .google-page{
          width:100%;
          min-height:100vh;
          background:#1f1f1f;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          padding:32px;
        }

        .signin-card{
          width:100%;
          max-width:1340px;
          min-height:630px;
          background:#0e0e0e;
          border-radius:32px;
          display:flex;
          justify-content:space-between;
          padding:64px 72px;
        }

        .left-side{
          width:50%;
          display:flex;
          flex-direction:column;
        }

        .google-logo svg{
          width:42px;
          height:42px;
        }

        .left-side h1{
          color:#fff;
          font-size:58px;
          font-weight:400;
          margin-top:32px;
          letter-spacing:-1px;
        }

        .left-side p{
          color:#e3e3e3;
          font-size:26px;
          line-height:38px;
          margin-top:28px;
          max-width:560px;
          font-weight:400;
        }

        .right-side{
          width:48%;
          display:flex;
          align-items:flex-start;
          justify-content:center;
          padding-top:70px;
        }

        .right-side form{
          width:100%;
          max-width:620px;
          display:flex;
          flex-direction:column;
          min-height:420px;
        }

        .input-box{
          width:100%;
          height:78px;
          position:relative;
        }

        .input-box input{
          width:100%;
          height:100%;
          background:transparent;
          border:1px solid #8d8d8d;
          border-radius:6px;
          outline:none;
          color:white;
          font-size:24px;
          padding:24px 18px;
          transition:0.2s;
        }

        .input-box label{
          position:absolute;
          top:50%;
          left:18px;
          transform:translateY(-50%);
          color:#b0b0b0;
          font-size:22px;
          background:#0e0e0e;
          padding:0 6px;
          transition:0.2s;
          pointer-events:none;
        }

        .input-box.focused label{
          top:0;
          font-size:15px;
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
          margin-top:12px;
          font-size:15px;
        }

        .error-text svg{
          width:18px;
          height:18px;
          fill:#f28b82;
        }

        .forgot-link{
          margin-top:18px;
          color:#8ab4f8;
          text-decoration:none;
          font-size:18px;
          font-weight:500;
          width:fit-content;
        }

        .forgot-link:hover{
          text-decoration:underline;
        }

        .guest-text{
          margin-top:90px;
          color:#c7c7c7;
          font-size:18px;
          line-height:30px;
        }

        .guest-text a{
          color:#8ab4f8;
          text-decoration:none;
          font-weight:500;
        }

        .bottom-buttons{
          margin-top:auto;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          gap:18px;
        }

        .create-btn{
          background:transparent;
          border:none;
          color:#8ab4f8;
          font-size:18px;
          font-weight:500;
          cursor:pointer;
          padding:14px 18px;
          border-radius:50px;
        }

        .create-btn:hover{
          background:rgba(138,180,248,.08);
        }

        .next-btn{
          background:#8ab4f8;
          border:none;
          color:#062e6f;
          height:54px;
          padding:0 34px;
          border-radius:999px;
          font-size:18px;
          font-weight:500;
          cursor:pointer;
        }

        .footer{
          width:100%;
          max-width:1340px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:24px;
          padding:0 10px;
        }

        .lang select{
          background:transparent;
          border:none;
          color:#c7c7c7;
          font-size:16px;
          outline:none;
        }

        .footer-links{
          display:flex;
          gap:42px;
        }

        .footer-links a{
          color:#c7c7c7;
          text-decoration:none;
          font-size:16px;
        }

        .footer-links a:hover{
          text-decoration:underline;
        }

        @media(max-width:1100px){

          .signin-card{
            flex-direction:column;
            padding:40px;
            min-height:auto;
          }

          .left-side{
            width:100%;
          }

          .right-side{
            width:100%;
            padding-top:50px;
          }

          .left-side h1{
            font-size:42px;
          }

          .left-side p{
            font-size:20px;
            line-height:30px;
          }

          .input-box{
            height:64px;
          }

          .input-box input{
            font-size:18px;
          }

          .input-box label{
            font-size:18px;
          }

          .guest-text{
            margin-top:60px;
          }
        }

        @media(max-width:768px){

          .google-page{
            padding:0;
            background:#0e0e0e;
          }

          .signin-card{
            border-radius:0;
            padding:28px;
          }

          .left-side h1{
            font-size:36px;
          }

          .left-side p{
            font-size:18px;
            line-height:28px;
          }

          .footer{
            padding:20px 24px;
          }

          .footer-links{
            gap:20px;
          }

          .footer-links a,
          .lang select{
            font-size:13px;
          }
        }
      `}</style>
    </>
  );
};

export default GoogleSignInTemplate;
