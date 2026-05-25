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

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (United States)");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="footer">
      <div className="lang-dropdown-container" ref={dropdownRef}>
        <div
          className={`dropdown-trigger ${showDropdown ? "active" : ""}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{selectedLang}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
  );
};

export default Footer;
