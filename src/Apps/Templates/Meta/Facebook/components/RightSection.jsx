import React, { useState } from "react";

const RightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation States for error handling matching image_ffefda.png
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // Validating field inputs before submission
    const emailError = email.trim() === "";
    const passwordError = password.trim() === "";

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      console.log("Form Submitted Successfully:", { email, password });
    }
  };

  // Clear validation state on input value changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <div className="w-full lg:w-[45%] flex flex-col p-6 lg:p-16 justify-between bg-white min-h-screen">
      {/* Overriding global index.css !important rule & dynamic layout text pointer overrides */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #111827 !important;
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          transition: background-color 9999s ease-out 0s !important;
        }
        /* Bulletproof text selector indicator layer */
        input[type="text"], input[type="password"] {
          cursor: text !important;
          caret-color: #111827 !important;
        }
      `}</style>

      <div className="max-w-[400px] w-full mx-auto mt-10 lg:mt-24">
        {/* Header Title */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-[#1C1E21]">
            Log in to Facebook
          </h2>
        </div>

        {/* Login Form */}
        <form
          className="space-y-4"
          onSubmit={handleLogin}
          autoComplete="off"
          noValidate
        >
          {/* Email / Mobile Field Container with error validation conditional injection */}
          <div className="space-y-1.5">
            <div
              className={`relative border rounded-[14px] bg-white h-[58px] transition-all duration-150 
                ${
                  errors.email
                    ? "border-[#FA3E3E] focus-within:ring-1 focus-within:ring-[#FA3E3E]"
                    : "border-gray-300 focus-within:border-[#0866FF] focus-within:ring-1 focus-within:ring-[#0866FF]"
                }`}
            >
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder=" "
                autoComplete="new-password"
                className="peer block w-full h-full px-4 pt-5 pb-1 text-[16px] text-gray-900 bg-transparent rounded-[14px] appearance-none focus:outline-none"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 pointer-events-none transition-all duration-150 origin-top-left text-[16px] top-1/2 -translate-y-1/2
                           peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:font-medium 
                           peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]
                           peer-[-webkit-autofill]:top-2 peer-[-webkit-autofill]:translate-y-0 peer-[-webkit-autofill]:text-[12px]
                           ${errors.email ? "text-[#FA3E3E] peer-focus:text-[#FA3E3E]" : "text-gray-500 peer-focus:text-[#0866FF]"}`}
              >
                Email address or mobile number
              </label>

              {/* Red error indicator cross badge for Email */}
              {errors.email && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FA3E3E] pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Inline message info banner from image_ffefda.png */}
            {errors.email && (
              <p className="text-[13px] text-[#FA3E3E] pl-1 font-normal leading-tight">
                The email address or mobile number you entered isn't connected
                to an account.
              </p>
            )}
          </div>

          {/* Password Field Container with error validation conditional injection */}
          <div className="space-y-1.5">
            <div
              className={`relative border rounded-[14px] bg-white h-[58px] transition-all duration-150 
                ${
                  errors.password
                    ? "border-[#FA3E3E] focus-within:ring-1 focus-within:ring-[#FA3E3E]"
                    : "border-gray-300 focus-within:border-[#0866FF] focus-within:ring-1 focus-within:ring-[#0866FF]"
                }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=" "
                autoComplete="new-password"
                className={`peer block w-full h-full pl-4 pt-5 pb-1 text-[16px] text-gray-900 bg-transparent rounded-[14px] appearance-none focus:outline-none ${errors.password ? "pr-10" : "pr-12"}`}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 pointer-events-none transition-all duration-150 origin-top-left text-[16px] top-1/2 -translate-y-1/2
                           peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:font-medium 
                           peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]
                           peer-[-webkit-autofill]:top-2 peer-[-webkit-autofill]:translate-y-0 peer-[-webkit-autofill]:text-[12px]
                           ${errors.password ? "text-[#FA3E3E] peer-focus:text-[#FA3E3E]" : "text-gray-500 peer-focus:text-[#0866FF]"}`}
              >
                Password
              </label>

              {/* Toggle layout button logic hidden only when input field throws missing value error */}
              {password.length > 0 && !errors.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors duration-100 cursor-pointer select-none z-10"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                      stroke="currentColor"
                      className="w-5 h-5 pointer-events-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12c1.387 4.172 5.322 7.178 9.963 7.178 1.401 0 2.74-.274 3.968-.772M6.208 6.208A10.498 10.498 0 0111.997 4.5c4.64 0 8.575 3.006 9.963 7.178a10.478 10.478 0 01-1.325 2.978m-2.128-2.128a3.31 3.31 0 01-4.707-4.707m0 0L3.75 3.75M20.25 20.25L15.657 15.657"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                      stroke="currentColor"
                      className="w-5 h-5 pointer-events-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Red error indicator cross badge for Password */}
              {errors.password && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FA3E3E] pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Inline message info banner from image_ffefda.png */}
            {errors.password && (
              <p className="text-[13px] text-[#FA3E3E] pl-1 font-normal leading-tight">
                Please enter your password.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0866FF] hover:bg-[#0759E0] text-white font-bold py-3.5 px-4 rounded-[100px] text-[16px] transition-colors mt-2 cursor-pointer select-none"
          >
            Log in
          </button>
        </form>

        {/* Fixed Forgotten Password Link without default underline */}
        <div className="text-center mt-5">
          <a
            href="#"
            className="inline-block text-[14px] font-semibold text-[#1C1E21] no-underline hover:text-[#0866FF] hover:underline transition-colors duration-150 py-1 px-2"
          >
            Forgotten password?
          </a>
        </div>

        {/* Create Account Button */}
        <div className="mt-8">
          <button className="w-full bg-transparent border border-gray-300 hover:bg-gray-50 text-[#0866FF] font-semibold py-3.5 px-4 rounded-[100px] text-[15px] transition-colors cursor-pointer select-none">
            Create new account
          </button>
        </div>

        {/* Static local asset loader via public directory */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center select-none">
            <img
              src="/templates/meta.png"
              alt="Meta Logo"
              className="h-[18px] w-auto object-contain antialiased"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Footer Language Bar */}
      <div className="mt-12 pt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-[#65676B] justify-center lg:justify-start lg:pl-10 pb-6 border-t lg:border-t-0 border-gray-200">
        <a href="#" className="hover:underline">
          English (UK)
        </a>
        <a href="#" className="hover:underline">
          اردو
        </a>
        <a href="#" className="hover:underline">
          پښتو
        </a>
        <a href="#" className="hover:underline">
          العربية
        </a>
        <a href="#" className="hover:underline">
          हिन्दी
        </a>
        <a href="#" className="hover:underline">
          বাংলা
        </a>
        <a href="#" className="hover:underline">
          ਪੰਜਾਬੀ
        </a>
        <button className="hover:underline font-semibold cursor-pointer">
          More languages...
        </button>
      </div>
    </div>
  );
};

export default RightSection;
