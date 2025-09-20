module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiGet",
    ()=>apiGet,
    "apiPost",
    ()=>apiPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// Helper to get token
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
}
async function apiGet(endpoint) {
    try {
        const token = getToken();
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_URL}${endpoint}`, {
            headers: token ? {
                Authorization: `Bearer ${token}`
            } : {}
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
}
async function apiPost(endpoint, payload) {
    try {
        const token = getToken();
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_URL}${endpoint}`, payload, {
            headers: token ? {
                Authorization: `Bearer ${token}`
            } : {}
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
}
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/api.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AdminDashboard() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [repayments, setRepayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRepayment, setSelectedRepayment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [repayAmount, setRepayAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [repayMethod, setRepayMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("cash");
    // Fetch data after user is loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !user) {
            router.push("/auth/login");
        } else if (user) {
            fetchData();
            fetchRepayments();
        }
    }, [
        user,
        loading,
        router
    ]);
    async function fetchData() {
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiGet"])("/loans");
            setRequests(res.requests || []);
        } catch (err) {
            console.error("Failed to fetch loans:", err);
        }
    }
    async function fetchRepayments() {
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiGet"])("/api/repayment/all");
            if (res.data.success) setRepayments(res.data.repayments);
        } catch (err) {
            console.error("Failed to fetch repayments:", err);
        }
    }
    // Approve / Reject loan
    const handleStatusChange = async (id, newStatus)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`http://localhost:5000/api/loans/${id}/status`, {
                status: newStatus
            });
            if (res.status === 200) {
                setRequests((prev)=>prev.map((r)=>r._id === id ? {
                            ...r,
                            status: newStatus
                        } : r));
            }
        } catch (err) {
            alert("❌ Failed to update status.");
        }
    };
    // Save notes
    const handleAddNotes = async (id, admin_notes)=>{
        try {
            setRequests((prev)=>prev.map((r)=>r._id === id ? {
                        ...r,
                        admin_notes
                    } : r));
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`http://localhost:5000/api/loans/${id}/notes`, {
                admin_notes
            });
        } catch (err) {
            alert("❌ Failed to save notes.");
        }
    };
    // Record repayment
    const handleRepayment = async (e)=>{
        e.preventDefault();
        if (!selectedRepayment) return;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiPost"])("/api/repayment/record", {
                loan_request_id: selectedRepayment._id,
                farmer: selectedRepayment.farmer._id,
                amount: repayAmount,
                method: repayMethod
            });
            if (res.data.success) {
                const newRepayment = res.data.repayment;
                setRequests((prev)=>prev.map((r)=>r._id === selectedRepayment._id ? {
                            ...r,
                            repayments: [
                                ...r.repayments || [],
                                newRepayment
                            ]
                        } : r));
                setRepayAmount("");
                setRepayMethod("cash");
                setSelectedRepayment(null);
                alert("✅ Repayment recorded successfully!");
            }
        } catch (err) {
            alert("❌ Failed to record repayment.");
        }
    };
    // Prepare summary
    const loansWithRepayments = requests.map((loan)=>({
            ...loan,
            repayments: repayments.filter((rep)=>rep.loan_request._id === loan._id)
        }));
    const totalLoans = requests.reduce((acc, r)=>acc + (r.amount || 0), 0);
    const totalRepayments = loansWithRepayments.reduce((acc, r)=>acc + (r.repayments?.reduce((a, p)=>a + Number(p.amount || 0), 0) || 0), 0);
    const pendingRequests = requests.filter((r)=>r.status === "Pending").length;
    const getStatusClass = (status)=>{
        if (status === "Pending") return "text-yellow-600";
        if (status === "Approved") return "text-green-600";
        if (status === "Rejected") return "text-red-600";
        return "";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: t.adminDashboardTitle
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-white rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold",
                                children: t.totalLoans
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: totalLoans
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-white rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold",
                                children: t.totalRepayments
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: totalRepayments
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-white rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold",
                                children: t.pendingRequests
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: pendingRequests
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "block md:hidden space-y-4",
                        children: requests.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg shadow p-4 border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-lg",
                                                children: t.farmer
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-semibold ${getStatusClass(r.status)}`,
                                                children: r.status
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    t.phone_number,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            r.phone_number || r.farmer?.phone_number
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    t.input,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            r.input_type
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    t.package,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            r.package_size
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    t.amount,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            r.amount
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1",
                                                children: t.notes
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "w-full border p-2 rounded",
                                                value: r.admin_notes || "",
                                                onChange: (e)=>handleAddNotes(r._id, e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 mt-3 pt-3 border-t",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-3 py-1 bg-green-600 text-white rounded text-sm",
                                                onClick: ()=>handleStatusChange(r._id, "Approved"),
                                                children: t.approve
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-3 py-1 bg-red-600 text-white rounded text-sm",
                                                onClick: ()=>handleStatusChange(r._id, "Rejected"),
                                                children: t.reject
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-3 py-1 bg-blue-600 text-white rounded text-sm",
                                                onClick: ()=>setSelectedRepayment(r),
                                                children: t.repay
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, r._id, true, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:block overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full bg-white rounded shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.farmer
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.input
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.package
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.amount
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.status
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.notes
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2 border",
                                                children: t.actions
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: requests.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border",
                                                    children: r.phone_number || r.farmer?.phone_number
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border",
                                                    children: r.input_type
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border",
                                                    children: r.package_size
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border",
                                                    children: r.amount
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 241,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: `p-2 border font-semibold ${getStatusClass(r.status)}`,
                                                    children: r.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "border p-1 rounded w-full",
                                                        defaultValue: r.admin_notes || "",
                                                        onBlur: (e)=>handleAddNotes(r._id, e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2 border space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "px-2 py-1 bg-green-600 text-white rounded",
                                                            onClick: ()=>handleStatusChange(r._id, "Approved"),
                                                            children: t.approve
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                            lineNumber: 258,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "px-2 py-1 bg-red-600 text-white rounded",
                                                            onClick: ()=>handleStatusChange(r._id, "Rejected"),
                                                            children: t.reject
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                            lineNumber: 264,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "px-2 py-1 bg-blue-600 text-white rounded",
                                                            onClick: ()=>setSelectedRepayment(r),
                                                            children: t.repay
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                            lineNumber: 270,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                                    lineNumber: 257,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, r._id, true, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            selectedRepayment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedRepayment(null),
                            className: "absolute top-2 right-2 text-gray-500 hover:text-gray-700",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-4",
                            children: [
                                t.repay,
                                " ",
                                selectedRepayment.phone_number || selectedRepayment.farmer?.phone_number
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "space-y-4",
                            onSubmit: handleRepayment,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: t.amount,
                                    value: repayAmount,
                                    onChange: (e)=>setRepayAmount(e.target.value),
                                    className: "w-full border p-2 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: repayMethod,
                                    onChange: (e)=>setRepayMethod(e.target.value),
                                    className: "w-full border p-2 rounded",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "cash",
                                            children: t.cash
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "mobile_money",
                                            children: t.mobileMoney
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full bg-green-600 text-white p-2 rounded",
                                    children: t.submitRepayment
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                            lineNumber: 301,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                    lineNumber: 287,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
                lineNumber: 286,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/admin/dashboard/page.jsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4156811b._.js.map