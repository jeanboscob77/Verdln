const pool = require("../../config/db");
const { goBack } = require("../handlers/sessions");

// ------------------- ADMIN VIEW & APPROVE LOANS -------------------
async function handleAdminLoans(session, input) {
  const { handleRoleMenu } = require("../auth/handleRoleMenu");
  const lang = session.lang || "en";
  const pageSize = 5;

  const [loans] = await pool.query(
    `SELECT lr.id, u.full_name AS farmer_name, it.type AS input_type, st.name AS input_subtype, lr.package_size, lr.repayment_date, lr.loan_amount, lr.total_amount, lr.status
     FROM loan_requests lr
     JOIN users u ON lr.farmer_id = u.id
     JOIN input_types it ON lr.input_type_id = it.id
     JOIN input_subtypes st ON lr.input_subtype_id = st.id
     ORDER BY lr.created_at DESC`
  );

  if (!loans.length)
    return {
      type: "CON",
      message: lang === "en" ? "No loan requests." : "Nta nguzanyo.",
    };

  if (!session.loanPage) session.loanPage = 0;

  const start = session.loanPage * pageSize;
  const end = start + pageSize;
  const loansPage = loans.slice(start, end);

  const translations = {
    loanStatus: {
      Pending: "Pending",
      Approved: "Approved",
      Rejected: "Rejected",
    },

    loanStatus: {
      Pending: "Bitegereje",
      Approved: "Byemejwe",
      Rejected: "Byanzwe",
    },
  };

  if (!session.stepDetail) {
    let msg;
    lang === "en" ? (msg = "Loan Requests:\n") : (msg = "Inguzanyo Zasabwe:\n");
    loansPage.forEach((l, i) => {
      msg += `${i + 1}. ${l.farmer_name} - ${l.input_type} - ${
        translations.loanStatus[l.status]
      }\n`;
    });
    if (session.loanPage > 0)
      msg += lang === "en" ? "P. Previous\n" : "P. Ahabanza";
    if (end < loans.length) msg += lang === "en" ? "N. Next\n" : "N. Komeza";
    msg += lang === "en" ? " 0. Back" : " 0. Garuka";

    if (!input) return { type: "CON", message: msg };

    if (input.toUpperCase() === "N") {
      session.loanPage++;
      return await handleAdminLoans(session, null);
    }
    if (input.toUpperCase() === "P") {
      session.loanPage = Math.max(0, session.loanPage - 1);
      return await handleAdminLoans(session, null);
    }
    if (input === "0") {
      goBack(session);
      return await handleRoleMenu(session, null);
    }

    const idx = parseInt(input) - 1;
    if (idx >= 0 && idx < loansPage.length) {
      session.selected_loan_id = loansPage[idx].id;
      session.stepDetail = true;
      return await handleAdminLoans(session, null);
    }

    return { type: "CON", message: "Invalid choice." };
  }

  const loan = loans.find((l) => l.id === session.selected_loan_id);
  let detail = `${lang === "en" ? "Loan Detail:" : "Amakuru Yinguzanyo:"}\n${
    lang === "en" ? "Farmer:" : "Umuhinzi:"
  } ${loan.farmer_name}\nType: ${loan.input_type}\nSubtype: ${
    loan.input_subtype
  }\nPackage: ${loan.package_size}\nLoan: ${loan.loan_amount}\nTotal: ${
    loan.total_amount
  }\nDue: ${loan.repayment_date.toISOString().split("T")[0]}\n${
    lang === "en" ? "Status:" : "Imiterere:"
  } ${translations.loanStatus[loan.status]}\n1. ${
    lang === "en" ? "Approve" : "Yemeze"
  }\n2. ${lang === "en" ? "Reject" : "Yange"}\n0. ${
    lang === "en" ? "Back" : "Garuka"
  }`;

  if (!input) return { type: "CON", message: detail };

  if (input === "1") {
    await pool.query("UPDATE loan_requests SET status='approved' WHERE id=?", [
      loan.id,
    ]);
    session.stepDetail = false;
    return {
      type: "CON",
      message: `${
        lang === "en" ? "Loan approved!" : "Inguzanyo Yemejwe!"
      }\n0. ${lang === "en" ? "Back" : "Garuka"}`,
    };
  }
  if (input === "2") {
    await pool.query("UPDATE loan_requests SET status='rejected' WHERE id=?", [
      loan.id,
    ]);
    session.stepDetail = false;
    return {
      type: "CON",
      message: `${lang === "en" ? "Loan rejected!" : "Inguzanyo Yanzwe"}\n0. ${
        lang === "en" ? "Back" : "Garuka"
      }`,
    };
  }
  if (input === "0") {
    session.stepDetail = false;
    return await handleAdminLoans(session, null);
  }

  return {
    type: "CON",
    message: `${lang === "en" ? "Invalid choice." : "Wahisemo nabi."}`,
  };
}

module.exports = { handleAdminLoans };
