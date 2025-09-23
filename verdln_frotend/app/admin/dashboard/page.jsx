"use client";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { apiGet } from "@/Utils/api";
import { DollarSign, Repeat, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [selectedRepayment, setSelectedRepayment] = useState(null);
  const [repayAmount, setRepayAmount] = useState("");
  const [repayMethod, setRepayMethod] = useState("cash");

  // Fetch data after user is loaded
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (user) {
      fetchData();
      fetchRepayments();
    }
  }, [user, loading, router]);

  async function fetchData() {
    try {
      const res = await apiGet("/loans");
      setRequests(res.requests || []);
    } catch (err) {
      console.error("Failed to fetch loans:", err);
    }
  }

  async function fetchRepayments() {
    try {
      const res = await apiGet("/repayment/all");
      console.log("Raw API response:", res.repayments);

      // sometimes your data is inside res.data.repayments
      const repaymentData = res.repayments;
      setRepayments(repaymentData);
    } catch (err) {
      console.error("Failed to fetch repayments:", err);
      setRepayments([]);
    }
  }

  // Approve / Reject loan
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/loans/${id}/status`,
        {
          status: newStatus,
        }
      );
      if (res.status === 200) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      alert("❌ Failed to update status.");
    }
  };

  // Save notes
  const handleAddNotes = async (id, admin_notes) => {
    try {
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, admin_notes } : r))
      );
      await axios.patch(`http://localhost:5000/api/loans/${id}/notes`, {
        admin_notes,
      });
    } catch (err) {
      alert("❌ Failed to save notes.");
    }
  };

  // Record repayment
  const handleRepayment = async (e) => {
    e.preventDefault();
    if (!selectedRepayment) return;

    try {
      const res = await fetch("http://localhost:5000/api/repayment/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loan_request_id: selectedRepayment._id,
          farmer: selectedRepayment.farmer._id || selectedRepayment.farmer,
          amount: parseFloat(repayAmount),
          method: repayMethod,
        }),
      });

      const data = await res.json(); // important: parse JSON

      if (data.success && data.repayment) {
        const newRepayment = data.repayment;
        setRequests((prev) =>
          prev.map((r) =>
            r._id === selectedRepayment._id
              ? { ...r, repayments: [...(r.repayments || []), newRepayment] }
              : r
          )
        );
        setRepayAmount("");
        setRepayMethod("cash");
        setSelectedRepayment(null);
        alert(data.message || "✅ Repayment recorded successfully!");
      } else {
        alert("❌ Failed to record repayment: Invalid server response.");
        console.log(data);
      }
    } catch (err) {
      alert("❌ Failed to record repayment.");
      console.log(err);
    }
  };
  // Prepare summary
  const totalLoans = requests.reduce((acc, r) => acc + (r.amount || 0), 0);
  const loansWithRepayments = useMemo(() => {
    return requests.map((loan) => ({
      ...loan,
      repayments: repayments.filter(
        (rep) => String(rep.loan_request._id) === String(loan._id)
      ),
    }));
  }, [requests, repayments]);

  const totalRepayments = useMemo(
    () =>
      loansWithRepayments.reduce(
        (acc, loan) =>
          acc +
          (loan.repayments?.reduce((a, r) => a + Number(r.amount || 0), 0) ||
            0),
        0
      ),
    [loansWithRepayments]
  );

  const pendingRequests = requests.filter((r) => r.status === "pending").length;

  console.log(pendingRequests);

  const getStatusClass = (status) => {
    if (status === "Pending") return "text-yellow-600";
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-600";
    return "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t.adminDashboardTitle}</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">
            <DollarSign className="w-8 h-8 text-blue-600" />
            {t.totalLoans}
          </h2>
          <p>{totalLoans}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">
            <Repeat className="w-8 h-8 text-blue-600" />
            {t.totalRepayments}
          </h2>
          <p>{totalRepayments}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">
            <Clock className="w-8 h-8 text-blue-600" />
            {t.pendingRequests}
          </h2>
          <p>{pendingRequests}</p>
        </div>
      </div>

      {/* Loan Requests */}
      <div className="mb-6">
        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="bg-white rounded-lg shadow p-4 border">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{t.farmer}</h3>
                <span className={`font-semibold ${getStatusClass(r.status)}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">{t.phone_number}:</span>{" "}
                {r.phone_number || r.farmer?.phone_number}
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
                  value={r.admin_notes || ""}
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

        {/* Desktop Table */}
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
                  <td className="p-2 border">
                    {r.phone_number || r.farmer?.phone_number}
                  </td>
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
                      defaultValue={r.admin_notes || ""}
                      onBlur={(e) => handleAddNotes(r._id, e.target.value)}
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

      {/* Repayment Modal */}
      {selectedRepayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedRepayment(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {t.repay}{" "}
              {selectedRepayment.phone_number ||
                selectedRepayment.farmer?.phone_number}
            </h2>

            <form className="space-y-4" onSubmit={handleRepayment}>
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
                <option value="cash">{t.cash}</option>
                <option value="mobile_money">{t.mobileMoney}</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded"
              >
                {t.submitRepayment}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
