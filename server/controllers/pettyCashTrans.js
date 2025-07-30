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
      `select * from perry_cash_transactions where transaction_id = $1`,
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
    try{
        const result = await queryDB(
            `select * from petty_cash_reconciliation`
        );
        const data = result.rows;
        if(!data.length === 0){
            res.status(404).json({ errorMessage: "No petty cash reconciliation found." });

        }
        res.status(200).json({
            message: "Petty cash reconciliation retrieved successfully",
            data,
        });


    }catch(error){
        console.error("Error occurred while reconciling funds:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}

export const getfundReconciliation = async(req, res) =>{
    try{
        const { reconciliation_id } = req.body;
        const result = await queryDB(
            `select * from petty_cash_reconciliation where reconciliation_id = $1`,
            [reconciliation_id]
        );
        const data = result.rows;

        if(!data.length === 0){
            res.status(404).json({ errorMessage: "No petty cash reconciliation found." });
        }
        res.status(200).json({
            message: "Petty cash reconciliation retrieved successfully",
            data,
        });

    }catch(error){
        console.error("Error occurred while fetching petty cash reconciliation:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}