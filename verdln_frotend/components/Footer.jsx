"use client";

import {
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useLanguage } from "@/Context/LanguageContext";

const Footer = ({ lang = "en" }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          {/* Branding */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-extrabold tracking-tight">VerdIna</h2>
            <p className="mt-2 text-green-200">{t.description}</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-12 md:w-2/3 justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg">{t.quickLinks}</h3>
              <Link
                href="/"
                className="hover:text-green-300 transition-colors duration-200"
              >
                {t.home}
              </Link>
              <Link
                href="/ussd"
                className="hover:text-green-300 transition-colors duration-200"
              >
                {t.ussd}
              </Link>
              <Link
                href="/farmer"
                className="hover:text-green-300 transition-colors duration-200"
              >
                {t.requests}
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg">{t.contact}</h3>
              <div className="flex items-center gap-3 hover:text-green-300 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base">+250 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 hover:text-green-300 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base">support@verdina.rw</span>
              </div>
              <div className="flex items-center gap-3 hover:text-green-300 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base">www.verdina.rw</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 border-t border-green-600 pt-6 text-center text-sm text-green-200">
          &copy; {new Date().getFullYear()} VerdIna. {t.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
