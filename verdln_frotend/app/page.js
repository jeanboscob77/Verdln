"use client";
import React from "react";
import Image from "next/image";
import DynamicHead from "./app";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/LanguageContext";

export default function HomePage() {
  const { t, lang } = useLanguage();

  // 🌍 Localized metadata
  const meta = {
    en: {
      title: "Home | Smart Agri-Loan Platform",
      description:
        "Empowering farmers through accessible loans, input management, and cooperative insights. Discover digital solutions for modern agriculture and financial growth.",
      keywords:
        "agriculture loans, farm financing, digital farming, cooperatives, smart agriculture, loan management",
      image: "/images/og/homepage-preview.png",
      url: `https://yourdomain.com/en`,
    },
    rw: {
      title: "Ahabanza | Urubuga rw’Imari y’Abahinzi",
      description:
        "Dufasha abahinzi kubona inguzanyo zoroshye, gukurikirana inyongeramusaruro no guteza imbere amashyirahamwe y’ubuhinzi hifashishijwe ikoranabuhanga.",
      keywords:
        "inguzanyo z’abahinzi, imari y’ubuhinzi, ubuhinzi bw’ikoranabuhanga, amashyirahamwe, ubuhinzi bw’iterambere, ubuyobozi bw’inguzanyo",
      image: "/images/og/homepage-preview.png",
      url: `https://yourdomain.com/rw`,
    },
  }[lang || "en"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* 🌐 Dynamic SEO Metadata */}
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />
      <motion.div
        className="min-h-screen bg-[#f5f7f2] text-gray-800"
        initial="hidden"
        animate="visible"
      >
        {/* 🌾 HERO SECTION */}
        <section className="relative py-32 px-6 bg-[#edf2ea] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/farmer.jpg"
              alt=""
              className="w-full h-full object-cover opacity-20"
              width={1920}
              height={1080}
            />
          </div>

          <div className="relative z-10 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-extrabold text-green-800 mb-6"
              variants={fadeUp}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-700"
              variants={fadeUp}
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div className="flex justify-center gap-6" variants={fadeUp}>
              <Link
                href="/auth/register"
                className="px-8 py-3 bg-green-700 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition"
              >
                {t.hero.getStarted}
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-3 border border-green-700 font-semibold rounded-xl text-green-700 hover:bg-green-700 hover:text-white transition"
              >
                {t.hero.login}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 🌾 FLOATING IMAGE STRIP */}
        <section className="relative bg-[#f0f4ec] py-10 overflow-hidden">
          <motion.div
            className="flex gap-8"
            style={{
              width: "200%",
              animation: "scrollLeft 30s linear infinite",
            }}
          >
            {[
              "/images/farmer1.jpg",
              "/images/farmer2.jpg",
              "/images/farmer-smiling.jpg",
              "/images/tractor.jpg",
              "/images/crops-closeup.jpg",
              "/images/coop-meeting.jpg",
              "/images/irrigation.jpg",
              "/images/market-day.jpg",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`agri-${i}`}
                className="w-72 h-44 object-cover rounded-xl shadow-md animate-scroll-x"
                width={288}
                height={176}
              />
            ))}
            {/* Duplicate for seamless looping */}
            {[
              "/images/farmer1.jpg",
              "/images/farmer2.jpg",
              "/images/farmer-smiling.jpg",
              "/images/tractor.jpg",
              "/images/crops-closeup.jpg",
              "/images/coop-meeting.jpg",
              "/images/irrigation.jpg",
              "/images/market-day.jpg",
            ].map((src, i) => (
              <Image
                key={`dup-${i}`}
                src={src}
                alt={`agri-${i}`}
                width={288}
                height={176}
                className="w-72 h-44 object-cover rounded-xl shadow-md animate-scroll-x"
              />
            ))}
          </motion.div>

          {/* Simple keyframes for animation */}
          <style jsx>{`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </section>

        {/* 🌿 Overview Cards */}
        <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-4 gap-10 bg-[#eaf0e5]">
          <OverviewCard
            title={t.overview.about.title}
            desc={t.overview.about.desc}
            img="/images/money.avif"
            onClick={() => scrollTo("about-section")}
          />
          <OverviewCard
            title={t.overview.services.title}
            desc={t.overview.services.desc}
            img="/images/services.avif"
            onClick={() => scrollTo("services-section")}
          />
          <OverviewCard
            title={t.overview.partners.title}
            desc={t.overview.partners.desc}
            img="/images/partners.jpg"
            onClick={() => scrollTo("partners-section")}
          />
          <OverviewCard
            title={t.overview.testimonials.title}
            desc={t.overview.testimonials.desc}
            img="/images/testimonies.avif"
            onClick={() => scrollTo("testimonials-section")}
          />
        </section>

        {/* 🏢 About Section */}
        <section id="about-section" className="py-28 px-6 bg-[#f9fbf6]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/farmer_in_field.jpg"
                alt="Farmers working in the field"
                className="rounded-2xl shadow-2xl object-cover w-full h-[450px]"
                width={800}
                height={450}
              />
            </motion.div>
            <div>
              <h2 className="text-4xl font-bold text-green-700 mb-6">
                {t.about.title}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t.about.text}
              </p>
              <Image
                src="/images/map.jpg"
                alt="Digital agriculture map"
                className="rounded-xl mt-4 shadow-md"
                width={800}
                height={600}
              />
            </div>
          </div>
        </section>

        {/* ⚙️ Services Section */}
        <section id="services-section" className="py-28 px-6 bg-[#e8efe3]">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
            {t.services.title}
          </h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
            {[
              {
                title: t.services.items.loan.title,
                img: "/images/loan_application.jpg",
                desc: t.services.items.loan.desc,
              },
              {
                title: t.services.items.input.title,
                img: "/images/input-management.jpg",
                desc: t.services.items.input.desc,
              },
              {
                title: t.services.items.dashboard.title,
                img: "/images/cooperative.jpg",
                desc: t.services.items.dashboard.desc,
              },
              {
                title: t.services.items.analytics.title,
                img: "/images/smart.jpg",
                desc: t.services.items.analytics.desc,
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  className="w-full h-52 object-cover"
                  width={600}
                  height={400}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🤝 Partners */}
        <section
          id="partners-section"
          className="py-28 px-6 bg-[#f9fbf6] text-center"
        >
          <h2 className="text-4xl font-bold text-green-700 mb-10">
            {t.partners.title}
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            {t.partners.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-16">
            {[
              "/images/partner1.jpg",
              "/images/partner2.png",
              "/images/partner3.png",
              "/images/partner4.png",
              "/images/partner5.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                className="w-32 h-16 object-contain opacity-70 hover:opacity-100 transition"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Image
                  key={i}
                  src={src}
                  alt={`Partner ${i + 1}`}
                  width={64}
                  height={64}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💬 Testimonials */}
        <section id="testimonials-section" className="py-28 px-6 bg-[#e8efe3]">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
            {t.testimonials.title}
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                name: t.testimonials.items.t1.name,
                text: t.testimonials.items.t1.text,
                img: "/images/Aline.jpg",
              },
              {
                name: t.testimonials.items.t2.name,
                text: t.testimonials.items.t2.text,
                img: "/images/Emmanuel.jpg",
              },
              {
                name: t.testimonials.items.t3.name,
                text: t.testimonials.items.t3.text,
                img: "/images/claude.jpg",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white rounded-2xl shadow-md border border-gray-100 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Image
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  width={80}
                  height={80}
                />
                <p className="text-gray-600 italic mb-4">
                  &quot;{t.text}&quot;
                </p>
                <h4 className="font-semibold text-green-700">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🌱 CTA */}
        <section className="bg-[#dbe8d1] py-24 text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
            {t.cta.title}
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">{t.cta.title}</p>
          <Link
            href="/auth/register"
            className="px-10 py-4 bg-green-700 text-white font-bold rounded-xl shadow hover:bg-green-600 transition"
          >
            {t.cta.button}
          </Link>
        </section>
      </motion.div>
    </>
  );
}

/* 🧩 Reusable Overview Card */
function OverviewCard({ title, desc, img, onClick }) {
  const { t } = useLanguage();
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200 transition group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={img}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        width={400}
        height={300}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        <button className="text-green-600 font-semibold hover:underline">
          {t.learnMore}→
        </button>
      </div>
    </motion.div>
  );
}
