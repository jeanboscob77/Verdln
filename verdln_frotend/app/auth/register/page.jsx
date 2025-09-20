"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { apiPost } from "@/Utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();

  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState(lang || "en");
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
      const data = await apiPost("/auth/register", {
        national_id: nationalId,
        phone_number: phone,
        preferred_language: preferred,
      });

      if (data.success) {
        // persist chosen language locally and in context
        setLang(preferred);
        localStorage.setItem("preferredLang", preferred);

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          router.push("/farmer/dashboard");
        } else {
          router.push("/auth/login");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">{t.registerTitle}</h1>

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

        <label className="block">
          <span className="text-sm">{t.preferredLanguage}</span>
          <select
            value={preferred}
            onChange={(e) => setPreferred(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 text-white p-2 rounded"
        >
          {loading ? "..." : t.register}
        </button>
      </form>
    </div>
  );
}
