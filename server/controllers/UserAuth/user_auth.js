// import { emailTransporter } from "../../utils/emailTransporter";
import { emailTransporter } from "../../utils/emailTransporter.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { comparePassword } from "../../utils/comparePassword.js";
import createJWT from "../../middleware/jwt_gen.js";
import { queryDB } from "../../utils/pgConnection.js";
import generateEmployeeId from "../../utils/generateEmpId.js";
import generateResetToken from "../../utils/generateToken.js";
import {generateAccessToken, generateRefreshToken}  from '../../middleware/jwt_gen.js'
import { renderTemplate } from "../../utils/renderEmail.js";


// signup
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Email and password are required." });
    }

    // Query for user by email
    const query = "SELECT * FROM employees WHERE email = $1";
    const result = await queryDB(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid email or password." });
    }

    // Compare password (assuming user.password is hashed)
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid email or password." });
    }


    const accessToken = generateAccessToken({ email: user.email, id: user.id });
    const refreshToken = generateRefreshToken({ email: user.email, id: user.id });
    // Generate JWT token
    const token = createJWT(email, user.id); // Use user id or other unique info
    console.log("User logged in with email:", email, "and token:", token, "accessToken:", accessToken, "refreshTOKEN:", refreshToken);

    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during login." });
  }
};

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, department, position, password } =
      req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !department ||
      !position ||
      !password
    ) {
      return res.status(400).json({ errorMessage: "All fields are required." });
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Generate a unique employee ID
    const employeeId = await generateEmployeeId(password);

    const existingUserQuery = "SELECT * FROM employees WHERE email = $1";
    const existingUserResult = await queryDB(existingUserQuery, [email]);
    if (existingUserResult.rows.length > 0) {
      return res
        .status(400)
        .json({ errorMessage: "User already exists with this email    ." });
    }

    // Insert user without token first
    const query = `INSERT INTO employees (employee_code, first_name, last_name, email, department, position, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const result = await queryDB(query, [
      employeeId,
      first_name,
      last_name,
      email,
      department,
      position,
      hashedPassword,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ errorMessage: "User already exists." });
    }

    // Generate JWT token using the new user's id
    const token = createJWT(email, user.id);

    // Update the tokens column for this user
    // Update the tokens column for this user
    await queryDB(
      "UPDATE employees SET tokens = $1 WHERE employee_code = $2",
      [token, employeeId]
    );
    console.log("User signed up with email:", email, "and token:", token);

    return res
      .status(201)
      .json({ message: "User created successfully!", token });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during signup." });
  }
};


function getFirstName(email) {
  const localPart = email.split('@')[0];        // "john.doe"
  const firstName = localPart.split(/[._-]/)[0]; // "john"
  return capitalize(firstName);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ errorMessage: "Email is required." });
    }
    // Here you would typically send a password reset email

    // For demonstration, let's assume the email is sent successfully
    const resetToken = await generateResetToken(email); // Generate a real token in production
    console.log(
      "Password reset token generated for user:",
      email,
      "Token:",
      resetToken
    );
    const Name = getFirstName(email);
  //   const html= renderTemplate('forgotPassword', {
  //     name : Name, 
  //     message:`To reset your password, please click the link below:\n\n`,
  //     actionLink:`http://yourapp.com/reset-password?email=${resetToken}&token=${encodeURIComponent(email)}`,
  //     actionText: "Reset Password"

  // });


  const html= renderTemplate('resetPassword', {
    name: Name,
    resetLink: `http://yourapp.com/reset-password?email=${resetToken}&token=${encodeURIComponent(email)}`,
  });

  
    await emailTransporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Password Reset",
      html
      // text:
      //   "To reset your password, please click the link below:\n\n" +
      //   `http://yourapp.com/reset-password?email=${resetToken}&token=${encodeURIComponent(
      //     email
      //   )}\n\n` +
      //   "If you did not request this, please ignore this email.",
    });
    console.log("Password reset email sent to:", email);
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during forgot password." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ errorMessage: "Email and new password are required." });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    console.log(
      "Password reset for user:",
      token,
      "with new hashed password:",
      hashedNewPassword
    );
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error during reset password:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during reset password." });
  }
};

export const getAllUsers= async (req, res) => {
  try {
    const query = `select * from employees`;
    const result = await queryDB(query);
    const users = result.rows;
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
  } catch (error) {
    console.error("Error during forgot password:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during forgot password." });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { employee_code, first_name, last_name, email, department, position } = req.body;
    if (!employee_code || !first_name || !last_name || !email || !department || !position){
      return res.status(400).json({ errorMessage: "All fields are required." });
    }
    const query = `UPDATE employees SET first_name = $1, last_name = $2, email = $3, department = $4, position = $5 WHERE employee_code = $6 RETURNING *`;
    const result = await queryDB(query, [first_name, last_name, email, department, position, employee_code]);
    const updatedUser = result.rows[0];
    if (!updatedUser) {
      return res.status(404).json({ errorMessage: "User not found." });
    }else{
      return res.status(200).json({ message: "User profile updated successfully.", user: updatedUser })
    };
  }catch(error){
    console.error("Error during update user profile:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during update user profile." });
  }
};

export const deleteUser = async (req, res)=>{
  try{
    const {employee_id} = req.body;
    if(!employee_id){
      return res.status(400).json({errorMessage: "User ID is required."});
    }
    const query = "DELETE FROM employees WHERE employee_id = $1 RETURNING *";
    const result = await queryDB(query, [employee_id]);
    const deletedUser = result.rows[0];
    if(!deletedUser){
      return res.status(404).json({errorMessage: "User not found."});
    }
    return res.status(200).json({message: "User deleted successfully.", user: deletedUser});
  }catch(error){
    console.error("Error during delete user:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during delete user." });
  }
};


export const refreshToken = async(req, res) =>{
  try{
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ errorMessage: "Token is required." });
    }
    // Verify the token and extract user information
    const decoded = jwt.verify(token, refreshtoken);
    const userId = decoded.id; // Assuming the token contains user ID
    if (!userId) {
      return res.status(401).json({ errorMessage: "Invalid token." });
    }


    // Generate a new token
    const newToken = createJWT(decoded.email, userId); // Use the same email and
    // Update the tokens column for this user
    await queryDB("UPDATE employees SET tokens = $1 WHERE id = $2", [
      newToken,
      userId
    ]);
  }catch(error){
    console.error("Error during refresh token:", error);
    return res
      .status(500)
      .json({ errorMessage: "Internal server error during refresh token." });
  }
}