const pool = require("../../config/db");
const { goBack } = require("../handlers/sessions");

const inputTypeNames = {
  Seeds: "Imbuto",
  Fertilizers: "Ifumbire",
  Pesticides: "Imiti yo kurwanya udukoko",
};

const inputSubtypeNames = {
  NPK: "NPK",
  UREA: "UREA",
  DAP: "DAP",
  Insecticide: "Imiti irwanya udukoko",
  Herbicide: "Imiti irwanya ibyatsi bibi",
  Fungicide: "Imiti irwanya udukoko tw’indwara z’ibimera",
  "Rice Seeds": "Imbuto z’umuceri",
  "Beans Seeds": "Imbuto z’ibishyimbo",
  "Maize Seeds": "Imbuto z’ibigori",
};

const loanStatus = {
  pending: "Bitegereje",
  approved: "Byemejwe",
  rejected: "Byanzwe",
};

async function handleAdminLoans(session, input, mode = "view") {
  const { handleRoleMenu } = require("../auth/handleRoleMenu");
  const pageSize = 5;

  // ------------------- Fetch loans -------------------
  let query = `
    SELECT lr.id, u.full_name AS farmer_name, it.type AS input_type,
      st.name AS input_subtype, st.price, lr.interest_amount, lr.package_size,
      lr.repayment_date, lr.loan_amount, lr.total_amount, lr.status
    FROM loan_requests lr
    JOIN users u ON lr.farmer_id = u.id
    JOIN input_types it ON lr.input_type_id = it.id
    JOIN input_subtypes st ON lr.input_subtype_id = st.id
  `;
  if (mode === "approve") query += " WHERE LOWER(lr.status)='pending'";
  query += " ORDER BY lr.created_at DESC";

  const [loans] = await pool.query(query);

  if (!loans.length)
    return {
      type: "CON",
      message:
        mode === "approve"
          ? "Nta nguzanyo zitegereje kwemezwa."
          : "Nta nguzanyo zabonetse.",
    };

  if (!session.loanPage) session.loanPage = 0;

  const start = session.loanPage * pageSize;
  const end = start + pageSize;
  const loansPage = loans.slice(start, end);

  // ------------------- Loan list -------------------
  if (!session.stepDetail) {
    let msg =
      mode === "approve"
        ? "Hitamo Inguzanyo yemezwa:\n"
        : "Inguzanyo Zasabwe:\n";

    loansPage.forEach((l, i) => {
      msg += `${i + 1}. ${l.farmer_name} - ${
        inputTypeNames[l.input_type] || l.input_type
      } - ${loanStatus[l.status.toLowerCase()] || l.status}\n`;
    });

    if (session.loanPage > 0) msg += "P. Ahabanza\n";
    if (end < loans.length) msg += "N. Komeza\n";
    msg += "0. Garuka";

    if (!input) return { type: "CON", message: msg };

    if (input.toUpperCase() === "N") {
      session.loanPage++;
      return await handleAdminLoans(session, null, mode);
    }
    if (input.toUpperCase() === "P") {
      session.loanPage = Math.max(0, session.loanPage - 1);
      return await handleAdminLoans(session, null, mode);
    }
    if (input === "0") {
      session.stepDetail = false;
      goBack(session);
      return await handleRoleMenu(session, null);
    }

    const idx = parseInt(input) - 1;
    if (idx >= 0 && idx < loansPage.length) {
      session.selected_loan_id = loansPage[idx].id;
      session.stepDetail = true;
      return await handleAdminLoans(session, null, mode);
    }

    return { type: "CON", message: "Wahisemo nabi." };
  }

  // ------------------- Loan detail -------------------
  const loan = loans.find((l) => l.id === session.selected_loan_id);
  let detail = `Amakuru y'Inguzanyo:\n
Umuhinzi: ${loan.farmer_name}
Icyo yasabye: ${inputTypeNames[loan.input_type] || loan.input_type}
Ibyo yasabye: ${inputSubtypeNames[loan.input_subtype] || loan.input_subtype}
Ingano: ${loan.package_size}
Igiciro: ${loan.price || "N/A"}
Inguzanyo: ${loan.loan_amount}
Inyungu: ${loan.interest_amount}
Inguzanyo hamwe n’inyungu: ${loan.total_amount}
Igihe izishyurirwa: ${loan.repayment_date.toISOString().split("T")[0]}
Imiterere: ${loanStatus[loan.status.toLowerCase()] || loan.status}`;

  // Menu yemeza / yanga gusa kuri pending loans + mode approve
  if (mode === "approve" && loan.status.toLowerCase() === "pending") {
    detail += `\n\n1. Yemeza\n2. Yange\n0. Garuka`;
  } else {
    detail += `\n\n0. Garuka`;
  }

  if (!input) return { type: "CON", message: detail };

  // ------------------- Approval / Reject -------------------
  if (input === "1" && mode === "approve") {
    await pool.query("UPDATE loan_requests SET status='approved' WHERE id=?", [
      loan.id,
    ]);
    session.stepDetail = false;
    return await handleAdminLoans(session, null, mode);
  }
  if (input === "2" && mode === "approve") {
    await pool.query("UPDATE loan_requests SET status='rejected' WHERE id=?", [
      loan.id,
    ]);
    session.stepDetail = false;
    return await handleAdminLoans(session, null, mode);
  }

  if (input === "0") {
    session.stepDetail = false;
    return await handleAdminLoans(session, null, mode);
  }

  return { type: "CON", message: "Wahisemo nabi." };
}

module.exports = { handleAdminLoans };
