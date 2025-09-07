"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/Utils/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Load saved language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("preferredLang");
    if (saved) setLang(saved);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  // Translation helper
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for easy access
export function useLanguage() {
  return useContext(LanguageContext);
}
