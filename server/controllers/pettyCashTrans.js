import { queryDB } from "../utils/pgConnection.js";

export const getAllCashTrans = async (req, res) => {
  try {
    const result = await queryDB(`SELECT * FROM petty_cash_transactions`);
    const data = result.rows;
    if (!data.length === 0) {
      res
        .status(404)
        .json({ errorMessage: "No petty cash transactions found." });
    }
    res.status(200).json({
      message: "Petty cash transactions retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(
      "Error occurred while fetching petty cash transactions:",
      error
    );
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getCashTrans = async (req, res) => {
  try {
    const { transaction_id } = req.body;
    const result = await queryDB(
      `select * from petty_cash_transactions where transaction_id = $1`,
      [transaction_id]
    );
    const data = result.rows;

    if (!data.length === 0) {
      res
        .status(404)
        .json({ errorMessage: "No petty cash transaction found." });
    }
    res.status(200).json({
      message: "Petty cash transaction retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(
      "Error occurred while fetching petty cash transactions:",
      error
    );
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteCashTrans = async (req, res) => {
  try {
    const { transaction_id } = req.body;
    if (!transaction_id) {
      res.status(400).json({ errorMessage: "Transaction ID is required." });
    }
    const reult = await queryDB(
      `delete from petty_cash_transactions where transaction_id = $1 returning *`,
      [transaction_id]
    );
    const data = reult.rows[0];
    if (!data) {
      res.status(404).json({ errorMessage: "Transaction not found." });
    }
    res.status(200).json({
      errorMessage: "cash Transaction deleted successfully",
      data,
    });
  } catch (error) {
    console.error(
      "Error occurred while deleting petty cash transaction:",
      error
    );
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
// export const recordExpense = async (req, res) =>{
//     try{
//         const {amount , transaction_description,transcription_type,  created_date } = req.body;
//         if(!amount || !transaction_description || !transcription_type || !created_date){
//             return res.status(400).json({errorMessage: 'All fields are required.'});
//         }
//         const result = await queryDB(
//             `INSERT INTO petty_cash_transactions(
//              transaction_type, transaction_date,
//              amount, description,  receipt_number, vendor_name, authorized_by, remarks,created_by)
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
//             [transaction_type, transaction_date,
//              amount, description,  receipt_number, vendor_name, authorized_by, remarks,created_by]
//         );
//         const data = result.rows[0];
//         res.status(201).json({
//             message: "Expense recorded successfully",
//             data,
//         });
//     }catch(error){
//         console.error("Error occurred while recording expense:", error);
//         res.status(500).json({ errorMessage: "Internal server error" });
//     }
// };

// export const recoedDesposit = async(req, res) =>{

// }

export const getAllfundReconciliation = async (req, res) => {
  try {
    const result = await queryDB(`select * from fund_reconciliation`);
    const data = result.rows;
    if (!data.length === 0) {
      res
        .status(404)
        .json({ errorMessage: "No petty cash reconciliation found." });
    }
    res.status(200).json({
      message: "Petty cash reconciliation retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error occurred while reconciling funds:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getfundReconciliation = async (req, res) => {
  try {
    const { reconciliation_id } = req.body;
    const result = await queryDB(
      `select * from fund_reconciliation where reconciliation_id = $1`,
      [reconciliation_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ errorMessage: "No petty cash reconciliation found." });
    }
    const data = result.rows[0];
    return res.status(200).json({
      message: "Petty cash reconciliation retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(
      "Error occurred while fetching petty cash reconciliation:",
      error
    );
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const addfundReconciliation = async (req, res) => {
  try {
    const {
      fund_id,
      reconciliation_date,
      opening_balance,
      total_expenses,
      total_replenishments,
      calculated_balance,
      physical_cash_count,
      variance,
      reconciled_by,
      notes,
    } = req.body;
    const result = await queryDB(
      `INSERT INTO FUND_RECONCILIATION (
    fund_id, reconciliation_date, opening_balance,
    total_expenses, total_replenishments, calculated_balance,
    physical_cash_count, variance, reconciled_by, notes
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *`,
      [
        fund_id,
        reconciliation_date,
        opening_balance,
        total_expenses,
        total_replenishments,
        calculated_balance,
        physical_cash_count,
        variance,
        reconciled_by,
        notes,
      ]
    );

    const data = result.rows[0];
    res.status(201).json({
      message: "Fund reconciliation added successfully",
      data: {
        fund_id: data.fund_id,
        reconciliation_id: data.reconciliation_id,
        reconciliation_date: data.reconciliation_date,
        opening_balance: data.opening_balance,
        total_expenses: data.total_expenses,
        total_replenishments: data.total_replenishments,
        calculated_balance: data.calculated_balance,
        physical_cash_count: data.physical_cash_count,
        variance: data.variance,
        reconciled_by: data.reconciled_by,
        notes: data.notes,
      },
    });
  } catch (error) {
    console.error("Error occurred while adding fund reconciliation:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deletefundReconciliation = async (req, res) => {
  try {
    const { reconciliation_id } = req.body;
    const result = await queryDB(
      `delete from fund_reconciliation where reconciliation_id = $1 returning *`,
      [reconciliation_id]
    );
    const data = result.rows[0];
    if (!data) {
      return res
        .status(404)
        .json({ errorMessage: "Reconciliation record not found." });
    }
    return res.status(200).json({
      errorMessage: "Fund reconciliation deleted successfully",
      data,
    });
  } catch (error) {
    console.error(
      "error encountered while updating fund reconciliation:",
      error
    );
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
