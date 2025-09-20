(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiGet",
    ()=>apiGet,
    "apiPost",
    ()=>apiPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// Helper to get token
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem("authToken");
    }
    //TURBOPACK unreachable
    ;
}
async function apiGet(endpoint) {
    try {
        const token = getToken();
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(API_URL).concat(endpoint), {
            headers: token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        });
        return res.data;
    } catch (err) {
        var _err_response;
        throw ((_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.data) || err;
    }
}
async function apiPost(endpoint, payload) {
    try {
        const token = getToken();
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(API_URL).concat(endpoint), payload, {
            headers: token ? {
                Authorization: "Bearer ".concat(token)
            } : {}
        });
        return res.data;
    } catch (err) {
        var _err_response;
        throw ((_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.data) || err;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmerDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function FarmerDashboard() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])(); // get language
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [inputType, setInputType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [packageSize, setPackageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [repaymentDate, setRepaymentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingRequest, setLoadingRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const inputOptions = [
        {
            value: "seeds",
            label: {
                en: "Seeds",
                rw: "Imbuto"
            }
        },
        {
            value: "fertilizer",
            label: {
                en: "Fertilizer",
                rw: "Ifumbire"
            }
        },
        {
            value: "pesticides",
            label: {
                en: "Pesticides",
                rw: "Imiti yica udukoko"
            }
        }
    ];
    const statusLabels = {
        Pending: {
            en: "Pending",
            rw: "Bitegereje"
        },
        Approved: {
            en: "Approved",
            rw: "Yemejwe"
        },
        Rejected: {
            en: "Rejected",
            rw: "Yanenzwe"
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FarmerDashboard.useEffect": ()=>{
            if (!loading && !user) {
                router.push("/auth/login");
            } else {
                fetchData();
            }
        }
    }["FarmerDashboard.useEffect"], [
        user,
        loading,
        router
    ]);
    async function fetchData() {
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/loans/farmer/".concat((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id)));
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
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/loans/submit", {
                farmerId: (user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id),
                input_type: inputType,
                package_size: packageSize,
                repayment_date: repaymentDate,
                amount
            });
            // setRequests([res.request, ...requests]);
            setInputType("");
            setPackageSize("");
            setRepaymentDate("");
            setAmount("");
        } catch (err) {
            setError(err.message || "Failed to submit request");
        } finally{
            setLoadingRequest(false);
        }
    }
    const statusColor = (status)=>{
        switch(status){
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mt-10",
            children: t.loading || "Loading..."
        }, void 0, false, {
            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
            lineNumber: 101,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "max-w-6xl mx-auto p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold mb-6",
                    children: t.farmerDashboard
                }, void 0, false, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mb-8 p-4 bg-white rounded shadow",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold mb-4",
                            children: t.submitRequest
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t.inputType
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: inputType,
                                            onChange: (e)=>setInputType(e.target.value),
                                            className: "w-full border p-2 rounded mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: t.choice
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                inputOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: opt.value,
                                                        children: opt.label[lang]
                                                    }, opt.value, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t.packageSize
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: packageSize,
                                            onChange: (e)=>setPackageSize(e.target.value),
                                            className: "w-full border p-2 rounded mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t.repaymentDate
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: repaymentDate,
                                            onChange: (e)=>setRepaymentDate(e.target.value),
                                            className: "w-full border p-2 rounded mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t.amountOptional
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: amount,
                                            onChange: (e)=>setAmount(e.target.value),
                                            className: "w-full border p-2 rounded mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loadingRequest,
                                    className: "w-full bg-green-600 text-white p-2 rounded",
                                    children: loadingRequest ? "..." : t.submit
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold mb-2",
                            children: t.myRequests
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full bg-white rounded shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: t.inputType
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: t.packageSize
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: t.repaymentDate
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: t.amount
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-2",
                                                    children: t.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: requests.length ? requests.map((r)=>{
                                            var _inputOptions_find, _statusLabels_, _r_status_trim, _r_status, _r_status_trim1, _r_status1;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-center border-t",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-2",
                                                        children: ((_inputOptions_find = inputOptions.find((i)=>i.value === r.input_type)) === null || _inputOptions_find === void 0 ? void 0 : _inputOptions_find.label[lang]) || r.input_type
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 187,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-2",
                                                        children: r.package_size
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 191,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-2",
                                                        children: new Date(r.repayment_date).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 192,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-2",
                                                        children: r.amount
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-2 rounded ".concat(statusColor(r.status)),
                                                        children: ((_statusLabels_ = statusLabels[((_r_status = r.status) === null || _r_status === void 0 ? void 0 : (_r_status_trim = _r_status.trim()) === null || _r_status_trim === void 0 ? void 0 : _r_status_trim.charAt(0).toUpperCase()) + ((_r_status1 = r.status) === null || _r_status1 === void 0 ? void 0 : (_r_status_trim1 = _r_status1.trim()) === null || _r_status_trim1 === void 0 ? void 0 : _r_status_trim1.slice(1))]) === null || _statusLabels_ === void 0 ? void 0 : _statusLabels_[lang]) || r.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                        lineNumber: 196,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, r._id, true, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                lineNumber: 186,
                                                columnNumber: 21
                                            }, this);
                                        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                className: "text-center py-4 text-gray-500",
                                                children: t.noRequests
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/farmer/dashboard/page.jsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(FarmerDashboard, "pUAz1Kg2AjJE7rK8LIEsHFpxEtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = FarmerDashboard;
var _c;
__turbopack_context__.k.register(_c, "FarmerDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_FullStack_Verdln_verdln_frotend_8f7bd762._.js.map