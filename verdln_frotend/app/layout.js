import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/Context/LanguageContext";
import { AuthProvider } from "@/Context/AuthContext";
import LanguageSetter from "@/components/LanguageSetter";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Home | Smart Agri-Loan Platform",
  description:
    "Empowering farmers through accessible loans, input management, and cooperative insights. Discover digital solutions for modern agriculture and financial growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <LanguageSetter />
            {children}
            <ScrollToTop />
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
