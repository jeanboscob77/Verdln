"use client";
import React, { useEffect, useState } from "react";
import DynamicHead from "@/app/app";
import { useLanguage } from "@/Context/LanguageContext";
import { useProtectedPage } from "@/components/useProtectedPage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

export default function ReportsPage() {
  const [summary, setSummary] = useState({});
  const [bySupplier, setBySupplier] = useState([]);
  const [byInput, setByInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();
  useProtectedPage();
  //for downloadable files
  // Add these states at the top
  const [exportInfo, setExportInfo] = useState(null);
  const [exportReady, setExportReady] = useState(false);

  // 🌍 Localized metadata
  const meta = {
    en: {
      title: "Reports | Smart Agri-Loan Platform",
      description:
        "View real-time reports on farmers’ loans, payments, and input distribution. Analyze data by suppliers and input types for smarter agricultural decisions.",
      keywords:
        "agriculture loans reports, loan payments, supplier analytics, input management, farmer statistics, smart agriculture dashboard",
      image: "/images/og/reports-preview.png",
      url: `https://yourdomain.com/reports`,
    },
    rw: {
      title: "Raporo | Urubuga rw’Imari y’Abahinzi",
      description:
        "Reba raporo z’igihe nyacyo ku nguzanyo z’abahinzi, ubwishyu n’itangwa ry’inyongeramusaruro. Sobanukirwa amakuru ku batanga inyongeramusaruro n’ubwoko bw’inyongeramusaruro.",
      keywords:
        "raporo z’inguzanyo z’abahinzi, ubwishyu bw’inguzanyo, isesengura ry’abatanga, imicungire y’inyongeramusaruro, imibare y’abahinzi, dashboard y’ubuhinzi",
      image: "/images/og/reports-preview.png",
      url: `https://yourdomain.com/reports`,
    },
  }[lang || "en"];

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io("http://localhost:4000");

    socket.on("connect", () => console.log("Connected to server"));

    // Listen for real-time updates
    socket.on("dashboard-update", (data) => {
      setSummary(data.summary);
      setBySupplier(data.bySupplier);
      setByInput(data.byInput);
      setLoading(false);
    });

    // 🔹 Listen for export updates
    socket.on("export-update", (data) => {
      setExportInfo(data); // contains { message, count, timestamp }
      setExportReady(true);
    });
    return () => socket.disconnect();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="p-6 text-center">{t.loadingReports}</p>
      </div>
    );

  const paidVsRemaining = [
    { name: "Paid", value: Number(summary.total_paid) || 0 },
    { name: "Remaining", value: Number(summary.total_remaining) || 0 },
  ];

  return (
    <>
      {/* SEO Meta for Reports Page */}
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Total Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t.totalLoanSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {t.total}: {summary.total_loan?.toLocaleString() || 0} RWF
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paidVsRemaining}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {paidVsRemaining.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom legend */}
            <div className="flex justify-center mt-2 gap-4">
              {paidVsRemaining.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span>{entry.name === "Paid" ? t.paid : t.remaining}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* By Supplier */}
        <Card>
          <CardHeader>
            <CardTitle>{t.loansBySupplier}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bySupplier}>
                <XAxis dataKey="supplier" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By Input Type */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t.loansByInputType}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byInput}>
                <XAxis dataKey="input_type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t.downloadExportedData}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <p>{t.exportDescription}</p>
              {exportInfo && (
                <p className="text-sm text-gray-500 mt-1">
                  {t.rowsExported}: {exportInfo.count} (
                  {new Date(exportInfo.timestamp).toLocaleTimeString()})
                </p>
              )}
            </div>
            <a
              href="http://localhost:4000/api/export/download"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded text-white ${
                exportReady
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              download
              onClick={() => setExportReady(false)} // reset until next export
            >
              {t.downloadButton}
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
