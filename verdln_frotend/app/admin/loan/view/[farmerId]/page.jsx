"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";
import { apiGet, apiPut } from "@/Utils/api";
import {
  User,
  Phone,
  CreditCard,
  Layers,
  Package,
  Calendar,
  MapPin,
  Factory,
} from "lucide-react";

export default function AdminLoansPage({ params }) {
  const { farmerId } = params;
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  const [loans, setLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [updatingLoanId, setUpdatingLoanId] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user]);

  const fetchLoans = async () => {
    if (!farmerId) return;
    try {
      setLoadingData(true);
      const res = await apiGet(`/loans/farmer/${farmerId}`);
      setLoans(res.requests || []);
    } catch (err) {
      setError(err.message || "Failed to fetch loans");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [farmerId]);

  const handleStatusUpdate = async (loanId, status, notes) => {
    try {
      setUpdatingLoanId(loanId);
      await apiPut(`/loans/${loanId}/status`, { status, notes });
      fetchLoans();
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingLoanId(null);
    }
  };

  if (loading || loadingData)
    return <div className="text-center mt-10">{t.loading || "Loading..."}</div>;

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  if (!loans.length)
    return (
      <div className="text-center mt-10">{t.noLoans || "No loans found."}</div>
    );

  return (
    <div className="p-4 min-h-screen bg-gray-50 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        {t.allLoans || "All Loan Requests"}
      </h1>

      {loans.map((loan) => (
        <section
          key={loan.id}
          className="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
        >
          {/* Farmer Identification */}
          <h2 className="font-bold text-lg text-gray-700 border-b pb-1">
            Farmer Identification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <p className="flex items-center gap-1">
              <User className="w-5 h-5 text-gray-500" /> {loan.farmer_name}
            </p>
            <p className="flex items-center gap-1">
              <Phone className="w-5 h-5 text-gray-500" />{" "}
              {loan.phone_number || "N/A"}
            </p>
            <p className="flex items-center gap-1">
              <CreditCard className="w-5 h-5 text-gray-500" />{" "}
              {loan.national_id || "N/A"}
            </p>
          </div>

          {/* Loan Details */}
          <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
            Loan Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <p className="flex items-center gap-1">
              <Layers className="w-5 h-5 text-gray-500" /> {loan.input_type} /{" "}
              {loan.input_subtype}
            </p>
            <p className="flex items-center gap-1">
              <Package className="w-5 h-5 text-gray-500" /> {loan.package_size}{" "}
              (Price: {loan.price || "N/A"})
            </p>
            <p>Loan Amount: {loan.loan_amount}</p>
            <p>Interest: {loan.interest_amount}</p>
            <p>Total: {loan.total_amount}</p>
            <p className="flex items-center gap-1">
              <Calendar className="w-5 h-5 text-gray-500" />{" "}
              {loan.repayment_date}
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  loan.status === "Approved"
                    ? "text-green-600"
                    : loan.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {loan.status}
              </span>
            </p>
          </div>

          {/* Location & Supplier */}
          <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
            Location & Supplier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <p className="flex items-center gap-1">
              <MapPin className="w-5 h-5 text-gray-500" /> {loan.province},{" "}
              {loan.district}, {loan.sector}, {loan.cell}
            </p>
            <p className="flex items-center gap-1">
              <Factory className="w-5 h-5 text-gray-500" /> {loan.supplier_name}{" "}
              ({loan.supplier_phone || "N/A"})
            </p>
          </div>

          {/* Update Status & Notes */}
          <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
            Update Status & Notes
          </h2>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-2">
            <select
              className="border rounded px-2 py-1"
              defaultValue={loan.status}
              onChange={(e) =>
                handleStatusUpdate(loan.id, e.target.value, loan.notes || "")
              }
              disabled={updatingLoanId === loan.id}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Add note..."
              className="border rounded px-2 py-1 flex-1 mt-2 md:mt-0"
              defaultValue={loan.notes || ""}
              onBlur={(e) =>
                handleStatusUpdate(loan.id, loan.status, e.target.value)
              }
              disabled={updatingLoanId === loan.id}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
