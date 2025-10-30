"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useRouter } from "next/navigation";
import { apiGet, apiPostUpload } from "@/Utils/api"; // for multipart/form-data
import { useAuth } from "@/Context/AuthContext";
import { useProtectedPage } from "@/components/useProtectedPage";
import DynamicHead from "@/app/app";
import {
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  History,
  Upload,
} from "lucide-react";

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

export default function ViewLoans() {
  useProtectedPage();
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { user, loading } = useAuth();

  // --- Meta for SEO ---
  const meta = {
    en: {
      title: "My Loan Requests | Smart Agri-Loan Platform",
      description:
        "View your agricultural loan requests, track repayment status, and manage payments.",
      keywords:
        "farmer loans, loan tracking, repayment status, agricultural inputs, smart farming",
      image: "/images/og/view-loans.png",
      url: `https://yourdomain.com/view-loans`,
    },
    rw: {
      title: "Inguzanyo Zanjye | Urubuga rw’Imari y’Abahinzi",
      description:
        "Reba inguzanyo zawe z’ubuhinzi, ugenzure uko kwishyura bihagaze, kandi utegure kwishyura.",
      keywords:
        "inguzanyo y’umuhinzi, kugenzura inguzanyo, uko kwishyura bihagaze, ibikoresho by’ubuhinzi",
      image: "/images/og/view-loans.png",
      url: `https://yourdomain.com/view-loans`,
    },
  }[lang || "en"];

  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [histories, setHistories] = useState({}); // {loanId: [payments...]}

  const statusLabels = {
    Pending: { en: "Pending", rw: "Bitegereje" },
    Approved: { en: "Approved", rw: "Yemejwe" },
    Rejected: { en: "Rejected", rw: "Yanenzwe" },
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
    else fetchData();
  }, [user, loading, router]);

  async function fetchData() {
    try {
      const res = await apiGet(`/loans/farmer/${user?.id}`);
      setRequests(res.requests || []);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredRequests =
    activeTab === "All"
      ? requests
      : requests.filter(
          (r) =>
            r.status?.trim()?.charAt(0).toUpperCase() +
              r.status?.trim()?.slice(1) ===
            activeTab
        );

  const tabs = ["All", "Pending", "Approved", "Rejected"];

  const openDocument = (url) => {
    if (!url) return;
    window.open(`http://localhost:4000${url}`, "_blank");
  };

  const fetchHistory = async (loanId) => {
    try {
      const res = await apiGet(`/repayments/${loanId}/history`);
      setHistories((prev) => ({ ...prev, [loanId]: res.history || [] }));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleHistory = (loanId) => {
    if (histories[loanId]) {
      setHistories((prev) => {
        const newData = { ...prev };
        delete newData[loanId];
        return newData;
      });
    } else fetchHistory(loanId);
  };

  const openPaymentModal = (loan) => {
    setSelectedLoan(loan);
    setAmount("");
    setMethod("Cash");
    setFile(null);
    setModalOpen(true);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount)) {
      alert("Enter a valid amount");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("loan_request_id", selectedLoan.id);
      formData.append("farmer_id", selectedLoan.farmer_id);
      formData.append("amount", amount);
      formData.append("method", method);
      if (file) formData.append("document", file);

      await apiPostUpload(`/repayments/pay`, formData);
      setModalOpen(false);
      fetchData();
      fetchHistory(selectedLoan.id);
    } catch (err) {
      console.error(err);
      alert("Failed to record payment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user)
    return (
      <div className="min-h-screen">
        <div className="flex items-start justify-center text-2xl text-center mt-10">
          {t.loading || "Loading..."}
        </div>
      </div>
    );

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
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-5xl mx-auto p-4 space-y-6">
          <h1 className="text-2xl font-bold mb-4">{t.myRequests}</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tab === "All"
                  ? t.all || "All"
                  : statusLabels[tab]?.[lang] || tab}
              </button>
            ))}
          </div>

          {/* Requests */}
          {filteredRequests.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              {t.noRequests || "No requests found"}
            </div>
          )}

          <div className="space-y-4">
            {filteredRequests.map((r) => (
              <section
                key={r.id}
                className="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
              >
                {/* Product Info */}
                <p className="flex items-center gap-2">
                  <FileText className="w-5 h-5" /> {t.Type}:{" "}
                  {inputTypeTranslations[r.input_type]?.[lang] || r.input_type}/{" "}
                  {inputSubTypeTranslations[r.input_type]?.[r.input_subtype]?.[
                    lang
                  ] || r.input_subtype}
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />{" "}
                  {t.packageSize}: {r.package_size} {r.unit}
                </p>
                {/* Loan Info */}
                <div className="space-y-2">
                  {/* Loan & Interest Info */}
                  <p className="flex items-center gap-2">
                    {t.price}: {r.price || 0} FRW
                  </p>

                  <p className="flex items-center gap-2">
                    {t.loanAmount}: {r.loan_amount} FRW
                  </p>
                  <p className="flex items-center gap-2">
                    {t.interest}: {r.interest_amount || 0} FRW
                  </p>
                  <p className="flex items-center gap-2">
                    {t.totalLoanWithInterest}: {r.total_loan_amount} FRW
                  </p>

                  {/* Other Details */}
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> {t.repaymentDate}:{" "}
                    {new Date(r.repayment_date).toLocaleDateString()}
                  </p>
                  <p
                    className={`flex items-center gap-2 px-2 py-1 rounded ${statusColor(
                      r.status
                    )}`}
                  >
                    {t.status}:{" "}
                    {statusLabels[
                      r.status?.trim()?.charAt(0).toUpperCase() +
                        r.status?.trim()?.slice(1)
                    ]?.[lang] || r.status}
                  </p>
                </div>
                <p className="bg-slate-200 p-1">
                  <span className="font-bold text-gray-500 bg-blue-200 p-1 rounded">
                    {t.reason}:
                  </span>{" "}
                  {r.notes}
                </p>
                {/* Request Document */}
                {r.document_url && (
                  <p
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => openDocument(r.document_url)}
                  >
                    <FileText className="w-5 h-5 text-blue-600" />{" "}
                    {t.veiwPaymentProof || "View Request Document"}
                  </p>
                )}

                {r.status !== "Pending" &&
                  r.status !== "Rejected" &&
                  r.document_url && (
                    /* Repayment Summary */
                    <div className="mt-2">
                      <h2 className="font-semibold">{t.repaymentSummary}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <p className="flex items-center gap-2">
                          {t.paid}: {r.paid_amount || 0} FRW
                        </p>
                        <p className="flex items-center gap-2">
                          {t.remaining}:{" "}
                          {parseFloat(r.remaining_amount) ||
                            parseFloat(r.loan_amount) +
                              parseFloat(r.interest_amount || 0)}{" "}
                          FRW
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" /> {t.status}:{" "}
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              r.payment_status === "Paid"
                                ? "bg-green-600"
                                : r.payment_status === "Partial"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          >
                            {
                              t.repaymentStatus[
                                r.payment_status?.toLowerCase() || "unpaid"
                              ]
                            }
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-3 mt-3">
                        {r.payment_status !== "Paid" && (
                          <button
                            onClick={() => openPaymentModal(r)}
                            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />{" "}
                            {t.recordPayment || "Record Payment"}
                          </button>
                        )}
                        <button
                          onClick={() => toggleHistory(r.id)}
                          className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700 flex items-center gap-2"
                        >
                          <History className="w-5 h-5" />{" "}
                          {histories[r.id] ? t.hideHistory : t.viewHistory}
                        </button>
                      </div>
                    </div>
                  )}
                {/* Payment History */}

                {r.status !== "Pending" && histories[r.id] && (
                  <div className="mt-4 border-t pt-3">
                    <h3 className="font-semibold mb-2">{t.paymentHistory}</h3>
                    {histories[r.id].length === 0 ? (
                      <p className="text-gray-500">{t.noPaymentmentsMade}</p>
                    ) : (
                      <ul className="space-y-2">
                        {histories[r.id].map((p) => (
                          <li
                            key={p.id}
                            className="flex justify-between bg-gray-100 px-3 py-2 rounded"
                          >
                            <span>
                              {p.method} - <strong>{p.amount}</strong>{" "}
                              {p.document_url && (
                                <span
                                  className="text-blue-600 cursor-pointer"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.NEXT_PUBLIC_API_URL}${p.document_url}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  [Proof]
                                </span>
                              )}
                            </span>
                            <span>
                              {new Date(p.payment_date).toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Payment Modal */}
          {modalOpen && selectedLoan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold">{t.recordPayment}</h2>
                <p>
                  {t.farmer}: <strong>{selectedLoan.farmer_name}</strong>
                </p>
                <p>
                  {t.loanAmount}: <strong>{selectedLoan.loan_amount}</strong>
                </p>
                <p>
                  {t.remaining}:{" "}
                  <strong>
                    {selectedLoan.remaining_amount || selectedLoan.loan_amount}
                  </strong>
                </p>

                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Cash">{t.cash}</option>
                    <option value="Mobile Money">{t.mobileMoney}</option>
                    <option value="Bank">{t.bankTransfer}</option>
                  </select>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    {t.cancel || "Cancel"}
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={submitting}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    {submitting ? "Saving..." : "Save Payment"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
