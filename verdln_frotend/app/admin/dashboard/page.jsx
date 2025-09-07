"use client";
import React, { useState } from "react";
import { useLanguage } from "@/Context/LanguageContext";

export default function AdminDashboard() {
  const { t } = useLanguage();

  // Dummy loan requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      farmer: "Alice",
      input: "Seeds",
      package: "5kg",
      amount: 100,
      status: "Pending",
      notes: "",
      repayments: [],
    },
    {
      id: 2,
      farmer: "Bob",
      input: "Fertilizer",
      package: "10kg",
      amount: 150,
      status: "Approved",
      notes: "",
      repayments: [],
    },
  ]);

  const [selectedRepayment, setSelectedRepayment] = useState(null);
  const [repayAmount, setRepayAmount] = useState("");
  const [repayMethod, setRepayMethod] = useState("Cash");

  // Approve/Reject handlers
  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Add admin notes
  const handleAddNotes = (id, notes) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)));
  };

  // Submit repayment for a specific farmer
  const handleRepayment = (e) => {
    e.preventDefault();
    if (!selectedRepayment) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRepayment.id
          ? {
              ...r,
              repayments: [
                ...r.repayments,
                {
                  amount: repayAmount,
                  method: repayMethod,
                  date: new Date().toLocaleDateString(),
                },
              ],
            }
          : r
      )
    );

    setRepayAmount("");
    setRepayMethod("Cash");
    setSelectedRepayment(null);
  };

  // Calculate summary
  const totalLoans = requests.reduce((acc, r) => acc + r.amount, 0);
  const totalRepayments = requests.reduce(
    (acc, r) => acc + r.repayments.reduce((a, p) => a + Number(p.amount), 0),
    0
  );
  const pendingRequests = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t.adminDashboardTitle}</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">{t.totalLoans}</h2>
          <p>{totalLoans}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">{t.totalRepayments}</h2>
          <p>{totalRepayments}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">{t.pendingRequests}</h2>
          <p>{pendingRequests}</p>
        </div>
      </div>

      {/* Loan Requests Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">{t.farmer}</th>
              <th className="p-2 border">{t.input}</th>
              <th className="p-2 border">{t.package}</th>
              <th className="p-2 border">{t.amount}</th>
              <th className="p-2 border">{t.status}</th>
              <th className="p-2 border">{t.notes}</th>
              <th className="p-2 border">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="p-2 border">{r.farmer}</td>
                <td className="p-2 border">{r.input}</td>
                <td className="p-2 border">{r.package}</td>
                <td className="p-2 border">{r.amount}</td>
                <td
                  className={`p-2 border font-semibold ${
                    r.status === "Pending"
                      ? "text-yellow-600"
                      : r.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {r.status}
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="border p-1 rounded w-full"
                    value={r.notes}
                    onChange={(e) => handleAddNotes(r.id, e.target.value)}
                  />
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-green-600 text-white rounded"
                    onClick={() => handleStatusChange(r.id, "Approved")}
                  >
                    {t.approve}
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleStatusChange(r.id, "Rejected")}
                  >
                    {t.reject}
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => setSelectedRepayment(r)}
                  >
                    {t.repay}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Repayment Form */}
      {selectedRepayment && (
        <div className="p-4 bg-white rounded shadow mb-6">
          <h2 className="font-semibold mb-2">
            {t.repay} {selectedRepayment.farmer}
          </h2>
          <form className="space-y-3" onSubmit={handleRepayment}>
            <input
              type="number"
              placeholder={t.amount}
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <select
              value={repayMethod}
              onChange={(e) => setRepayMethod(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Cash">{t.cash}</option>
              <option value="MobileMoney">{t.mobileMoney}</option>
            </select>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {t.submitRepayment}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
