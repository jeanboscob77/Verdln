"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { apiGet } from "@/Utils/api";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  async function fetchData() {
    try {
      const res = await apiGet(`/loans`);
      setRequests(res.requests || []);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else {
      fetchData();
    }
  }, [user, loading, router]);

  const [requests, setRequests] = useState([]);
  console.log(requests);
  const [selectedRepayment, setSelectedRepayment] = useState(null);
  const [repayAmount, setRepayAmount] = useState("");
  const [repayMethod, setRepayMethod] = useState("Cash");

  // Approve/Reject handlers
  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Add admin notes
  const handleAddNotes = (id, notes) => {
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, notes } : r))
    );
  };

  // Submit repayment for a specific farmer
  const handleRepayment = (e) => {
    e.preventDefault();
    if (!selectedRepayment) return;

    setRequests((prev) =>
      prev.map((r) =>
        r._id === selectedRepayment.id
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
  const totalLoans = requests.reduce((acc, r) => acc + (r.amount || 0), 0);
  const totalRepayments = requests.reduce(
    (acc, r) =>
      acc +
      (r.repayments
        ? r.repayments.reduce((a, p) => a + Number(p.amount || 0), 0)
        : 0),
    0
  );
  const pendingRequests = requests.filter((r) => r.status === "Pending").length;

  // Helper to get status class
  const getStatusClass = (status) => {
    if (status === "Pending") return "text-yellow-600";
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-600";
    return "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t.adminDashboardTitle}</h1>

      {/* Summary Cards - Already responsive */}
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

      {/* Loan Requests - Responsive: Cards on Mobile, Table on Desktop */}
      <div className="mb-6">
        {/* Mobile: Cards View (block md:hidden) */}
        <div className="block md:hidden space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="bg-white rounded-lg shadow p-4 border">
              {/* Farmer Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{t.farmer}</h3>
                <span className={`font-semibold ${getStatusClass(r.status)}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">{t.phone_number}:</span>{" "}
                {r.phone_number}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">{t.input}:</span> {r.input_type}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">{t.package}:</span>{" "}
                {r.package_size}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">{t.amount}:</span> {r.amount}
              </p>

              {/* Notes */}
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">
                  {t.notes}
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={r.notes || ""}
                  onChange={(e) => handleAddNotes(r._id, e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  onClick={() => handleStatusChange(r._id, "Approved")}
                >
                  {t.approve}
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  onClick={() => handleStatusChange(r._id, "Rejected")}
                >
                  {t.reject}
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  onClick={() => setSelectedRepayment(r)}
                >
                  {t.repay}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table View (hidden md:block) */}
        <div className="hidden md:block overflow-x-auto">
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
                <tr key={r._id} className="text-center">
                  <td className="p-2 border">{r.farmer.phone_number}</td>
                  <td className="p-2 border">{r.input_type}</td>
                  <td className="p-2 border">{r.package_size}</td>
                  <td className="p-2 border">{r.amount}</td>
                  <td
                    className={`p-2 border font-semibold ${getStatusClass(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      className="border p-1 rounded w-full"
                      value={r.notes || ""}
                      onChange={(e) => handleAddNotes(r._id, e.target.value)}
                    />
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="px-2 py-1 bg-green-600 text-white rounded"
                      onClick={() => handleStatusChange(r._id, "Approved")}
                    >
                      {t.approve}
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleStatusChange(r._id, "Rejected")}
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
      </div>

      {/* Repayment Form - Already responsive */}
      {selectedRepayment && (
        <div className="p-4 bg-white rounded shadow mb-6">
          <h2 className="font-semibold mb-2">
            {t.repay}{" "}
            {selectedRepayment.phone_number || selectedRepayment.farmer}
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
