import { createContext, useContext } from "react";
import * as React from "react";
import { translations } from "../text/translations";
import { LanguageKeys, TranslationKeys, Translations } from "../types/types";

export type GlobalContent = {
  language: LanguageKeys;
  toggleLanguage: (c: string) => void;
  getTranslation: (key: TranslationKeys) => string | string[];
};

export const MyGlobalContext = createContext<GlobalContent>({
  language: "en",
  toggleLanguage: (c: string) => {},
  getTranslation: (key: TranslationKeys) => key,
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export const Provider = (props: any) => {
  const [language, setLanguage] = React.useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "jp" : "en");
  };

  const getTranslation = (key: TranslationKeys): string | string[] => {
    return translations[language as LanguageKeys][key as TranslationKeys];
  };

  return (
    <MyGlobalContext.Provider
      value={{
        language: language as LanguageKeys,
        toggleLanguage,
        getTranslation,
      }}
    >
      {props.children}
    </MyGlobalContext.Provider>
  );
};
