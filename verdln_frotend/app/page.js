"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/Context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t.welcomeTitle}
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
          {t.welcomeSubtitle}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-white text-green-700 font-semibold rounded shadow hover:bg-gray-100"
          >
            {t.getStarted}
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-3 border border-white font-semibold rounded hover:bg-green-700 hover:text-white"
          >
            {t.login}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <FeatureCard
          title={t.farmerDashboard}
          desc={t.farmerDesc}
          link="/farmer/dashboard"
        />
        <FeatureCard
          title={t.adminDashboard}
          desc={t.adminDesc}
          link="/admin/dashboard"
        />
        <FeatureCard title={t.ussd} desc={t.ussdDesc} link="#ussd" />
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-12 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
        <p className="mb-6 text-gray-700">{t.ctaSubtitle}</p>
        <Link
          href="/auth/register"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
        >
          {t.joinNow}
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link
        href={link}
        className="text-green-600 font-semibold hover:underline"
      >
        Learn more →
      </Link>
    </div>
  );
}
