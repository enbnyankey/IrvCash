import { queryDB } from "../utils/pgConnection.js";

export const addFunds = async (req, res) => {
  try {
    const {
      fund_name,
      fund_description,
      initial_amount,
      custodian_name,
      custodian_email,
      location,
    } = req.body;
    if (
      !initial_amount ||
      !fund_description ||
      !fund_name ||
      !custodian_name ||
      !custodian_email ||
      !location
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Amount and description are required." });
    }
    const fund_type = "debit" || "credit";
    const date = new Date();
    const created_at = date.toISOString().split("T")[0];
    const result = await queryDB(
      `
            Insert into petty_cash_funds(
            fund_name, fund_description, initial_amount, custodian_name,
             custodian_email, location,created_date, fund_type)
              values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      [
        fund_name,
        fund_description,
        initial_amount,
        custodian_name,
        custodian_email,
        location,
        created_at,
        fund_type,
      ]
    );
    const data = result.rows[0];
    return res.status(201).json({
      message: "Funds added successfully",
      data: {
        fund_name: data.fund_name,
        fund_description: data.fund_description,
        initial_amount: data.initial_amount,
        custodian_name: data.custodian_name,
        custodian_email: data.custodian_email,
        location: data.location,
      },
    });
  } catch (error) {
    console.error("error occured adding funds ", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getFunds = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ errorMessage: "Fund ID is required." });
    }
    const result = await queryDB(
      `select * from petty_cash_funds where fund_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ errorMessage: "Fund not found." });
    }
    const data = result.rows[0];
    return res.status(200).json({
      message: "Fund retrieved successfully",
      data: {
        fund_name: data.fund_name,
        fund_description: data.fund_description,
        initial_amount: data.initial_amount,
        custodian_name: data.custodian_name,
        custodian_email: data.custodian_email,
        location: data.location,
      },
    });
  } catch (error) {
    console.error("error occured getting funds", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateFunds = async (req, res) => {
  try {
    const {
      fund_name,
      fund_description,
      initial_amount,
      custodian_name,
      custodian_email,
      location,
    } = req.body;
    const result = await queryDB(
      `
        UPDATE petty_cash_funds
        SET fund_name = $1,
            fund_description = $2,
            initial_amount = $3,
            custodian_name = $4,
            custodian_email = $5,
            location = $6
        WHERE fund_id = $7
        RETURNING *`,
      [
        fund_name,
        fund_description,
        initial_amount,
        custodian_name,
        custodian_email,
        location,
        req.params.id,
      ]
    );
    const data = result.rows;
    if (!data) {
      return res.status(404).json({ errorMessage: "Fund not found." });
    } else {
      return res.status(200).json({
        message: "Fund updated successfully",
      });
    }
  } catch (error) {
    console.error("errror occured updating funds", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getUserFunds = async (req, res) => {
  try {
    const result = await queryDB(`select * from petty_cash_funds`);
    if (result.rows.length === 0) {
      return res.status(404).json({ errorMessage: "Fund not found." });
    }
    const data = result.rows;
    return res.status(200).json({
      message: "Fund retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("error occured getting funds", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getFundBalance = async (req, res) => {
  try {
    const result = await queryDB(
      `SELECT
    SUM(CASE
            WHEN fund_type = 'credit' THEN initial_amount
            WHEN fund_type = 'debit' THEN -initial_amount
        END) AS fund_balance
    FROM
    petty_cash_funds`
    );
    const data = result.rows;
    if (!data === null) {
      return res.status(404).json({ errorMessage: "No funds found." });
    }
    res.status(200).json({
      errorMessage: "Funds balance retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("error occured getting fund balance", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};


export const deleteFunds = async(req, res) =>{
  try{
    const { fund_id } = req.body;
    if(!fund_id){
        return res.status(400).json({ errorMessage: "Fund ID is required." });
    }
    const result = await queryDB(
      `delete from petty_cash_funds where fund_id = $1 returning *`,
      [fund_id]
    );
    const data = result.rows[0];
    console.log(data);
    if(!data){
      return res.status(404).json({ errorMessage: "Fund not found." });
    };
    return res.status(200).json({errorMessage: "Fund deleted successfully"});

  }catch(error){
    console.error("Error occurred while deleting funds:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}