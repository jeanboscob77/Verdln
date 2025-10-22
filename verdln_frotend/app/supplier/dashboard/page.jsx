"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";
import { apiGet, apiPut } from "@/Utils/api";
import { useProtectedPage } from "@/components/useProtectedPage";
import DynamicHead from "@/app/app";
import {
  User,
  Phone,
  Layers,
  Package,
  Calendar,
  Upload,
  CheckCircle,
  FileText,
} from "lucide-react";

const statusLabels = {
  // Loan status
  Pending: { en: "Pending", rw: "Bitegereje" },
  Approved: { en: "Approved", rw: "Yemejwe" },
  Rejected: { en: "Rejected", rw: "Yanenzwe" },

  // Payment status
  Paid: { en: "Paid", rw: "Byishyuwe" },
  Partial: { en: "Partial", rw: "Igice Cyishyuwe" },
  Unpaid: { en: "Unpaid", rw: "Ntibyishyuwe" },
};

const inputTypeTranslations = {
  Seeds: { en: "Seeds", rw: "Imbuto" },
  Fertilizers: { en: "Fertilizers", rw: "Ifumbire" },
  Pesticides: { en: "Pesticides", rw: "Ibiyobyabwenge byo kurwanya udukoko" },
};

// Input subtypes by type
const inputSubTypeTranslations = {
  Seeds: {
    "Rice Seeds": { en: "Rice Seeds", rw: "Imbuto z’umuceri" },
    "Beans Seeds": { en: "Beans Seeds", rw: "Imbuto z’ibishyimbo" },
    "Maize Seeds": { en: "Maize Seeds", rw: "Imbuto z’ibigori" },
  },
  Fertilizers: {
    NPK: { en: "NPK", rw: "NPK" },
    DAP: { en: "DAP", rw: "DAP" },
    UREA: { en: "UREA", rw: "UREA" },
  },
  Pesticides: {
    Herbicide: { en: "Herbicide", rw: "Herbiside" },
    Fungicide: { en: "Fungicide", rw: "Fungiside" },
    Insecticide: { en: "Insecticide", rw: "Insektiside" },
  },
};

export default function SupplierPage() {
  useProtectedPage();
  const { user, loading } = useAuth();
  const { t, lang } = useLanguage();
  // --- Meta for SEO ---
  const meta = {
    en: {
      title: "Assigned Loans | Smart Agri-Loan Platform",
      description:
        "View and manage loans assigned to you as a supplier, track delivery status, and upload delivery documents.",
      keywords:
        "supplier loans, loan delivery, agricultural inputs, smart farming, loan management",
      image: "/images/og/supplier-loans.png",
      url: `https://yourdomain.com/supplier-loans`,
    },
    rw: {
      title: "Inguzanyo Zahawe | Urubuga rw’Imari y’Abahinzi",
      description:
        "Reba kandi utegure inguzanyo wahawe nka supplier, ugenzure uko gutanga bihagaze, kandi upakishe inyandiko.",
      keywords:
        "inguzanyo zahawe supplier, gutanga inguzanyo, ibikoresho by’ubuhinzi, ubuhinzi bw’ikoranabuhanga",
      image: "/images/og/supplier-loans.png",
      url: `https://yourdomain.com/supplier-loans`,
    },
  }[lang || "en"];

  const [loans, setLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [uploadingId, setUploadingId] = useState(null);

  // Fetch assigned loans
  const fetchLoans = async () => {
    if (!user) return;
    try {
      const res = await apiGet(`/loans/supplier/${user.id}`);
      setLoans(res.requests || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading && user) fetchLoans();
  }, [loading, user]);

  // Handle file upload
  const handleFileUpload = async (loanId, file) => {
    if (!file) return;
    try {
      setUploadingId(loanId);
      const formData = new FormData();
      formData.append("document", file);

      await apiPut(`/loans/${loanId}/deliver`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchLoans();
    } catch (err) {
      alert(err.message || "Failed to upload document");
    } finally {
      setUploadingId(null);
    }
  };

  console.log(loans);
  // Filter loans based on active tab
  const filteredLoans = loans.filter((loan) =>
    activeTab === "pending" ? !loan.delivered : loan.delivered
  );

  const getFileName = (path) => path?.split("/").pop() || "";

  const openDocument = (url) => {
    if (!url) return;
    window.open(`http://localhost:4000${url}`, "_blank");
  };

  return (
    <>
      {/* 🌐 Dynamic Meta */}
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />

      <div className="p-4 min-h-screen bg-gray-50 space-y-4">
        <h1 className="text-3xl font-bold text-green-700">
          {t.assignedLoans || "Assigned Loans"}
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "pending"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            {t.pending || "Pending"}
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "delivered"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("delivered")}
          >
            {t.delivered || "Delivered"}
          </button>
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            {t.noLoans || "No loans found"}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {filteredLoans.map((loan) => (
            <section
              key={loan.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
            >
              {/* Farmer Info */}
              <h2 className="font-bold text-lg border-b pb-1">
                {t.farmerInfo}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <User className="w-5 h-5" /> {loan.farmer_name}
                </p>
                <p className="flex items-center gap-1">
                  <Phone className="w-5 h-5" /> {loan.farmer_phone}
                </p>
                <p className="flex items-center gap-1">
                  <Layers className="w-5 h-5" />{" "}
                  {inputTypeTranslations[loan.input_type]?.[lang] ||
                    loan.input_type}
                  /{" "}
                  {inputSubTypeTranslations[loan.input_type]?.[
                    loan.input_subtype
                  ]?.[lang] || loan.input_subtype}
                </p>
              </div>

              {/* Loan Details */}
              <h2 className="font-bold text-lg border-b pb-1 mt-2">
                {t.loanDetails || "Loan Details"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <Package className="w-5 h-5" /> {loan.package_size} ({t.price}
                  : {loan.price})
                </p>
                <p>
                  {t.loanAmount}: {loan.loan_amount}
                </p>
                <p>
                  {t.total}: {loan.total_amount}
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />{" "}
                  {loan.repayment_date?.split("T")[0]}
                </p>
                <p>
                  {t.status}:{" "}
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${
                      loan.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : loan.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {statusLabels[loan.status]?.[lang] || t.Pending}
                  </span>
                </p>
              </div>

              {/* Delivery */}
              <h2 className="font-bold text-lg border-b pb-1 mt-2">
                {t.delivery}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-2">
                {loan.delivered ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" />
                    <span>{t.delivered}</span>
                    {loan.document_url && (
                      <button
                        onClick={() => openDocument(loan.document_url)}
                        className="flex items-center gap-1 text-blue-600 underline"
                      >
                        <FileText className="w-4 h-4" />{" "}
                        {getFileName(loan.document_url)}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileUpload(loan.id, e.target.files[0])
                      }
                      disabled={uploadingId === loan.id}
                      className="border p-1 rounded"
                    />
                    {uploadingId === loan.id && <p>{t.uploading}</p>}
                  </>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
