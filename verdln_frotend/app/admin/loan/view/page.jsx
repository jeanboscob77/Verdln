"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";
import { apiGet } from "@/Utils/api";
import { useProtectedPage } from "@/components/useProtectedPage";
import { User, Phone, CreditCard, Layers } from "lucide-react";

export default function AdminLoansPage() {
  useProtectedPage();
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [loans, setLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login"); // redirect if not logged in
  }, [loading, user]);

  useEffect(() => {
    async function fetchLoans() {
      try {
        setLoadingData(true);
        const res = await apiGet("/loans/all");
        setLoans(res.requests || []);
      } catch (err) {
        setError(err.message || "Failed to fetch loans");
      } finally {
        setLoadingData(false);
      }
    }
    fetchLoans();
  }, []);

  if (loading || loadingData) {
    return <div className="text-center mt-10">{t.loading || "Loading..."}</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  //   console.log(loans);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        {t.allLoans || "All Loan Requests"}
      </h1>

      {/* Table for large screens */}
      <div className="hidden lg:block">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 text-left">{t.name}</th>
              <th className="p-2 text-left">{t.phoneNumber}</th>
              <th className="p-2 text-left">{t.nationalId}</th>
              <th className="p-2 text-left">{t.Type}</th>
              <th className="p-2 text-left">{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr
                key={loan.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-2">{loan.farmer_name}</td>
                <td className="p-2">{loan.phone_number}</td>
                <td className="p-2">{loan.national_id}</td>
                <td className="p-2">{loan.input_type}</td>
                <td className="p-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                    onClick={() =>
                      router.push(`/admin/loan/view/${loan.farmer_id}`)
                    }
                  >
                    {t.viewDetails || "View Details"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small devices */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition"
            onClick={() => router.push(`/admin/loans/view/${loan.farmer_id}`)}
          >
            <p className="flex items-center gap-1">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">{loan.farmer_name}</span>
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-500" />
              {loan.phone_number || "N/A"}
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <CreditCard className="w-4 h-4 text-gray-500" />
              {loan.national_id || "N/A"}
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <Layers className="w-4 h-4 text-gray-500" />
              {loan.input_type || "N/A"}
            </p>
            <button className="mt-2 bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700 transition">
              {t.viewDetails || "View Details"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
