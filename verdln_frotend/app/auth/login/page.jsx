"use client";
import React, { useState } from "react";
import DynamicHead from "@/app/app";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext"; // <-- import Auth context
import { apiPost } from "@/Utils/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const { login } = useAuth(); // <-- get login function from context

  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌍 Localized meta for LoginPage
  const meta = {
    en: {
      title: "Login | Smart Agri-Loan Platform",
      description:
        "Login to access your account and manage agricultural loans, payments, and cooperative insights.",
      keywords: "login, agriculture loans, farmer account, smart agriculture",
      image: "/images/og/login-preview.png",
      url: `https://yourdomain.com/login`,
    },
    rw: {
      title: "Injira | Urubuga rw’Imari y’Abahinzi",
      description:
        "Injira mu rubuga rwawe kugirango ugere ku nguzanyo z’abahinzi, ubwishyu n’amakuru y’amashyirahamwe.",
      keywords:
        "injira, inguzanyo z’abahinzi, konti y’umuhinzi, ubuhinzi bw’ikoranabuhanga",
      image: "/images/og/login-preview.png",
      url: `https://yourdomain.com/login`,
    },
  }[lang || "en"];

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
      const data = await apiPost("/users/login", {
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
        if (data.user) {
          toast.success("Login successful!");
          router.push("/");
        }

        console.log("Logged in user:", data.user);
      } else {
        setError("Login failed: missing token or user data");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🌐 Meta for SEO */}
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />
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
    </>
  );
}
