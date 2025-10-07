const pool = require("../../config/db");
const { goBack } = require("../handlers/sessions");
const { handleRoleMenu } = require("../auth/handleRoleMenu");

//dsfndsfsdfsdfd

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
  Pending: "Bitegereje",
  Approved: "Byemejwe",
  Rejected: "Byanzwe",
};
// ------------------- FARMER VIEW LOANS -------------------
async function handleFarmerLoans(session, input) {
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
      message: "Nta nguzanyo Wasabye.",
    };

  const start = session.loanPage * pageSize;
  const end = start + pageSize;
  const loansPage = loans.slice(start, end);

  let msg = "Inguzanyo wasabye:\n";
  loansPage.forEach((l, i) => {
    msg += `${i + 1}. ${inputTypeNames[l.input_type] || l.input_type} - ${
      inputSubtypeNames[l.input_subtype] || l.input_subtype
    } - ${l.package_size} units - Igihe uzushyurira: ${
      l.repayment_date.toISOString().split("T")[0]
    } - Inguzanyo: ${l.loan_amount} - (inguzanyo + inyungu): ${
      l.total_amount
    } - Imiterere: ${loanStatus[l.status] || l.status}\n`;
  });

  if (session.loanPage > 0) msg += "P. Ahabanza\n";
  if (end < loans.length) msg += "N. Ahakurikira\n";
  msg += "0. Garuka";

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
    const detail = `Amakuru Yinguzanyo\n Ibyo wasabye: ${
      inputTypeNames[loan.input_type] || loan.input_type
    }\n Ibyo wasabye
     ${inputSubtypeNames[loan.input_subtype] || loan.input_subtype}\nIngano: ${
      loan.package_size
    }\nIngano Yinguzanyo: ${loan.loan_amount}\nInguzanyo hamwe ninyungu: ${
      loan.total_amount
    }\nIgihe azishyurirwa: ${
      loan.repayment_date.toISOString().split("T")[0]
    }\nImiterere: ${loanStatus[loan.status] || loan.status}\n0. Garuka`;
    return { type: "CON", message: detail };
  }

  return {
    type: "CON",
    message: "Wahisemo nabi",
  };
}

module.exports = { handleFarmerLoans };
