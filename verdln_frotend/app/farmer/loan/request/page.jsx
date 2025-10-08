"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/Context/LanguageContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { apiGet, apiPost } from "@/Utils/api";
import { useProtectedPage } from "@/components/useProtectedPage";
// icons
import {
  Package,
  Calendar,
  MapPin,
  Factory,
  Layers,
  Boxes,
} from "lucide-react";

export default function RequestLoan() {
  useProtectedPage();
  const { t } = useLanguage();
  const router = useRouter();
  const { user, loading } = useAuth();

  // Form states
  const [inputTypes, setInputTypes] = useState([]);
  const [inputType, setInputType] = useState("");
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  const [inputSubType, setInputSubType] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [sectors, setSectors] = useState([]);
  const [sector, setSector] = useState("");
  const [cells, setCells] = useState([]);
  const [cell, setCell] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState("");

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading]);

  // --- FETCH INPUT TYPES ---
  useEffect(() => {
    async function fetchInputTypes() {
      try {
        const res = await apiGet("/inputs");
        const types = Array.isArray(res.inputTypes)
          ? res.inputTypes
          : res?.data || [];
        setInputTypes(types);
      } catch {
        setInputTypes([]);
      }
    }
    fetchInputTypes();
  }, []);

  // --- FETCH SUBTYPES BASED ON SELECTED TYPE ---
  useEffect(() => {
    async function fetchSubTypes() {
      if (!inputType) return setSubTypeOptions([]);
      try {
        const res = await apiGet(`/inputs/${inputType}/subtypes`);
        const subtypes = Array.isArray(res.subtypes) ? res.subtypes : [];
        setSubTypeOptions(subtypes);
      } catch {
        setSubTypeOptions([]);
      }
    }
    fetchSubTypes();
  }, [inputType]);
  // --- LOCATIONS ---
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const res = await apiGet("/locations/provinces");
        setProvinces(Array.isArray(res.provinces) ? res.provinces : []);
      } catch {
        setProvinces([]);
      }
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (!province) return setDistricts([]);
      const res = await apiGet(`/locations/districts/${province}`);
      setDistricts(Array.isArray(res.districts) ? res.districts : []);
    }
    fetchDistricts();
  }, [province]);

  useEffect(() => {
    async function fetchSectors() {
      if (!district) return setSectors([]);
      const res = await apiGet(`/locations/sectors/${district}`);
      setSectors(Array.isArray(res.sectors) ? res.sectors : []);
    }
    fetchSectors();
  }, [district]);

  useEffect(() => {
    async function fetchCells() {
      if (!sector) return setCells([]);
      const res = await apiGet(`/locations/cells/${sector}`);
      setCells(Array.isArray(res.cells) ? res.cells : []);
    }
    fetchCells();
  }, [sector]);

  useEffect(() => {
    async function fetchSuppliers() {
      if (!province || !district || !sector || !cell) return setSuppliers([]);
      const res = await apiGet(
        `/suppliers?province=${province}&district=${district}&sector=${sector}&cell=${cell}`
      );
      setSuppliers(Array.isArray(res) ? res : []);
    }
    fetchSuppliers();
  }, [province, district, sector, cell]);

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !inputType ||
      !inputSubType ||
      !packageSize ||
      !repaymentDate ||
      !province ||
      !district ||
      !sector ||
      !cell ||
      !supplier
    ) {
      setError(t.required);
      return;
    }

    // Log the payload
    const payload = {
      farmer_id: user.id,
      input_type_id: inputType || null,
      input_subtype_id: inputSubType || null,
      package_size: packageSize || null,
      repayment_date: repaymentDate || null,
      province_id: province || null,
      district_id: district || null,
      sector_id: sector || null,
      cell_id: cell || null,
      supplier_id: supplier || null,
    };
    console.log("Submitting loan request:", payload);

    setLoadingRequest(true);
    try {
      await apiPost("/loans/submit", payload);

      alert(t.requestSubmitted || "Request submitted successfully");

      // Reset form
      setInputType("");
      setInputSubType("");
      setPackageSize("");
      setRepaymentDate("");
      setProvince("");
      setDistrict("");
      setSector("");
      setCell("");
      setSupplier("");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoadingRequest(false);
    }
  };

  if (loading || !user)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center mt-10">{t.loading || "Loading..."}</div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-green-700 flex items-center justify-center gap-2">
          <Factory className="w-6 h-6" />
          {t.submitLoanRequest}
        </h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input Type */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Layers className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <option value="">{t.inputType}</option>
              {inputTypes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.type}
                </option>
              ))}
            </select>
          </div>

          {/* Subtype */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Boxes className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={inputSubType}
              onChange={(e) => setInputSubType(e.target.value)}
              disabled={!subTypeOptions.length}
            >
              <option value="">{t.subType}</option>
              {subTypeOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Package Size */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Package className="w-5 h-5 text-gray-500" />
            <input
              className="flex-1 outline-none"
              placeholder={t.packageSize}
              value={packageSize}
              onChange={(e) => setPackageSize(e.target.value)}
            />
          </div>

          {/* Repayment Date with Floating Label */}
          <div className="relative w-full">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="date"
              id="repaymentDate"
              className="peer block w-full border rounded px-10 py-2 placeholder-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Repayment Date"
              value={repaymentDate}
              onChange={(e) => setRepaymentDate(e.target.value)}
            />
            <label
              htmlFor="repaymentDate"
              className="absolute  left-40 top-2 text-gray-700 text-md transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600"
            >
              {t.repaymentDate}
            </label>
          </div>

          {/* Province */}
          <div className="flex items-center border rounded p-2 gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={!provinces.length}
            >
              <option value="">{t.selectProvince}</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex items-center border rounded p-2 gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!districts.length}
            >
              <option value="">{t.selectDistrict}</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div className="flex items-center border rounded p-2 gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              disabled={!sectors.length}
            >
              <option value="">{t.selectSector}</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cell */}
          <div className="flex items-center border rounded p-2 gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={cell}
              onChange={(e) => setCell(e.target.value)}
              disabled={!cells.length}
            >
              <option value="">{t.selectCell}</option>
              {cells.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Factory className="w-5 h-5 text-gray-500" />
            <select
              className="flex-1 outline-none"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            >
              <option value="">{t.SelectSupplier}</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            disabled={loadingRequest}
          >
            {loadingRequest ? "..." : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
