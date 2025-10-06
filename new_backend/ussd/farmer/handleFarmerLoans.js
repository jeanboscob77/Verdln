const pool = require("../../config/db");
const { goBack } = require("../handlers/sessions");
const { handleRoleMenu } = require("../auth/handleRoleMenu");
// ------------------- FARMER VIEW LOANS -------------------
async function handleFarmerLoans(session, input) {
  const lang = session.lang || "en";
  const pageSize = 5;

  const [loans] = await pool.query(
    `SELECT lr.id, it.type AS input_type, st.name AS input_subtype,
            lr.package_size, lr.repayment_date, lr.loan_amount, lr.total_amount, lr.status
     FROM loan_requests lr
     JOIN input_types it ON lr.input_type_id = it.id
     JOIN input_subtypes st ON lr.input_subtype_id = st.id
     WHERE lr.farmer_id=? ORDER BY lr.created_at DESC`,
    [session.userId]
  );

  if (!loans.length)
    return {
      type: "CON",
      message: lang === "en" ? "No loans yet." : "Nta nguzanyo.",
    };

  const start = session.loanPage * pageSize;
  const end = start + pageSize;
  const loansPage = loans.slice(start, end);

  let msg = lang === "en" ? "Your Loans:\n" : "Inguzanyo zawe:\n";
  loansPage.forEach((l, i) => {
    msg += `${i + 1}. ${l.input_type} - ${l.input_subtype} - ${
      l.package_size
    } units - Due: ${l.repayment_date.toISOString().split("T")[0]} - Loan: ${
      l.loan_amount
    } - Total: ${l.total_amount} - ${l.status}\n`;
  });

  if (session.loanPage > 0) msg += "P. Previous\n";
  if (end < loans.length) msg += "N. Next\n";
  msg += "0. Back";

  if (!input) return { type: "CON", message: msg };

  if (input.toUpperCase() === "N") {
    session.loanPage++;
    return await handleFarmerLoans(session, null);
  }
  if (input.toUpperCase() === "P") {
    session.loanPage = Math.max(0, session.loanPage - 1);
    return await handleFarmerLoans(session, null);
  }
  if (input === "0") {
    goBack(session);
    return await handleRoleMenu(session, null);
  }

  const idx = parseInt(input) - 1;
  if (idx >= 0 && idx < loansPage.length) {
    const loan = loansPage[idx];
    const detail = `${lang === en ? "Loan Detail:" : "Amakuru Yinguzanyo"}\n ${
      lang === "en" ? "what you requested:" : "Ibyo wasabye"
    } ${loan.input_type}\n${
      lang === en ? "Type you requested:" : "Ibyo wasabye"
    } ${loan.input_subtype}\n${lang === "en" ? "Package Size" : "Ingano"}: ${
      loan.package_size
    }\n${lang === "en" ? "Amount of Loan" : "Ingano Yinguzanyo"}: ${
      loan.loan_amount
    }\n${
      lang === "en" ? "Total of loan and Interest" : "Inguzanyo hamwe ninyungu"
    }: ${loan.total_amount}\n${lang === en ? "Due" : "Igihe azishyurirwa"}: ${
      loan.repayment_date.toISOString().split("T")[0]
    }\n${lang === "en" ? "Status" : "Imiterere"}: ${loan.status}\n0. ${
      lang === "en" ? "Back" : "Garuka"
    }`;
    return { type: "CON", message: detail };
  }

  return {
    type: "CON",
    message: `${lang === "en" ? "Invalid choice." : "Wahisemo nabi"} `,
  };
}

module.exports = { handleFarmerLoans };
