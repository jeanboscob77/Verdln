// LanguageContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/Utils/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
