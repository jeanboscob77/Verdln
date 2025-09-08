"use client";
import { useLanguage } from "@/Context/LanguageContext";
import Typewriter from "typewriter-effect";

export default function UssdPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">{t.ussdTitle}</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        {t.ussdDescription}
      </p>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">{t.howToAccess}</h2>
        <ul className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ul>
      </div>

      {/* Phone mockup */}
      <div className="flex justify-center mb-8">
        <div className="w-64 h-96 bg-black rounded-3xl relative shadow-lg flex flex-col items-center justify-center">
          {/* Screen */}
          <div className="bg-white w-56 h-80 rounded-2xl flex items-center justify-center text-center p-4">
            <p className="text-2xl font-bold text-green-700">
              <Typewriter
                options={{
                  strings: ["*123#"],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 60,
                }}
              />
            </p>
          </div>
          {/* Home button */}
          <div className="w-12 h-12 bg-gray-800 rounded-full absolute bottom-3"></div>
        </div>
      </div>

      <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center">
        <p className="text-lg font-medium">{t.ussdCodeInfo}</p>
        <p className="text-2xl font-bold text-green-700 mt-2 animate-bounce">
          *123#
        </p>
      </div>
    </div>
  );
}
