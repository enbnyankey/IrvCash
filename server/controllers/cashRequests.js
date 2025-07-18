import pool from "../utils/pgConnection.js";




export const addRequest = async (req, res) => {
    try{
        const { requested_amount, requested_by } = req.body;
        if (!requested_amount || !requested_by) {
            return res.status(400).json({ errorMessage: "Amount and description are required" });
        }
        const date = new Date();
        const request_date = date.toISOString().split('T')[0];
        //const userId = req.request_id;
        const query = `INSERT INTO replenishment_requests (fund_id,request_date,requested_amount, requested_by)
        VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [ 1,request_date,requested_amount, requested_by];
        const result = await pool.query(query, values);
        const newRequest = result.rows[0];
        if (!newRequest) {
            return res.status(400).json({ errorMessage: "Failed to add request" });
        }
        res.status(201).json({ errorMessage: "Request added successfully", request: newRequest });

    }catch(error){
        console.error("Error in addRequest:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}



export const getAllRequests = async (req, res) => {
    try{
        const query = "SELECT * FROM replenishment_requests";
        // const values = [request_id];
        const result = await pool.query(query);
        const requests = result.rows;
        if (requests.length === 0) {
            return res.status(404).json({ errorMessage: "No requests found" });
        }
        return res.status(200).json({ errorMessage: "Requests retrieved successfully", requests });

    }catch(error){
        console.error("Error in getAllRequests:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};




export const deleteRequest = async (req, res) => {
    try{
        const { request_id } = req.body;
        if (!request_id) {
            return res.status(400).json({ errorMessage: "Request ID is required" });
        }

        const query = "DELETE FROM replenishment_requests WHERE request_id = $1 RETURNING *";
        const values = [request_id];
        const result = await pool.query(query, values);
        const deletedRequest = result.rows[0];
        if (!deletedRequest) {
            return res.status(404).json({ errorMessage: "Request not found" });
        }
        
        res.status(200).json({ errorMessage: "Request deleted successfully", request: deletedRequest });
    }catch(error){
        console.error("Error in deleteRequest:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }   
};



export const updateRequest = async (req, res) => {
    try{
        const query = "UPDATE replenishment_requests SET requested_amount = $1, requested_by = $2 WHERE request_id = $3 RETURNING *";
        const { requested_amount, requested_by, request_id } = req.body;
        if (!requested_amount || !requested_by || !request_id) {
            return res.status(400).json({ errorMessage: "All fields are required" });
        }
        const values = [requested_amount, requested_by, request_id];
        const result = await pool.query(query, values);
        const updatedRequest = result.rows[0];  
        if (!updatedRequest) {
            return res.status(404).json({ errorMessage: "Request not found" });
        }
        res.status(200).json({ errorMessage: "Request updated successfully", request: updatedRequest });

    }catch(error){
        console.error("Error in updateRequest:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}



export const rejectedRequest = async (req, res) => {
    try {
        const { request_id, reason } = req.body;

        if (!request_id) {
            return res.status(400).json({ errorMessage: "Request ID is required" });
        }

        // Update the status to 'REJECTED' and optionally store a reason
        const query = `
            UPDATE petty_cash_requests, approved_by= $4
            SET status = 'REJECTED',
        rejection_reason = $2, updated_at = NOW()
            WHERE id = $1 AND status = 'PENDING'
            RETURNING *;
        `;

        const values = [request_id, reason || null];
        const result = await pool.query(query, values);
        const approvedRequest = result.rows[0];

        if (!approvedRequest) {
            return res.status(404).json({ errorMessage: "Pending request not found or already processed" });
        }

        res.status(200).json({ message: "Request rejected successfully", request: approvedRequest });

    } catch (error) {
        console.error("Error in rejectRequest:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};





export const approvedRequest = async (req, res) => {
    try {
        const { request_id, reason } = req.body;

        if (!request_id) {
            return res.status(400).json({ errorMessage: "Request ID is required" });
        }

        // Update the status to 'REJECTED' and optionally store a reason
        const query = `
            UPDATE petty_cash_requests
            SET status = 'APPROVED', rejection_reason = $2, updated_at = NOW()
            WHERE id = $1 AND status = 'PENDING'
            RETURNING *;
        `;

        const values = [request_id, reason || null];
        const result = await pool.query(query, values);
        const approvedRequest = result.rows[0];

        if (!approvedRequest) {
            return res.status(404).json({ errorMessage: "Pending request not found or already processed" });
        }

        res.status(200).json({ message: "Request rejected successfully", request: approvedRequest });

    } catch (error) {
        console.error("Error in rejectRequest:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};






export const getRequestById = async (req, res) => {
    try {
        const { request_id } = req.params;
        if (!request_id) {
            return res.status(400).json({ errorMessage: "Request ID is required" });
        }

        const query = "SELECT * FROM replenishment_requests WHERE request_id = $1";
        const values = [request_id];
        const result = await pool.query(query, values);
        const request = result.rows[0];

        if (!request) {
            return res.status(404).json({ errorMessage: "Request not found" });
        }

        res.status(200).json({ errorMessage: "Request retrieved successfully", request });

    } catch (error) {
        console.error("Error in getRequestById:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};