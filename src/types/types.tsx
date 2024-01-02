import React from "react";

export type TranslationKeys =
  | "nav_link_one"
  | "nav_link_two"
  | "nav_link_three"
  | "footer_logo_text"
  | "home_text"
  | "mission_text"
  | "contact_text";

export type LanguageKeys = "en" | "jp";

export type Translations = {
  [K in LanguageKeys]: {
    [T in TranslationKeys]: string | string[];
  };
};

export type LanguageContextType = {
  language: string;
  toggleLanguage: (language: string) => void;
  //   getTranslation: (translationKey: TranslationKeys) => string;
};
