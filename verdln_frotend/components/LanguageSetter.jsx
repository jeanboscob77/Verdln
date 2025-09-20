// LanguageSetter.js
"use client";
import { useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";

export default function LanguageSetter() {
  const { user, loading } = useAuth();
  const { setLang } = useLanguage();

  useEffect(() => {
    if (!loading && user?.preferred_language) {
      setLang(user.preferred_language);
    } else if (!loading && !user) {
      setLang("en"); // default to English if no user
    }
  }, [loading, user, setLang]);

  return null;
}
