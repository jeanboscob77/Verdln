"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/LanguageContext";

export default function FarmerDashboard() {
  const { t } = useLanguage();

  // Form state
  const [inputType, setInputType] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy data
  const [requests, setRequests] = useState([
    {
      id: 1,
      input_type: "Fertilizer",
      package_size: "50kg",
      repayment_date: "2025-09-15",
      amount: 50000,
      status: "Pending",
    },
    {
      id: 2,
      input_type: "Seeds",
      package_size: "20kg",
      repayment_date: "2025-10-01",
      amount: 20000,
      status: "Approved",
    },
  ]);

  const [repayments, setRepayments] = useState([
    {
      id: 1,
      amount: 25000,
      date: "2025-08-15",
      method: "Mobile Money",
    },
    {
      id: 2,
      amount: 15000,
      date: "2025-08-20",
      method: "Bank Transfer",
    },
  ]);

  // Form submission simulation
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!inputType || !packageSize || !repaymentDate) {
      setError(t.required);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newRequest = {
        id: requests.length + 1,
        input_type: inputType,
        package_size: packageSize,
        repayment_date: repaymentDate,
        amount: amount || 0,
        status: "Pending",
      };
      setRequests([newRequest, ...requests]);
      setInputType("");
      setPackageSize("");
      setRepaymentDate("");
      setAmount("");
      setLoading(false);
    }, 500);
  }

  // Helper to color status
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{t.farmerDashboard}</h1>

        {/* Request Submission Form */}
        <section className="mb-8 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-4">{t.submitRequest}</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span>{t.inputType}</span>
              <input
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>
            <label className="block">
              <span>{t.packageSize}</span>
              <input
                value={packageSize}
                onChange={(e) => setPackageSize(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>
            <label className="block">
              <span>{t.repaymentDate}</span>
              <input
                type="date"
                value={repaymentDate}
                onChange={(e) => setRepaymentDate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>
            <label className="block">
              <span>{t.amountOptional}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {loading ? "..." : t.submit}
            </button>
          </form>
        </section>

        {/* My Requests Table */}
        <section className="mb-8">
          <h2 className="font-semibold mb-2">{t.myRequests}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">{t.inputType}</th>
                  <th className="px-4 py-2">{t.packageSize}</th>
                  <th className="px-4 py-2">{t.repaymentDate}</th>
                  <th className="px-4 py-2">{t.amount}</th>
                  <th className="px-4 py-2">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {requests.length ? (
                  requests.map((r) => (
                    <tr key={r.id} className="text-center border-t">
                      <td className="px-4 py-2">{r.input_type}</td>
                      <td className="px-4 py-2">{r.package_size}</td>
                      <td className="px-4 py-2">{r.repayment_date}</td>
                      <td className="px-4 py-2">{r.amount}</td>
                      <td
                        className={`px-4 py-2 rounded ${statusColor(r.status)}`}
                      >
                        {r.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      {t.noRequests}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Repayment History Table */}
        <section className="mb-8">
          <h2 className="font-semibold mb-2">{t.repaymentHistory}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">{t.amount}</th>
                  <th className="px-4 py-2">{t.repaymentDate}</th>
                  <th className="px-4 py-2">{t.method}</th>
                </tr>
              </thead>
              <tbody>
                {repayments.length ? (
                  repayments.map((r) => (
                    <tr key={r.id} className="text-center border-t">
                      <td className="px-4 py-2">{r.amount}</td>
                      <td className="px-4 py-2">{r.date}</td>
                      <td className="px-4 py-2">{r.method}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      {t.noRepayments}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
