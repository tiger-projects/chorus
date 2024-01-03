import React from "react";
import { useGlobalContext } from "../context/languageContext";

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useGlobalContext();
  return (
    <>
      <a
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
        style={{ fontFamily: "'Noto Sans JP Variable', sans-serif" }}
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
