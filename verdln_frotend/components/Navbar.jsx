"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Links with roles
  const links = [
    { label: t.home, href: "/", roles: ["guest", "farmer", "admin"] },
    { label: t.farmer, href: "/farmer/dashboard", roles: ["farmer"] },
    { label: t.admin, href: "/admin/dashboard", roles: ["admin"] },
    { label: t.ussd, href: "/ussd", roles: ["guest", "farmer", "admin"] },
  ];

  // Filtered links based on role
  const availableLinks = links.filter((link) => {
    if (!user && link.roles.includes("guest")) return true;
    if (user?.role && link.roles.includes(user.role)) return true;
    return false;
  });

  return (
    <nav className="bg-green-600 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button className="font-extrabold text-lg">{t.appName}</button>
            <span className="hidden sm:inline text-sm opacity-80">
              {t.tagline}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            {availableLinks.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                pathname={pathname}
              />
            ))}
            <LangSwitcher lang={lang} setLang={setLang} />
            <AuthButtons t={t} user={user} logout={logout} />
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
            {availableLinks.map((link) => (
              <MobileLink
                key={link.href}
                label={link.label}
                href={link.href}
                pathname={pathname}
              />
            ))}
            <div className="pt-2 border-t mt-2 border-white/30">
              <AuthButtons stacked t={t} user={user} logout={logout} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ label, href, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`relative group px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? "bg-white text-green-700 font-semibold"
          : "text-white hover:text-yellow-200"
      }`}
    >
      {label}
      {/* Underline effect */}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-yellow-300 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );
}

function MobileLink({ label, href, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`relative group block px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-white text-green-700 font-semibold"
          : "text-white hover:text-yellow-200"
      }`}
    >
      {label}
      <span
        className={`absolute left-0 bottom-0 h-0.5 bg-yellow-300 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );
}

function LangSwitcher({ lang, setLang, compact = false }) {
  if (compact) {
    return (
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="px-2 py-1 border rounded text-sm text-green-700 focus:outline-none focus:ring-1 focus:ring-yellow-300"
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
          lang === "en"
            ? "bg-yellow-300 text-green-800"
            : "border border-yellow-300 text-yellow-300 hover:bg-yellow-200 hover:text-green-800"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("rw")}
        className={`px-2 py-1 rounded text-sm ${
          lang === "rw"
            ? "bg-yellow-300 text-green-800"
            : "border border-yellow-300 text-yellow-300 hover:bg-yellow-200 hover:text-green-800"
        }`}
      >
        RW
      </button>
    </div>
  );
}

function AuthButtons({ stacked = false, t, user, logout }) {
  if (user) {
    return (
      <button
        onClick={logout}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
          bg-red-600 text-white hover:bg-red-700
          ${stacked ? "mt-2" : ""}`}
      >
        {t.logout || "Logout"}
      </button>
    );
  }

  return (
    <div
      className={
        stacked ? "flex flex-col gap-2 mt-2" : "flex items-center gap-2"
      }
    >
      <Link
        href="/auth/login"
        className="px-3 py-2 rounded-md text-sm font-medium border border-white text-white hover:bg-white hover:text-green-700"
      >
        {t.login}
      </Link>
      <Link
        href="/auth/register"
        className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-300 text-green-800 hover:bg-yellow-400"
      >
        {t.register}
      </Link>
    </div>
  );
}
