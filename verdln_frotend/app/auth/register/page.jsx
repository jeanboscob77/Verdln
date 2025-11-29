"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { apiPost } from "@/Utils/api";
import DynamicHead from "@/app/app";
// Icons
import { User, IdCard, Phone, Languages } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState(lang || "en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryRole = searchParams.get("role");
  const [role, setRole] = useState(queryRole || "farmer");

  useEffect(() => {
    if (queryRole) setRole(queryRole);
  }, [queryRole]);

  // 🌍 Localized meta for RegisterPage
  const meta = {
    en: {
      title: "Register | Smart Agri-Loan Platform",
      description:
        "Create an account to access agricultural loans, input management, and cooperative insights on our platform.",
      keywords:
        "register, sign up, farmer account, agriculture loans, smart agriculture",
      image: "/images/og/register-preview.png",
      url: `https://yourdomain.com/register`,
    },
    rw: {
      title: "Iyandikishe | Urubuga rw’Imari y’Abahinzi",
      description:
        "Iyandikishe kugirango ugere ku nguzanyo z’abahinzi, gukurikirana inyongeramusaruro, n’amakuru y’amashyirahamwe.",
      keywords:
        "iyandikishe, konti y’umuhinzi, inguzanyo z’abahinzi, ubuhinzi bw’ikoranabuhanga",
      image: "/images/og/register-preview.png",
      url: `https://yourdomain.com/register`,
    },
  }[lang || "en"];

  function validate() {
    if (!fullName || !nationalId || !phone) {
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
      const data = await apiPost("/users/register", {
        full_name: fullName,
        national_id: nationalId,
        phone_number: phone,
        role: "farmer",
        language: preferred,
      });

      if (data.success) {
        setLang(preferred);
        localStorage.setItem("preferredLang", preferred);

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          router.push("/farmer/dashboard");
        } else {
          toast.success("Registration Successful");
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
        <h1 className="text-xl font-bold mb-4">
          {t.RegisterAs} {t.roleNamesRW[role]}
        </h1>

        {error && <div className="mb-3 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <label className="block">
            <span className="text-sm">{t.fullName || "Full Name"}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* National ID */}
          <label className="block">
            <span className="text-sm">{t.nationalId}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <IdCard className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* Phone Number */}
          <label className="block">
            <span className="text-sm">{t.phoneNumber}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Phone className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2507..."
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* Preferred Language */}
          <label className="block">
            <span className="text-sm">{t.preferredLanguage}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Languages className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={preferred}
                onChange={(e) => setPreferred(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
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
    </>
  );
}
