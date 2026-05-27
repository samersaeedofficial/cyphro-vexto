import React, { useState } from "react";

const RightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States for error handling
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = email.trim() === "";
    const passwordError = password.trim() === "";

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

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
    /* Background exactly #1f1e1e set kar diya hai aur border color update kiya hai */
    <div className="w-full lg:w-[45%] flex flex-col p-6 lg:p-16 justify-between bg-[#1a1919] min-h-screen lg:border-l-2 border-[#333333]">
      {/* Overriding global webkit-autofill rules for dark mode layout */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #1a2232 inset !important;
          transition: background-color 9999s ease-out 0s !important;
        }
        input[type="text"], input[type="password"] {
          cursor: text !important;
          caret-color: #ffffff !important;
        }
      `}</style>

      {/* Fields aur buttons ki width barhanay ke liye max-w ko 500px kar diya hai */}
      <div className="max-w-[500px] w-full mx-auto mt-10 lg:mt-24">
        {/* Header Title */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-white">
            Log in to Instagram
          </h2>
        </div>

        {/* Login Form */}
        <form
          className="space-y-4"
          onSubmit={handleLogin}
          autoComplete="off"
          noValidate
        >
          {/* Email / Mobile Field Container */}
          <div className="space-y-1.5">
            <div
              className={`relative border-2 rounded-[14px] bg-[#1a2232]/40 h-[58px] transition-all duration-150 
                ${
                  errors.email
                    ? "border-[#FA3E3E] focus-within:ring-1 focus-within:ring-[#FA3E3E]"
                    : "border-[#5d729a] focus-within:border-[#1877f2] focus-within:ring-1 focus-within:ring-[#1877f2]"
                }`}
            >
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder=" "
                disabled={isLoading}
                autoComplete="new-password"
                className="peer block w-full h-full px-4 pt-5 pb-1 text-[16px] text-white bg-transparent rounded-[12px] appearance-none focus:outline-none disabled:opacity-70"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 pointer-events-none transition-all duration-150 origin-top-left text-[16px] top-1/2 -translate-y-1/2
                           peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:font-medium 
                           peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]
                           peer-[-webkit-autofill]:top-2 peer-[-webkit-autofill]:translate-y-0 peer-[-webkit-autofill]:text-[12px]
                           ${errors.email ? "text-[#FA3E3E] peer-focus:text-[#FA3E3E]" : "text-gray-400 peer-focus:text-[#1877f2]"}`}
              >
                Mobile number, username or email
              </label>

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
            {errors.email && (
              <p className="text-[13px] text-[#FA3E3E] pl-1 font-normal leading-tight">
                The email address or mobile number you entered isn't connected
                to an account.
              </p>
            )}
          </div>

          {/* Password Field Container */}
          <div className="space-y-1.5">
            <div
              className={`relative border-2 rounded-[14px] bg-[#1a2232]/40 h-[58px] transition-all duration-150 
                ${
                  errors.password
                    ? "border-[#FA3E3E] focus-within:ring-1 focus-within:ring-[#FA3E3E]"
                    : "border-[#5d729a] focus-within:border-[#1877f2] focus-within:ring-1 focus-within:ring-[#1877f2]"
                }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=" "
                disabled={isLoading}
                autoComplete="new-password"
                className={`peer block w-full h-full pl-4 pt-5 pb-1 text-[16px] text-white bg-transparent rounded-[12px] appearance-none focus:outline-none disabled:opacity-70 ${errors.password ? "pr-10" : "pr-12"}`}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 pointer-events-none transition-all duration-150 origin-top-left text-[16px] top-1/2 -translate-y-1/2
                           peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:font-medium 
                           peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]
                           peer-[-webkit-autofill]:top-2 peer-[-webkit-autofill]:translate-y-0 peer-[-webkit-autofill]:text-[12px]
                           ${errors.password ? "text-[#FA3E3E] peer-focus:text-[#FA3E3E]" : "text-gray-400 peer-focus:text-[#1877f2]"}`}
              >
                Password
              </label>

              {password.length > 0 && !errors.password && !isLoading && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-100 cursor-pointer select-none z-10"
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
            {errors.password && (
              <p className="text-[13px] text-[#FA3E3E] pl-1 font-normal leading-tight">
                Please enter your password.
              </p>
            )}
          </div>

          {/* Submit Button - Height kam kar ke h-[46px] kar di hai */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-[46px] bg-[#10408f] hover:bg-[#144fae] text-white font-bold rounded-[100px] text-[16px] transition-colors mt-2 cursor-pointer select-none flex items-center justify-center disabled:opacity-80"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                ></circle>
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        {/* Forgotten Password Link - Height kam kar ke h-[46px] kar di hai */}
        <div className="text-center mt-4">
          <a
            href="#"
            className="flex items-center justify-center w-full h-[46px] text-[16px] font-semibold text-white no-underline bg-transparent hover:bg-white/5 active:bg-white/10 rounded-[100px] transition-colors duration-150 select-none cursor-pointer"
          >
            Forgot password?
          </a>
        </div>

        {/* Log in with Facebook Button Option */}
        <div className="mt-2">
          <button className="flex items-center justify-center gap-2 w-full bg-transparent border-2 border-[#5d729a] hover:bg-white/5 text-white font-semibold py-2.5 px-4 rounded-[100px] text-[15px] transition-colors cursor-pointer select-none">
            <svg
              className="w-5 h-5 text-[#1877f2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>
        </div>

        {/* Create New Account Button */}
        <div className="mt-3">
          <button className="w-full bg-transparent border-2 border-[#5d729a] hover:bg-white/5 text-[#1877f2] font-semibold py-2.5 px-4 rounded-[100px] text-[15px] transition-colors cursor-pointer select-none">
            Create new account
          </button>
        </div>

        {/* Meta Logo */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center select-none brightness-0 invert opacity-80">
            <img
              src="/templates/meta.png"
              style={{ width: "60px", height: "auto" }}
              alt="Meta Logo"
              className="h-[18px] w-auto object-contain antialiased"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Footer Language Bar - No borders */}
      <div className="mt-12 pt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-gray-400 justify-center lg:justify-start lg:pl-10 pb-6 border-none lg:border-t-0">
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
        <button className="hover:underline font-semibold cursor-pointer text-gray-300">
          More languages...
        </button>
      </div>
    </div>
  );
};

export default RightSection;
