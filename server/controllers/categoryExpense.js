import pool from '../utils/pgConnection.js';




export const addExpense = async(req, res) =>{
    try{
        const { category_id, category_name, category_description } = req.body;
        if (!category_id || !category_name || !category_description) {
            return res.status(400).json({ errorMessage: "All fields are required." });
        }

        const query = `INSERT INTO expense_categories(category_id, category_name, category_description) VALUES ($1, $2, $3) RETURNING *`;
        const values = [category_id, category_name, category_description];
        const result = await pool.query(query, values);
        const newExpense = result.rows[0];
        if (!newExpense) {
            return res.status(400).json({ errorMessage: "Failed to add expense." });
        }
        return res.status(201).json({ message: "Expense added successfully.", expense: newExpense });
    }catch(error){
        console.error("Error adding expense:", error);
        return res.status(500).json({ errorMessage: "Internal server error while adding expense." });
    }
}


export const getAllExpenses = async(req, res) => {
    try {
        const query = "SELECT * FROM expense_categories";
        const result = await pool.query(query);
        const expenses = result.rows;
        if (expenses.length === 0) {
            return res.status(404).json({ errorMessage: "No expenses found." });
        }
        return res.status(200).json({ expenses });
    } catch (error) {
        return res.status(500).json({ errorMessage: "Internal server error while fetching expenses." });
    }
};



export const updateExpense = async(req, res) =>{
    try{
        const { category_id, category_name, category_description } = req.body;
        if (!category_id || !category_name || !category_description) {
            return res.status(400).json({ errorMessage: "All fields are required." });
        }

        const query = `UPDATE expense_categories SET category_name = $1, category_description = $2 WHERE category_id = $3 RETURNING *`;
        const values = [category_name, category_description, category_id];
        const result = await pool.query(query, values);
        const updatedExpense = result.rows[0];
        if (!updatedExpense) {
            return res.status(404).json({ errorMessage: "Expense not found." });
        }
        return res.status(200).json({ message: "Expense updated successfully.", expense: updatedExpense });

    }catch(error){
        console.error("Error updating expense:", error);
        return res.status(500).json({ errorMessage: "Internal server error while updating expense." });
    }
};


export const deleteExpense = async(req, res) =>{
    try{
        const { category_id } = req.body;
        if (!category_id) {
            return res.status(400).json({ errorMessage: "Category ID is required." });
        }
        const query = "DELETE FROM expense_categories WHERE category_id = $1 RETURNING *";
        const result = await pool.query(query, [category_id]);
        const deletedExpense = result.rows[0];
        if (!deletedExpense) {
            return res.status(404).json({ errorMessage: "Expense not found." });
        }
        return res.status(200).json({ message: "Expense deleted successfully.", expense: deletedExpense });
    }catch(error){
        console.error("Error deleting expense:", error);
        return res.status(500).json({ errorMessage: "Internal server error while deleting expense." });
    }
}


