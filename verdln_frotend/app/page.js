"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/Context/LanguageContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4"
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
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/auth/register"
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded shadow hover:bg-gray-100"
            >
              {t.getStarted}
            </Link>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/auth/login"
              className="px-6 py-3 border border-white font-semibold rounded hover:bg-green-700 hover:text-white"
            >
              {t.login}
            </Link>
          </motion.div>
        </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.4 },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
          >
            {t.joinNow}
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}

function FeatureCard({ title, desc, link }) {
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
        className="text-green-600 font-semibold hover:underline"
      >
        Learn more →
      </Link>
    </motion.div>
  );
}
