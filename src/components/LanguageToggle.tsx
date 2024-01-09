import React from "react";
import { useGlobalContext } from "../context/languageContext";

interface DropdownProps {
  isDropdownOpen: boolean;
}

const LanguageToggle: React.FC<DropdownProps> = ({ isDropdownOpen }) => {
  const { language, toggleLanguage } = useGlobalContext();

  const invertedStyle = {
    filter: isDropdownOpen ? "invert(0)" : "invert(1)",
  };

  return (
    <>
      <a
        style={invertedStyle}
        href="#"
        id="navbar-main--link"
        className={`language-label label-en ${
          language === "en" ? " langActive" : ""
        }`}
        data-lang="en"
        onClick={() => toggleLanguage("en")}
      >
        en
      </a>

      <div id="navbar-main--link" className="language-toggler--seperator">
        /
      </div>
      <a
        id="navbar-main--link"
        style={{
          fontFamily: "'Noto Sans JP Variable', sans-serif",
          ...invertedStyle,
        }}
        href="#"
        className={`language-label label-jp${
          language === "jp" ? " langActive" : ""
        }`}
        data-lang="jp"
        onClick={() => toggleLanguage("jp")}
      >
        日本語
      </a>
    </>
  );
};

export default LanguageToggle;
