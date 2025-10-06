const { v4: uuidv4 } = require("uuid");
const pool = require("../../config/db");
const {
  getInputTypes,
  getInputSubtypes,
  getLocations,
} = require("../handlers/handleInputs");
const { saveStep, deleteSession } = require("../handlers/sessions");

// ------------------- LOAN REQUEST (FARMER) -------------------
async function handleLoanRequest(session, input) {
  const lang = session.lang || "en";

  if (session.step === "loan_inputType") {
    const types = await getInputTypes();
    if (!input) {
      let msg = `${
        lang === "en" ? "Select input type:" : "Hitamo Ibyo ushaka:"
      }\n`;
      types.forEach((t, i) => (msg += `${i + 1}. ${t.type}\n`));
      return { type: "CON", message: msg };
    }
    const idx = parseInt(input) - 1;
    session.input_type_id = types[idx].id;
    saveStep(session, "loan_inputSubtype");
    return await handleLoanRequest(session, null);
  }

  if (session.step === "loan_inputSubtype") {
    const subtypes = await getInputSubtypes(session.input_type_id);
    if (!input) {
      let msg = `${
        lang === "en" ? "Select subtype" : "Hitamo Ibyo ushaka"
      }:\n"`;
      subtypes.forEach((s, i) => (msg += `${i + 1}. ${s.name}\n`));
      return { type: "CON", message: msg };
    }
    const idx = parseInt(input) - 1;
    session.input_subtype_id = subtypes[idx].id;
    session.selected_subtype_price = subtypes[idx].price; // <-- save price
    saveStep(session, "loan_packageSize");
    return {
      type: "CON",
      message: `${
        lang === "en" ? "Enter package size" : "Shyiramo Ingano yibyushaka"
      }:`,
    };
  }

  if (session.step === "loan_packageSize") {
    session.package_size = parseInt(input);
    saveStep(session, "loan_province");
    return await handleLoanRequest(session, null);
  }

  // ------------------- LOCATION SELECTION -------------------
  const locationSteps = [
    "loan_province",
    "loan_district",
    "loan_sector",
    "loan_cell",
    "loan_supplier",
  ];

  if (session.step.startsWith("loan_")) {
    const currentStep = session.step;
    const stepIdx = locationSteps.indexOf(currentStep);
    if (stepIdx !== -1) {
      const level = currentStep.split("_")[1];

      const parent =
        level === "district"
          ? session.province_id
          : level === "sector"
          ? session.district_id
          : level === "cell"
          ? session.sector_id
          : level === "supplier"
          ? session.cell_id
          : null;

      const locations = await getLocations(level, parent);
      if (!locations.length)
        return { type: "CON", message: `No ${level} found. Try again.` };

      if (!input) {
        let msg = `${lang === "en" ? "Select" : "Hitamo"} ${level}:\n`;
        locations.forEach((l, i) => {
          msg += `${i + 1}. ${l.name || l.full_name}\n`;
        });
        return { type: "CON", message: msg };
      }

      const idx = parseInt(input) - 1;
      const selected = locations[idx];
      if (!selected) return { type: "CON", message: "Invalid choice." };

      if (level === "province") session.province_id = selected.id;
      if (level === "district") session.district_id = selected.id;
      if (level === "sector") session.sector_id = selected.id;
      if (level === "cell") session.cell_id = selected.id;
      if (level === "supplier") session.supplier_id = selected.id;

      const nextIdx = stepIdx + 1;
      if (nextIdx < locationSteps.length) {
        saveStep(session, locationSteps[nextIdx]);
        return await handleLoanRequest(session, null);
      } else {
        saveStep(session, "loan_repaymentDate");
        return {
          type: "CON",
          message: `${
            lang === en
              ? "Enter repayment date (YYYY-MM-DD)"
              : "Shyiramo Igihe cyo Kwishyura (YYYY-MM-DD)"
          }:`,
        };
      }
    }
  }

  // ------------------- REPAYMENT DATE -------------------
  if (session.step === "loan_repaymentDate") {
    session.repayment_date = input;
    saveStep(session, "loan_confirm");
    return await handleLoanRequest(session, null);
  }

  // ------------------- CONFIRM LOAN -------------------
  if (session.step === "loan_confirm") {
    if (!input)
      return {
        type: "CON",
        message: `${
          lang === "en"
            ? "Confirm loan request?"
            : "Uremeza Gasaba Inguzanyo Kwawe?"
        }\n1.${lang === "en" ? "Yes" : "Yego"}\n2. ${
          lang === "en" ? "No" : "Oya"
        }`,
      };
    if (input === "1") {
      const loan_amount = session.package_size * session.selected_subtype_price;
      const interest_rate = session.interest_rate || 10; // you can set it from DB if needed
      const interest = Math.ceil((loan_amount * interest_rate) / 100); // 10% default
      const total_amount = loan_amount + interest;

      await pool.query(
        `INSERT INTO loan_requests 
        (id, farmer_id, input_type_id, input_subtype_id, package_size, supplier_id, province_id, district_id, sector_id, cell_id, repayment_date, loan_amount, total_amount, interest_amount, status, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
        [
          uuidv4(),
          session.userId,
          session.input_type_id,
          session.input_subtype_id,
          session.package_size,
          session.supplier_id,
          session.province_id,
          session.district_id,
          session.sector_id,
          session.cell_id,
          session.repayment_date,
          loan_amount,
          total_amount,
          interest,
          "pending",
        ]
      );
      deleteSession(session.sessionId);
      return {
        type: "END",
        message: `${
          lang === "en"
            ? "Loan request submitted!"
            : "Gusaba Inguzanyo byagenze neza"
        }`,
      };
    } else {
      deleteSession(session.sessionId);
      return {
        type: "END",
        message: `${
          lang === "en" ? "Loan request cancelled." : "Gusaba Inguzanyo Byanze"
        }`,
      };
    }
  }

  return {
    type: "END",
    message: `${
      lang === "en" ? "Unexpected step." : "Iyi ntambwe niyari yitenzwe"
    }`,
  };
}

module.exports = { handleLoanRequest };
