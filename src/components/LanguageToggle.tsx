import React, { useContext } from "react";
import { useGlobalContext } from "../context/languageContext";

interface Translation {
  en: Record<string, string>;
  jp: Record<string, string>;
}

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useGlobalContext();
  return (
    <>
      <a
        href="#"
        className={`language-label label-en ${
          language === "en" ? " langActive" : ""
        }`}
        data-lang="en"
        onClick={() => toggleLanguage("en")}
      >
        en
      </a>

      <div className="language-toggler--seperator">/</div>
      <a
        href="#"
        className={`language-label label-jp${
          language === "jp" ? " langActive" : ""
        }`}
        data-lang="jp"
        onClick={() => toggleLanguage("jp")}
      >
        jp
      </a>
    </>
  );
};

export default LanguageToggle;
