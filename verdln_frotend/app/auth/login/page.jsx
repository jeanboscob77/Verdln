// pages/auth/login.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
// import { apiPost } from "@/utils/api";

export default function LoginPage() {
  const router = useRouter();
  const { t, setLang } = useLanguage();

  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!nationalId || !phone) {
      setError(t.required);
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(phone)) {
      setError(t.invalidPhone);
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      // update path to your backend auth URL if needed
      //   const data = await apiPost("/api/auth/login", {
      //     national_id: nationalId,
      //     phone_number: phone,
      //   });

      // backend may return preferred_language and a token/session
      if (data.preferred_language) {
        setLang(data.preferred_language);
        localStorage.setItem("preferredLang", data.preferred_language);
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // redirect to farmer dashboard (adjust based on role)
        router.push("/farmer/dashboard");
      } else {
        // fallback behavior
        router.push("/farmer/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">{t.loginTitle}</h1>

      {error && <div className="mb-3 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">{t.nationalId}</span>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm">{t.phoneNumber}</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+2507..."
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {loading ? "..." : t.loginButtonLabel}
        </button>
      </form>
    </div>
  );
}
