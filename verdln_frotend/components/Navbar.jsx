"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";
import {
  Home,
  User,
  Shield,
  Truck,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Globe,
  FileText,
  Users,
  PlusCircle,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const links = [
    {
      label: t.home,
      href: "/",
      roles: ["guest", "farmer", "admin", "supplier", "investor"],
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: t.farmer,
      href: "/farmer/dashboard",
      roles: ["farmer"],
      icon: <User className="w-4 h-4" />,
      children: [
        {
          label: t.loanRequestLink || "Request Loan",
          href: "/farmer/loan/request",
          icon: <PlusCircle className="w-4 h-4" />,
        },
        {
          label: t.viewRequestedLoans,
          href: "/farmer/loan/view",
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
    {
      label: t.admin,
      href: "/admin/dashboard",
      roles: ["admin"],
      icon: <Shield className="w-4 h-4" />,
      children: [
        {
          label: t.createSupplier,
          href: "/admin/create-supplier",
          icon: <PlusCircle className="w-4 h-4" />,
        },
        {
          label: t.viewloanRequests,
          href: "/admin/loan/view",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          label: t.DeliveredPayments,
          href: "/admin/delivered",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          label: t.reports,
          href: "/admin/reports",
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
    {
      label: t.supplier || "Supplier",
      href: "/supplier/dashboard",
      roles: ["supplier"],
      icon: <Truck className="w-4 h-4" />,
    },
    {
      label: "Investor",
      href: "/investor/dashboard",
      roles: ["investor"],
      icon: <Users className="w-4 h-4" />,
    },
  ];

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
            <Link href="/" className="font-extrabold text-lg">
              {t.appName}
            </Link>
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
                icon={link.icon}
                children={link.children}
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
              <MobileNavLink
                key={link.href}
                label={link.label}
                href={link.href}
                pathname={pathname}
                icon={link.icon}
                children={link.children}
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

/* -------------------- Desktop NavLink -------------------- */
function NavLink({ label, href, pathname, icon, children }) {
  const [open, setOpen] = useState(false);
  const isActive =
    pathname === href ||
    (children && children.some((c) => c.href === pathname));

  if (!children) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-white text-green-700 font-semibold"
            : "text-white hover:text-yellow-200"
        }`}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-white text-green-700 font-semibold"
            : "text-white hover:text-yellow-200"
        }`}
      >
        {icon}
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-56 bg-gray-300 rounded-md shadow-lg border border-gray-200 z-50">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-yellow-100 ${
                pathname === child.href ? "bg-yellow-200 font-semibold" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {child.icon}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------- Auth Buttons -------------------- */
function AuthButtons({ stacked = false, t, user, logout }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  if (user) {
    return (
      <button
        onClick={logout}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        bg-red-600 text-white hover:bg-red-700 flex items-center gap-2
        ${stacked ? "mt-2" : ""}`}
      >
        <LogOut className="w-4 h-4" />
        {t.logout || "Logout"}
      </button>
    );
  }

  return (
    <div
      className={
        stacked ? "flex flex-col gap-2 mt-2" : "flex items-center gap-3"
      }
    >
      {/* Login dropdown */}
      <div className="relative">
        <button
          onClick={() => setLoginOpen(!loginOpen)}
          className="px-3 py-2 rounded-md text-sm font-medium border border-white text-white hover:bg-white hover:text-green-700 flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          {t.login}
          <ChevronDown className="w-4 h-4" />
        </button>
        {loginOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-green-800 rounded-md shadow-lg border z-50">
            {["farmer", "admin", "supplier", "investor"].map((role) => (
              <Link
                key={role}
                href={`/auth/login?role=${role}`}
                className="block px-4 py-2 text-sm hover:bg-yellow-100"
                onClick={() => setLoginOpen(false)}
              >
                {t.LoginAs}
                {t.roleNamesRW[role] ||
                  role.charAt(0).toUpperCase() + role.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Register dropdown */}
      <div className="relative">
        <button
          onClick={() => setRegisterOpen(!registerOpen)}
          className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-300 text-green-900 hover:bg-yellow-400 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          {t.register}
          <ChevronDown className="w-4 h-4" />
        </button>
        {registerOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-green-800 rounded-md shadow-lg border z-50">
            {["farmer", "investor"].map((role) => (
              <Link
                key={role}
                href={`/auth/register?role=${role}`}
                className="block px-4 py-2 text-sm hover:bg-yellow-100"
                onClick={() => setRegisterOpen(false)}
              >
                {t.RegisterAs}{" "}
                {t.roleNamesRW[role] ||
                  role.charAt(0).toUpperCase() + role.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------- Language Switcher -------------------- */
function LangSwitcher({ lang, setLang, compact = false }) {
  const [open, setOpen] = useState(false);
  const languages = [
    { code: "en", label: "English" },
    { code: "rw", label: "Kinyarwanda" },
  ];
  const currentLang = languages.find((l) => l.code === lang);

  if (compact) {
    return (
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="px-2 py-1 border rounded text-sm text-green-700 bg-white focus:outline-none"
      >
        {languages.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 rounded-md border border-yellow-300 bg-white text-green-700 hover:bg-yellow-100 transition"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLang?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-md shadow-lg border border-gray-200 z-50">
          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => {
                setLang(lng.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-500 transition ${
                lang === lng.code ? "bg-yellow-700 font-semibold" : ""
              }`}
            >
              {lng.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
