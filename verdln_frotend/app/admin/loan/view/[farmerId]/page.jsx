"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/LanguageContext";
import { apiGet, apiPut } from "@/Utils/api";
import DynamicHead from "@/app/app";
import Swal from "sweetalert2";
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
  const farmerId = params?.farmerId;
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t, lang } = useLanguage();

  const [loans, setLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [updatingLoanId, setUpdatingLoanId] = useState(null);

  const [statusMap, setStatusMap] = useState({});
  const [notesMap, setNotesMap] = useState({});

  const typingTimeoutRef = useRef({}); // For debouncing note updates

  // --- Meta for SEO ---
  const meta = {
    en: {
      title: "Farmer Loan Details | Smart Agri-Loan",
      description:
        "View and manage all loans for this farmer on Smart Agri-Loan.",
      keywords: "farmer loans, loan requests, agri-loan, smart farming",
      url: `https://yourdomain.com/admin/loans/${farmerId}`,
      image: "/images/og/admin-loans.png",
    },
    rw: {
      title: "Amakuru y’Inguzanyo z’Umuhinzi | Urubuga rw’Inguzanyo",
      description:
        "Reba kandi uyobore inguzanyo zose z’uyu muhinzi kuri Smart Agri-Loan.",
      keywords: "inguzanyo z’abahinzi, inyandiko z’inguzanyo, ubuhinzi",
      url: `https://yourdomain.com/admin/loans/${farmerId}`,
      image: "/images/og/admin-loans.png",
    },
  }[lang || "en"];

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user]);

  const fetchLoans = async () => {
    if (!farmerId) return;
    try {
      setLoadingData(true);
      const res = await apiGet(`/loans/farmer/${farmerId}`);
      const fetched = res.requests || [];
      setLoans(fetched);

      // initialize status and notes maps
      const status = {};
      const notes = {};
      fetched.forEach((l) => {
        status[l.id] = l.status;
        notes[l.id] = l.notes || "";
      });
      setStatusMap(status);
      setNotesMap(notes);
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
      await fetchLoans();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: lang === "rw" ? "Byanze!" : "Failed!",
        text: err.message || "Failed to update status",
      });
      await fetchLoans();
    } finally {
      setUpdatingLoanId(null);
    }
  };

  const handleNotesChange = (loanId, value) => {
    setNotesMap((prev) => ({ ...prev, [loanId]: value }));

    // Debounce updates: wait 1s after last typing
    if (typingTimeoutRef.current[loanId])
      clearTimeout(typingTimeoutRef.current[loanId]);

    typingTimeoutRef.current[loanId] = setTimeout(() => {
      handleStatusUpdate(
        loanId,
        statusMap[loanId] ?? loans.find((l) => l.id === loanId)?.status,
        value
      );
    }, 1000);
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
    <>
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />

      <div className="p-4 min-h-screen bg-gray-50 space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          {t.allLoans || "All Loan Requests"}
        </h1>

        {loans.map((loan) => {
          const currentStatus = statusMap[loan.id] ?? loan.status;
          const currentNote = notesMap[loan.id] ?? loan.notes ?? "";

          return (
            <section
              key={loan.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
            >
              {/* Farmer Identification */}
              <h2 className="font-bold text-lg text-gray-700 border-b pb-1">
                {t.farmerIdentification}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <User className="w-5 h-5 text-gray-500" /> {loan.farmer_name}
                </p>
                <p className="flex items-center gap-1">
                  <Phone className="w-5 h-5 text-gray-500" />{" "}
                  {loan.farmer_phone || "N/A"}
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard className="w-5 h-5 text-gray-500" />{" "}
                  {loan.national_id || "N/A"}
                </p>
              </div>

              {/* Loan Details */}
              <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
                {t.loanDetails}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <Layers className="w-5 h-5 text-gray-500" />{" "}
                  {t.inputTypeNames[loan.input_type] || loan.input_type} /{" "}
                  {t.inputSubtypeNames[loan.input_subtype]}
                </p>
                <p className="flex items-center gap-1">
                  <Package className="w-5 h-5 text-gray-500" /> ({t.packageSize}
                  : {loan.package_size} {loan.unit}) ({t.price}:{" "}
                  {`${loan.price} FRW` || "N/A"})
                </p>
                <p>
                  {t.loanAmount}: {loan.loan_amount} FRW
                </p>
                <p>
                  {t.interest}: {loan.interest_amount} FRW
                </p>
                <p>
                  {t.totalLoanWithInterest}: {loan.total_amount} FRW
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-5 h-5 text-gray-500" />{" "}
                  {loan.repayment_date}
                </p>
                <p>
                  {t.status}:{" "}
                  <span
                    className={`font-semibold ${
                      loan.status === "Approved"
                        ? "text-green-600"
                        : loan.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {t.loanStatus[loan.status]}
                  </span>
                </p>
              </div>

              {/* Location & Supplier */}
              <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
                {t.locationAndSupplier}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <p className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-gray-500" />{" "}
                  {lang === "en" ? loan.province : loan.province_rw},{" "}
                  {loan.district}, {loan.sector}, {loan.cell}
                </p>
                <p className="flex items-center gap-1">
                  <Factory className="w-5 h-5 text-gray-500" />{" "}
                  {loan.supplier_name} ({loan.supplier_phone || "N/A"})
                </p>
              </div>

              {/* Update Status & Notes */}
              <h2 className="font-bold text-lg text-gray-700 border-b pb-1 mt-4">
                {t.updateStatusAndNotes}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-2">
                <select
                  className="border rounded px-2 py-1"
                  value={currentStatus}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    const confirmText =
                      lang === "rw"
                        ? `Uremeza ko ushaka guhindura status y’inguzanyo ikajya kuri "${t.loanStatus[newStatus]}"?`
                        : `Are you sure you want to change this loan status to "${t.loanStatus[newStatus]}"?`;

                    const result = await Swal.fire({
                      title:
                        lang === "rw"
                          ? "Emeza Ibyo Guhindura"
                          : "Confirm Change",
                      text: confirmText,
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#16a34a",
                      cancelButtonColor: "#d33",
                      confirmButtonText:
                        lang === "rw" ? "Yego, Hindura" : "Yes, Change",
                      cancelButtonText: lang === "rw" ? "Oya" : "Cancel",
                    });

                    if (result.isConfirmed) {
                      setStatusMap((prev) => ({
                        ...prev,
                        [loan.id]: newStatus,
                      }));
                      await handleStatusUpdate(loan.id, newStatus, currentNote);
                      Swal.fire({
                        icon: "success",
                        title:
                          lang === "rw" ? "Byagenze neza!" : "Status Updated!",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    } else {
                      setStatusMap((prev) => ({
                        ...prev,
                        [loan.id]: loan.status,
                      }));
                    }
                  }}
                  disabled={updatingLoanId === loan.id}
                >
                  <option value="Pending">{t.loanStatus["Pending"]}</option>
                  <option value="Approved">{t.loanStatus["Approved"]}</option>
                  <option value="Rejected">{t.loanStatus["Rejected"]}</option>
                </select>

                <input
                  type="text"
                  placeholder={
                    lang === "rw" ? "Ongeramo inyandiko..." : "Add note..."
                  }
                  className="border rounded px-2 py-1 flex-1 mt-2 md:mt-0"
                  value={currentNote}
                  onChange={(e) =>
                    setNotesMap((prev) => ({
                      ...prev,
                      [loan.id]: e.target.value,
                    }))
                  }
                  onBlur={async () => {
                    await handleStatusUpdate(
                      loan.id,
                      statusMap[loan.id] ?? loan.status,
                      notesMap[loan.id] ?? ""
                    );
                  }}
                  disabled={updatingLoanId === loan.id}
                />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
