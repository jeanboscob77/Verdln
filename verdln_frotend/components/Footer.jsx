"use client";

import {
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useLanguage } from "@/Context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1f4720] text-green-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Branding */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Verdln
            </h2>
            <p className="text-green-200">{t.footer.description}</p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo("about-section")}
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  {t.footer.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services-section")}
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  {t.footer.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("partners-section")}
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  {t.footer.partners}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("testimonials-section")}
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  {t.footer.testimonials}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.contact}</h3>
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
              <span className="text-sm sm:text-base">support@verdln.rw</span>
            </div>
            <div className="flex items-center gap-3 hover:text-green-300 transition-colors duration-200">
              <div className="bg-green-600 p-2 rounded-full flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base">www.verdln.rw</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-green-600 pt-6 text-center text-sm text-green-200">
          &copy; {new Date().getFullYear()} Verdln. {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
