import crypto from 'crypto';
import {queryDB} from '../utils/pgConnection.js';


 const generateResetToken = async (email) => {
    try {
        // Generate a unique reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store the reset token in the database with an expiration time
        ///const query = 
        await queryDB("UPDATE employees SET tokens = $1, reset_token_expiry = NOW() + INTERVAL '1 hour' WHERE email = $2",
             [resetToken, email]);

        return resetToken;
    }   catch (error) {
        console.error("Error generating reset token:", error);
        throw new Error("Internal server error while generating reset token.");
    } 
}
export default generateResetToken;




