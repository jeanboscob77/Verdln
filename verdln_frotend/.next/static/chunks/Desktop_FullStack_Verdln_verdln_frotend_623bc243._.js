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
"[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function RegisterPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t, lang, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [nationalId, setNationalId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [preferred, setPreferred] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(lang || "en");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function validate() {
        if (!nationalId || !phone) {
            setError(t.required);
            return false;
        }
        if (!/^\+?\d{7,15}$/.test(phone)) {
            setError(t.invalidPhone);
            return false;
        }
        return true;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!validate()) return;
        setLoading(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/auth/register", {
                national_id: nationalId,
                phone_number: phone,
                preferred_language: preferred
            });
            if (data.success) {
                // persist chosen language locally and in context
                setLang(preferred);
                localStorage.setItem("preferredLang", preferred);
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    router.push("/farmer/dashboard");
                } else {
                    router.push("/auth/login");
                }
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto mt-10 p-6 bg-white rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold mb-4",
                children: t.registerTitle
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                lineNumber: 66,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: t.nationalId
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: nationalId,
                                onChange: (e)=>setNationalId(e.target.value),
                                className: "w-full border p-2 rounded mt-1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: t.phoneNumber
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: phone,
                                onChange: (e)=>setPhone(e.target.value),
                                placeholder: "+2507...",
                                className: "w-full border p-2 rounded mt-1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: t.preferredLanguage
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: preferred,
                                onChange: (e)=>setPreferred(e.target.value),
                                className: "w-full border p-2 rounded mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "en",
                                        children: "English"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "rw",
                                        children: "Kinyarwanda"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-green-600 hover:bg-green-500 text-white p-2 rounded",
                        children: loading ? "..." : t.register
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/app/auth/register/page.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(RegisterPage, "IdYA1d4sZLRbByZKj5UtiHecFrA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_FullStack_Verdln_verdln_frotend_623bc243._.js.map