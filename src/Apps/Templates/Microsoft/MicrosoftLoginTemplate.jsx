import React, { useState, useEffect } from "react";

const MicrosoftLoginTemplate = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Sets exact tab title on mount
  useEffect(() => {
    document.title = "Sign in to your account";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter a valid email address, phone number, or Skype name.");
    } else {
      setError("");
      // Logic for next phase (Password entry validation step)
      console.log("Proceeding with authentication identity:", email);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between font-sans relative antialiased"
      style={{
        backgroundColor: "#f2f2f2",
        // Setting the background image to match Microsoft's actual sign-in background
        backgroundImage:
          "url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/2_light_c49f829f04642921c5b8dfabecbc24b3.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dynamic Center Flow Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-0">
        {/* Main login card container */}
        <div className="w-full max-w-[440px] bg-white border border-[#cccccc] shadow-[0_2px_6px_rgba(0,0,0,0.2)] px-6 py-11 sm:p-[44px] relative box-border">
          {/* Microsoft Branding Header Badge */}
          <div className="mb-[18px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="108"
              height="23"
              viewBox="0 0 108 23"
              className="block"
            >
              <g fill="#737373">
                <path fill="#f25022" d="M0 0h11v11H0z" />
                <path fill="#7fbb00" d="M12 0h11v11H12z" />
                <path fill="#00a4ef" d="M0 12h11v11H0z" />
                <path fill="#ffb900" d="M12 12h11v11H12z" />
              </g>
              <text
                x="32"
                y="18"
                fill="#737373"
                className="text-[17px] font-semibold tracking-tight"
                style={{
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Microsoft
              </text>
            </svg>
          </div>

          {/* Form Context Info */}
          <h1
            className="text-[24px] font-semibold text-[#1b1b1b] tracking-tight leading-8 mb-[12px]"
            style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
          >
            Sign in
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Native Identity Core Field Input View */}
            <div className="relative w-full">
              {/* Floating label that behaves as requested by the user */}
              <span
                className={`absolute left-0.5 pointer-events-none transition-all duration-200 
                  ${
                    email
                      ? "top-[2px] text-[13px]" // Stays small above the value if text exists
                      : "top-[10px] text-[15px]" // Sits over the input area if no text
                  }
                  ${error ? "text-[#e81123]" : "text-[#666666]"}
                `}
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
              >
                Email, phone, or Skype
              </span>

              {/* Email/username input field */}
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="off" // Disables standard autofill to avoid overlap issues
                // Standard unstyled input field with focused line
                className={`w-full h-[36px] bg-transparent text-[15px] font-normal text-[#1b1b1b] border-b outline-none transition-all duration-100 px-0.5 pt-[14px]
                  ${
                    error
                      ? "border-[#e81123] focus:border-[#e81123]" // Error border
                      : "border-[#666666] focus:border-[#0067b8]" // Standard and focused border
                  }
                `}
                style={{ borderRadius: "0px" }}
              />
            </div>

            {/* Strict Error Alert Logging Handler Block */}
            {error && (
              <div className="text-[13px] text-[#e81123] leading-tight pt-1 flex items-start gap-1">
                <span>{error}</span>
              </div>
            )}

            {/* Standard Context Meta Navigation Section Row */}
            <div className="text-[13px] text-[#1b1b1b] font-normal pt-2 leading-relaxed">
              <span>No account? </span>
              <a
                href="#"
                className="text-[#0067b8] hover:underline cursor-pointer"
              >
                Create one!
              </a>
            </div>

            <div className="text-[13px] text-[#0067b8] font-normal leading-relaxed">
              <a href="#" className="hover:underline cursor-pointer">
                Can't access your account?
              </a>
            </div>

            {/* Action Buttons Interface Footer Wrapper Layer */}
            <div className="flex justify-end pt-5 items-center gap-3">
              <button
                type="button"
                className="min-w-[96px] h-[32px] px-3 bg-[#cccccc] text-[#1b1b1b] text-[15px] font-normal hover:bg-[#b3b3b3] active:bg-[#999999] transition-colors cursor-pointer select-none border-none outline-none"
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
              >
                Back
              </button>
              <button
                type="submit"
                className="min-w-[96px] h-[32px] px-3 bg-[#0067b8] text-white text-[15px] font-normal hover:bg-[#005da6] active:bg-[#005293] transition-colors cursor-pointer select-none border-none outline-none"
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
              >
                Next
              </button>
            </div>
          </form>

          {/* External Alternative Security Sign-in Methods Widget Row */}
          <div className="mt-[28px] border border-transparent">
            <button className="w-full h-[40px] flex items-center gap-3 px-2 bg-transparent hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors border-none outline-none text-left cursor-pointer select-none">
              <div className="w-6 h-6 flex items-center justify-center">
                {/* Silhouette lock icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#505050"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span
                className="text-[15px] text-[#2f2f2f] font-normal"
                style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
              >
                Sign-in options
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Regulatory Footer Corporate Links Strip */}
      <footer className="w-full bg-transparent flex flex-wrap justify-end gap-x-[24px] gap-y-2 px-6 sm:px-[44px] pb-[16px] text-[12px] font-normal select-none z-10 text-[#505050]">
        <a
          href="#"
          className="hover:underline hover:text-black transition-colors"
        >
          Terms of use
        </a>
        <a
          href="#"
          className="hover:underline hover:text-black transition-colors"
        >
          Privacy & cookies
        </a>
        <button className="text-[12px] font-normal text-[#505050] hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-none p-0 outline-none">
          <span>...</span>
        </button>
      </footer>
    </div>
  );
};

export default MicrosoftLoginTemplate;
