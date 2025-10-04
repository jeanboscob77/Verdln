"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";
import { apiGet, apiPost } from "@/Utils/api";
import { useProtectedPage } from "@/components/useProtectedPage";
import {
  User,
  Truck,
  FileText,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  History,
} from "lucide-react";

export default function AdminProofsPage() {
  useProtectedPage();
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("All"); // Tabs: All, Paid, Partial, Unpaid
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [submitting, setSubmitting] = useState(false);
  const [histories, setHistories] = useState({}); // {loanId: [payments...]}

  const fetchDeliveredLoans = async () => {
    try {
      const res = await apiGet("/repayments/loans/delivered");
      setLoans(res.requests || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchDeliveredLoans();
    }
  }, [loading, user]);

  // Filter loans based on activeTab
  useEffect(() => {
    let filtered = loans;
    if (activeTab === "Paid") {
      filtered = loans.filter((l) => l.payment_status === "Paid");
    } else if (activeTab === "Partial") {
      filtered = loans.filter((l) => l.payment_status === "Partial");
    } else if (activeTab === "Unpaid") {
      filtered = loans.filter(
        (l) => !l.payment_status || l.payment_status === "Unpaid"
      );
    }
    setFilteredLoans(filtered);
  }, [activeTab, loans]);

  const openDocument = (url) => {
    if (!url) return;
    window.open(`${process.env.NEXT_PUBLIC_API_URL}${url}`, "_blank");
  };

  console.log(loans);
  const openPaymentModal = (loan) => {
    setSelectedLoan(loan);
    setAmount("");
    setMethod("Cash");
    setModalOpen(true);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount)) {
      alert("Enter a valid amount");
      return;
    }
    try {
      setSubmitting(true);
      await apiPost(`/repayments/pay`, {
        loan_request_id: selectedLoan.id,
        farmer_id: selectedLoan.farmer_id,
        amount,
        method,
      });
      setModalOpen(false);
      fetchDeliveredLoans();
      fetchHistory(selectedLoan.id); // refresh history too
    } catch (err) {
      console.error(err);
      alert("Failed to record payment");
    } finally {
      setSubmitting(false);
    }
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
    } else {
      fetchHistory(loanId);
    }
  };

  console.log(histories);

  const tabs = ["All", "Paid", "Partial", "Unpaid"];

  return (
    <div className="p-4 min-h-screen bg-gray-50 space-y-4">
      <h1 className="text-3xl font-bold text-green-700">
        {t.proofs || "Delivered Loans & Proofs"}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {t.tabs[tab.toLowerCase()]}
          </button>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          {t.noLoans || "No delivered loans found"}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredLoans.map((loan) => (
          <section
            key={loan.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
          >
            {/* Loan Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <p className="flex items-center gap-1">
                <User className="w-5 h-5" /> {t.farmer}: {loan.farmer_name}
              </p>
              <p className="flex items-center gap-1">
                <Truck className="w-5 h-5" /> {t.supplier}: {loan.supplier_name}
              </p>
              <p className="flex items-center gap-1">
                <FileText className="w-5 h-5" /> {t.loanAmount}:{" "}
                {loan.total_loan_amount}
              </p>
            </div>

            {/* Delivered Info */}
            <div className="flex items-center gap-2 mt-2 text-green-700 font-semibold">
              <CheckCircle className="w-5 h-5" />
              {t.deliveredON}:{" "}
              {loan.delivered_date
                ? new Date(loan.delivered_date).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Document / Proof */}
            <div className="mt-2 flex flex-col gap-2">
              <h2 className="font-semibold">{t.proofDocument}</h2>
              {loan.document_url ? (
                <button
                  onClick={() => openDocument(loan.document_url)}
                  className="flex items-center gap-2 text-blue-600 underline"
                >
                  <FileText className="w-5 h-5" /> {t.viewDocument}
                </button>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle /> {t.noDocumentProvided}
                </div>
              )}
            </div>

            {/* Repayment Summary */}
            <div className="mt-2">
              <h2 className="font-semibold">{t.repaymentHistory}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <DollarSign className="w-5 h-5 text-green-600" /> {t.paid}:{" "}
                  {loan.paid_amount || 0}
                </p>
                <p className="flex items-center gap-1">
                  <DollarSign className="w-5 h-5 text-red-600" /> {t.remaining}:{" "}
                  {loan.remaining_amount || loan.loan_amount}
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" /> {t.status}:{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      loan.payment_status === "Paid"
                        ? "bg-green-600"
                        : loan.payment_status === "Partial"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {
                      t.repaymentStatus[
                        loan.payment_status?.toLowerCase() || "unpaid"
                      ]
                    }
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">
                {loan.payment_status !== "Paid" && (
                  <button
                    onClick={() => openPaymentModal(loan)}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                  >
                    {t.recordPayment}
                  </button>
                )}
                <button
                  onClick={() => toggleHistory(loan.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700 flex items-center gap-2"
                >
                  <History className="w-5 h-5" />{" "}
                  {histories[loan.id] ? t.hideHistory : t.viewHistory}
                </button>
              </div>
            </div>

            {/* Payment History */}
            {histories[loan.id] && (
              <div className="mt-4 border-t pt-3">
                <h3 className="font-semibold mb-2">{t.paymentHistory}</h3>
                {histories[loan.id].length === 0 ? (
                  <p className="text-gray-500">{t.noPaymentMade}</p>
                ) : (
                  <ul className="space-y-2">
                    {histories[loan.id].map((p) => (
                      <li
                        key={p.id}
                        className="flex justify-between bg-gray-100 px-3 py-2 rounded"
                      >
                        <span>
                          {p.method} - <strong>{p.amount}</strong>
                        </span>
                        <span>
                          {new Date(p.payment_date).toLocaleString("en-GB", {
                            timeZone: "Africa/Kigali",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })}
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
              {t.loanAmount}: <strong>{selectedLoan.total_loan_amount}</strong>
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
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePayment}
                disabled={submitting}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {submitting ? t.saving : t.savePayment}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
