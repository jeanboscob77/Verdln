"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext"; // <-- import Auth context
import { apiPost } from "@/Utils/api";

export default function LoginPage() {
  const router = useRouter();
  const { t, setLang } = useLanguage();
  const { login } = useAuth(); // <-- get login function from context

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
      const data = await apiPost("/auth/login", {
        national_id: nationalId,
        phone_number: phone,
      });

      // Set preferred language
      if (data.preferred_language) {
        setLang(data.preferred_language);
        localStorage.setItem("preferredLang", data.preferred_language);
      }

      if (data.token && data.user) {
        // Save token in localStorage
        localStorage.setItem("authToken", data.token);

        // Update Auth context
        login(data.user, data.token);

        // Redirect based on role
        if (data.user.role === "farmer") {
          router.push("/farmer/dashboard");
        } else if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }

        console.log("Logged in user:", data.user);
      } else {
        setError("Login failed: missing token or user data");
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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 hover:transition-300"
        >
          {loading ? "..." : t.loginButtonLabel}
        </button>
      </form>
    </div>
  );
}
