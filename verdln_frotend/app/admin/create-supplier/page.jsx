"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useAuth } from "@/Context/AuthContext";
import { apiGet, apiPost } from "@/Utils/api";
import { useProtectedPage } from "@/components/useProtectedPage";
import DynamicHead from "@/app/app";
// Icons
import {
  User,
  IdCard,
  Phone,
  Languages,
  MapPin,
  Map,
  Navigation,
  Locate,
} from "lucide-react";

export default function CreateSupplierPage() {
  useProtectedPage();
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("en");

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");

  // --- Meta for SEO ---
  const meta = {
    en: {
      title: "Create Supplier | Smart Agri-Loan",
      description:
        "Register a new supplier for the Smart Agri-Loan platform. Fill all required details and assign location.",
      keywords: "supplier registration, agri-loan, smart farming",
      url: "https://yourdomain.com/create-supplier",
      image: "/images/og/create-supplier.png",
    },
    rw: {
      title: "Shyiramo Supplier | Urubuga rw’Inguzanyo",
      description:
        "Iyandikishemo supplier nshya kuri Smart Agri-Loan. Shyiramo amakuru yose akenewe kandi uhitemo aho abarizwa.",
      keywords: "iyandikisho supplier, inguzanyo, ubuhinzi",
      url: "https://yourdomain.com/create-supplier",
      image: "/images/og/create-supplier.png",
    },
  }[lang || "en"];

  // Fetch provinces
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const res = await apiGet("/locations/provinces");
        setProvinces(Array.isArray(res.provinces) ? res.provinces : []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProvinces();
  }, []);

  // Fetch dependent locations
  useEffect(() => {
    async function fetchDistricts() {
      if (!province) return setDistricts([]);
      const res = await apiGet(`/locations/districts/${province}`);
      setDistricts(Array.isArray(res.districts) ? res.districts : []);
      setDistrict("");
    }
    fetchDistricts();
  }, [province]);

  useEffect(() => {
    async function fetchSectors() {
      if (!district) return setSectors([]);
      const res = await apiGet(`/locations/sectors/${district}`);
      setSectors(Array.isArray(res.sectors) ? res.sectors : []);
      setSector("");
    }
    fetchSectors();
  }, [district]);

  useEffect(() => {
    async function fetchCells() {
      if (!sector) return setCells([]);
      const res = await apiGet(`/locations/cells/${sector}`);
      setCells(Array.isArray(res.cells) ? res.cells : []);
      setCell("");
    }
    fetchCells();
  }, [sector]);

  if (loading || !user) return <div>{t.loading || "Loading..."}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !fullName ||
      !nationalId ||
      !phone ||
      !province ||
      !district ||
      !sector ||
      !cell
    ) {
      setError(t.required || "All fields are required");
      return;
    }

    setLoadingSubmit(true);
    try {
      await apiPost("/users/register", {
        full_name: fullName,
        national_id: nationalId,
        phone_number: phone,
        role: "supplier",
        language,
        province_id: province,
        district_id: district,
        sector_id: sector,
        cell_id: cell,
      });

      alert(t.supplierCreated || "Supplier created successfully");

      // Reset form
      setFullName("");
      setNationalId("");
      setPhone("");
      setLanguage("en");
      setProvince("");
      setDistrict("");
      setSector("");
      setCell("");
    } catch (err) {
      setError(err.message || "Failed to create supplier");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <DynamicHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        imageUrl={meta.image}
        url={meta.url}
      />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
        <h1 className="text-xl font-bold">
          {t.createSupplier || "Create Supplier"}
        </h1>
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <label className="block">
            <span className="text-sm">{t.fullName || "Full Name"}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* National ID */}
          <label className="block">
            <span className="text-sm">{t.nationalId || "National ID"}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <IdCard className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* Phone */}
          <label className="block">
            <span className="text-sm">{t.phoneNumber || "Phone Number"}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Phone className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2507..."
                className="w-full outline-none"
              />
            </div>
          </label>

          {/* Language */}
          <label className="block">
            <span className="text-sm">{t.language || "Language"}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Languages className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
          </label>

          {/* Province */}
          <label className="block">
            <span className="text-sm">{t.province}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">{t.selectProvince}</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {/* District */}
          <label className="block">
            <span className="text-sm">{t.district}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Map className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">{t.selectDistrict}</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {/* Sector */}
          <label className="block">
            <span className="text-sm">{t.sector}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Navigation className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">{t.selectSector}</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {/* Cell */}
          <label className="block">
            <span className="text-sm">{t.cell}</span>
            <div className="flex items-center border rounded mt-1 p-2">
              <Locate className="w-5 h-5 text-gray-500 mr-2" />
              <select
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">{t.selectCell}</option>
                {cells.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            {loadingSubmit ? "..." : t.create || "Create Supplier"}
          </button>
        </form>
      </div>
    </>
  );
}
