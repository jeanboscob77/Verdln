"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage(); // use context

  return (
    <nav className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button className="text-green-700 font-extrabold text-lg">
              {t.appName}
            </button>
            <span className="hidden sm:inline text-sm text-gray-600">
              {t.tagline}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink label={t.home} href="/" />
            <NavLink label={t.farmer} href="/farmer/dashboard" />
            <NavLink label={t.admin} href="/admin/dashboard" />
            <NavLink label={t.ussd} href="#ussd" />
            <LangSwitcher lang={lang} setLang={setLang} />
            <AuthButtons t={t} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher lang={lang} setLang={setLang} compact />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-2">
            <MobileLink label={t.home} href="/" />
            <MobileLink label={t.farmerDashboard} href="/farmer/dashboard" />
            <MobileLink label={t.adminDashboard} href="/admin/dashboard" />
            <MobileLink label={t.ussdInfo} href="#ussd" />
            <div className="pt-2 border-t mt-2">
              <AuthButtons stacked t={t} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop NavLink with active link
function NavLink({ label, href = "#" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-green-700 px-2 py-1 rounded-md text-sm ${
        isActive ? "text-green-700 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

// Mobile link with active link
function MobileLink({ label, href = "#" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md ${
        isActive ? "bg-green-100 text-green-700 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

// Language switcher
function LangSwitcher({ lang, setLang, compact = false }) {
  if (compact) {
    return (
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
      >
        <option value="en">EN</option>
        <option value="rw">RW</option>
      </select>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded text-sm ${
          lang === "en" ? "bg-green-400 text-white" : "hover:bg-gray-100"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("rw")}
        className={`px-2 py-1 rounded text-sm ${
          lang === "rw" ? "bg-green-400 text-white" : "hover:bg-gray-100"
        }`}
      >
        RW
      </button>
    </div>
  );
}

// Auth buttons
function AuthButtons({ stacked = false, t }) {
  return (
    <div
      className={
        stacked ? "flex flex-col gap-2 mt-2" : "flex items-center gap-2"
      }
    >
      <Link
        href="/auth/login"
        className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
      >
        {t.login}
      </Link>
      <Link
        href="/auth/register"
        className="text-sm px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
      >
        {t.register}
      </Link>
    </div>
  );
}
