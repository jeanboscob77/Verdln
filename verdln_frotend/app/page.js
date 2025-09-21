"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/Context/LanguageContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow"
          variants={itemVariants}
        >
          {t.welcomeTitle}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {t.welcomeSubtitle}
        </motion.p>
        <motion.div
          className="flex justify-center gap-4"
          variants={itemVariants}
        >
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
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <FeatureCard
          title={t.farmerDashboard}
          desc={t.farmerDesc}
          link="#farmer-section"
          t={t}
        />
        <FeatureCard
          title={t.adminDashboardTitle}
          desc={t.adminDesc}
          link="#dashboard-section"
          t={t}
        />
        <FeatureCard
          title={t.ussd}
          desc={t.ussdDesc}
          link="#ussd-section"
          t={t}
        />
      </section>

      {/* Detailed Sections */}
      <div className="mt-20 mx-auto w-11/12 max-w-5xl space-y-24 scroll-smooth">
        <DetailSection
          id="farmer-section"
          title={t.farmerDashboard}
          desc={t.farmer_details}
          points={t.farmer_points}
          icon="🧑‍🌾"
        />
        <DetailSection
          id="dashboard-section"
          title={t.adminDashboardTitle}
          desc={t.dashboard_details}
          points={t.dashboard_points}
          icon="🖥️"
        />
        <DetailSection
          id="ussd-section"
          title={t.ussdTitle}
          desc={t.ussd_details}
          points={t.ussd_points}
          icon="📱"
        />
      </div>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16 text-center px-6 mt-16">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          {t.ctaTitle}
        </motion.h2>
        <motion.p
          className="mb-6 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          }}
        >
          {t.ctaSubtitle}
        </motion.p>
        <Link
          href="/auth/register"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition"
        >
          {t.joinNow}
        </Link>
      </section>
    </motion.div>
  );
}

function FeatureCard({ title, desc, link, t }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link
        href={link}
        scroll={true}
        className="text-green-600 font-semibold hover:underline"
      >
        {t.learnMore} →
      </Link>
    </motion.div>
  );
}

function DetailSection({ id, title, desc, points, icon }) {
  return (
    <section
      id={id}
      className="bg-white p-10 rounded-2xl shadow-lg border-l-4 border-green-600"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">{desc}</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
