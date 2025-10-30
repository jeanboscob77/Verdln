"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";
import { apiPost } from "@/Utils/api";
import toast from "react-hot-toast";
// import DynamicHead from "@/components/DynamicHead"; // optional if you added it

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang, setLang } = useLanguage();
  const { login } = useAuth();

  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryRole = searchParams.get("role");
  const [role, setRole] = useState(queryRole || "farmer");

  useEffect(() => {
    if (queryRole) setRole(queryRole);
  }, [queryRole]);

  const roleNamesRW = {
    farmer: "Umuhinzi",
    supplier: "Umucuruzi",
    investor: "Umushoramari",
    admin: "Umuyobozi",
  };

  const displayRole =
    lang === "rw"
      ? roleNamesRW[role]
      : role.charAt(0).toUpperCase() + role.slice(1);

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
        role,
      });

      if (data.preferred_language) {
        setLang(data.preferred_language);
        localStorage.setItem("preferredLang", data.preferred_language);
      }

      if (data.token && data.user) {
        localStorage.setItem("authToken", data.token);
        login(data.user, data.token);
        toast.success("Login successful!");

        switch (data.user.role) {
          case "farmer":
            router.push("/farmer/loan/view");
            break;
          case "supplier":
            router.push("/supplier/dashboard");
            break;
          case "investor":
            router.push("/investor/dashboard");
            break;
          case "admin":
            router.push("/admin/dashboard");
            break;
          default:
            router.push("/");
        }
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {lang === "rw"
          ? `Injira nka ${displayRole}`
          : `Login as ${displayRole}`}
      </h1>

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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition"
        >
          {loading ? "..." : t.loginButtonLabel}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginContent />
    </Suspense>
  );
}
