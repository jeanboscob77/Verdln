"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/Utils/api";
import { useAuth } from "@/Context/AuthContext";

export default function FarmerDashboard() {
  const { t, lang } = useLanguage(); // get language
  const router = useRouter();
  const { user, loading } = useAuth();

  const [inputType, setInputType] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState("");

  const [requests, setRequests] = useState([]);

  const inputOptions = [
    { value: "seeds", label: { en: "Seeds", rw: "Imbuto" } },
    { value: "fertilizer", label: { en: "Fertilizer", rw: "Ifumbire" } },
    {
      value: "pesticides",
      label: { en: "Pesticides", rw: "Imiti yica udukoko" },
    },
  ];

  const statusLabels = {
    Pending: { en: "Pending", rw: "Bitegereje" },
    Approved: { en: "Approved", rw: "Yemejwe" },
    Rejected: { en: "Rejected", rw: "Yanenzwe" },
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else {
      fetchData();
    }
  }, [user, loading, router]);

  async function fetchData() {
    try {
      const res = await apiGet(`/loans/farmer/${user?.id || user?._id}`);
      setRequests(res.requests || []);
    } catch (err) {
      console.error(err);
      // setError("Failed to fetch data");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!inputType || !packageSize || !repaymentDate) {
      setError(t.required);
      fetchData();
      return;
    }

    setLoadingRequest(true);
    try {
      const res = await apiPost("/loans/submit", {
        farmerId: user?.id || user?._id,
        input_type: inputType,
        package_size: packageSize,
        repayment_date: repaymentDate,
        amount,
      });

      // setRequests([res.request, ...requests]);
      setInputType("");
      setPackageSize("");
      setRepaymentDate("");
      setAmount("");
    } catch (err) {
      setError(err.message || "Failed to submit request");
    } finally {
      setLoadingRequest(false);
    }
  }

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

  if (loading || !user) {
    return <div className="text-center mt-10">{t.loading || "Loading..."}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{t.farmerDashboard}</h1>

        {/* Request Form */}
        <section className="mb-8 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-4">{t.submitRequest}</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span>{t.inputType}</span>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">{t.choice}</option>
                {inputOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label[lang]}
                  </option>
                ))}
              </select>
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
              disabled={loadingRequest}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {loadingRequest ? "..." : t.submit}
            </button>
          </form>
        </section>

        {/* Requests Table */}
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
                    <tr key={r._id} className="text-center border-t">
                      <td className="px-4 py-2">
                        {inputOptions.find((i) => i.value === r.input_type)
                          ?.label[lang] || r.input_type}
                      </td>
                      <td className="px-4 py-2">{r.package_size}</td>
                      <td className="px-4 py-2">
                        {new Date(r.repayment_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{r.amount}</td>
                      <td
                        className={`px-4 py-2 rounded ${statusColor(r.status)}`}
                      >
                        {statusLabels[
                          r.status?.trim()?.charAt(0).toUpperCase() +
                            r.status?.trim()?.slice(1)
                        ]?.[lang] || r.status}
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
      </main>
    </div>
  );
}
