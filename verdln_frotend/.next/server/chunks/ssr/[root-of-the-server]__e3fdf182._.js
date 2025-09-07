module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/translations.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        appName: "VerdIn",
        tagline: "Input credit for farmers",
        home: "Home",
        farmer: "Farmer",
        admin: "Admin",
        ussd: "USSD",
        login: "Login",
        register: "Register",
        registerTitle: "Register as Farmer",
        nationalId: "National ID",
        phoneNumber: "Phone Number",
        preferredLanguage: "Preferred Language",
        submit: "Submit",
        required: "All fields are required",
        invalidPhone: "Invalid phone number",
        loginTitle: "Login to Your Account",
        loginButtonLabel: "Login",
        //farmer dashboard
        farmerDashboard: "Farmer Dashboard",
        submitRequest: "Submit a Request",
        inputType: "Input Type",
        packageSize: "Package Size",
        repaymentDate: "Repayment Date",
        amount: "Amount",
        amountOptional: "Amount (optional)",
        myRequests: "My Requests",
        repaymentHistory: "Repayment History",
        method: "Method",
        status: "Status",
        submit: "Submit",
        noRequests: "No requests submitted yet.",
        noRepayments: "No repayment history available.",
        required: "All fields are required.",
        //admin dashboard
        adminDashboardTitle: "Admin Dashboard",
        totalLoans: "Total Loans",
        totalRepayments: "Total Repayments",
        pendingRequests: "Pending Requests",
        farmer: "Farmer",
        input: "Input",
        package: "Package",
        amount: "Amount",
        status: "Status",
        notes: "Notes",
        actions: "Actions",
        approve: "Approve",
        reject: "Reject",
        repay: "Repay",
        submitRepayment: "Submit Repayment",
        cash: "Cash",
        mobileMoney: "Mobile Money"
    },
    rw: {
        appName: "VerdIn",
        tagline: "Inguzanyo y'ibikoresho",
        home: "Ahabanza",
        farmer: "Umuhinzi",
        admin: "Ubuyobozi",
        ussd: "USSD",
        login: "Injira",
        register: "Iyandikishe",
        registerTitle: "Iyandikishe nk'Umuhinzi",
        nationalId: "Indangamuntu",
        phoneNumber: "Numero ya Telefoni",
        preferredLanguage: "Ururimi Ukunda",
        submit: "Ohereza",
        required: "Ibyo byose birakenewe",
        invalidPhone: "Numero ya telefoni ntabwo ari nziza",
        loginTitle: "Injira muri Konti yawe",
        loginButtonLabel: "Injira",
        //farmer dashboard
        farmerDashboard: "Farmer Dashboard",
        submitRequest: "Submit a Request",
        inputType: "Input Type",
        packageSize: "Package Size",
        repaymentDate: "Repayment Date",
        amount: "Amount",
        amountOptional: "Amount (optional)",
        myRequests: "My Requests",
        repaymentHistory: "Repayment History",
        method: "Method",
        status: "Status",
        submit: "Submit",
        noRequests: "No requests submitted yet.",
        noRepayments: "No repayment history available.",
        required: "All fields are required.",
        //admin dashboard
        adminDashboardTitle: "Dashboard y'Ubuyobozi",
        totalLoans: "Inguzanyo zose",
        totalRepayments: "Amafaranga yasubijwe",
        pendingRequests: "Ububiko butarashyirwaho igisubizo",
        farmer: "Umuhinzi",
        input: "Ikikoresho",
        package: "Paketi",
        amount: "Amafaranga",
        status: "Status",
        notes: "Inyandiko",
        actions: "Ibikorwa",
        approve: "Emeza",
        reject: "Hakana",
        repay: "Subiza",
        submitRepayment: "Ohereza Subiza",
        cash: "Amafaranga",
        mobileMoney: "Mobile Money"
    }
};
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Utils/translations.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function LanguageProvider({ children }) {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    // Load saved language from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("preferredLang");
        if (saved) setLang(saved);
    }, []);
    // Save to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("preferredLang", lang);
    }, [
        lang
    ]);
    // Translation helper
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Utils$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            lang,
            setLang,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
}
}),
"[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FullStack/Verdln/verdln_frotend/Context/LanguageContext.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Navbar() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { lang, setLang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$Context$2f$LanguageContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])(); // use context
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-white border-b sticky top-0 z-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-green-700 font-extrabold text-lg",
                                    children: t.appName
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 17,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline text-sm text-gray-600",
                                    children: t.tagline
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    label: t.home,
                                    href: "/"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    label: t.farmer,
                                    href: "/farmer/dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    label: t.admin,
                                    href: "/admin/dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    label: t.ussd,
                                    href: "#ussd"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LangSwitcher, {
                                    lang: lang,
                                    setLang: setLang
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthButtons, {
                                    t: t
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LangSwitcher, {
                                    lang: lang,
                                    setLang: setLang,
                                    compact: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpen(!open),
                                    "aria-label": "Toggle menu",
                                    className: "p-2 rounded-md focus:outline-none focus:ring",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-6 h-6",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden px-4 pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                            label: t.home,
                            href: "/"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                            label: t.farmerDashboard,
                            href: "/farmer/dashboard"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                            label: t.adminDashboard,
                            href: "/admin/dashboard"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                            label: t.ussdInfo,
                            href: "#ussd"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-2 border-t mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthButtons, {
                                stacked: true,
                                t: t
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
// Desktop NavLink with active link
function NavLink({ label, href = "#" }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = pathname === href;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `text-gray-700 hover:text-green-700 px-2 py-1 rounded-md text-sm ${isActive ? "text-green-700 font-semibold" : ""}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
// Mobile link with active link
function MobileLink({ label, href = "#" }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = pathname === href;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md ${isActive ? "bg-green-100 text-green-700 font-semibold" : ""}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
// Language switcher
function LangSwitcher({ lang, setLang, compact = false }) {
    if (compact) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: lang,
            onChange: (e)=>setLang(e.target.value),
            className: "px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: "en",
                    children: "EN"
                }, void 0, false, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: "rw",
                    children: "RW"
                }, void 0, false, {
                    fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
            lineNumber: 117,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setLang("en"),
                className: `px-2 py-1 rounded text-sm ${lang === "en" ? "bg-green-400 text-white" : "hover:bg-gray-100"}`,
                children: "EN"
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setLang("rw"),
                className: `px-2 py-1 rounded text-sm ${lang === "rw" ? "bg-green-400 text-white" : "hover:bg-gray-100"}`,
                children: "RW"
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
// Auth buttons
function AuthButtons({ stacked = false, t }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: stacked ? "flex flex-col gap-2 mt-2" : "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/auth/login",
                className: "text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50",
                children: t.login
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FullStack$2f$Verdln$2f$verdln_frotend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/auth/register",
                className: "text-sm px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700",
                children: t.register
            }, void 0, false, {
                fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FullStack/Verdln/verdln_frotend/components/Navbar.jsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e3fdf182._.js.map