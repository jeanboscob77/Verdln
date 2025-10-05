"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/LanguageContext";
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
  const { t } = useLanguage();

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

    return () => socket.disconnect();
  }, []);

  if (loading) return <p className="p-6 text-center">{t.loadingReports}</p>;

  const paidVsRemaining = [
    { name: "Paid", value: Number(summary.total_paid) || 0 },
    { name: "Remaining", value: Number(summary.total_remaining) || 0 },
  ];

  return (
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
    </div>
  );
}
