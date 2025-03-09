import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, role_id } = req.body;

        // ✅ Validate required fields
        if (!full_name || !email || !password || !role_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // ✅ Check if the user already exists
        const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        // ✅ Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Insert new user into database
        const [result] = await pool.query(
            "INSERT INTO users (full_name, email, password, role_id) VALUES (?, ?, ?, ?)",
            [full_name, email, hashedPassword, role_id]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("🔥 Error in registerUser:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user exists
        const [users] = await pool.query(`
            SELECT users.id, users.full_name, users.email, users.password, roles.role_name 
            FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.email = ?`, [email]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = users[0];

        // ✅ Check if password is correct
        //const isMatch = await bcrypt.compare(password, user.password_hash);
        if (password!=user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT token correctly
        const token = jwt.sign(
            { id: user.id, full_name: user.full_name, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user: { id: user.id, full_name: user.full_name, role: user.role_name } });

    } catch (error) {
        console.error("🔥 Error in loginUser:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const [user] = await pool.query(`
            SELECT users.id, users.full_name, users.email, roles.role_name 
            FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = ?`, [req.user.id]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user[0]);
    } catch (error) {
        console.error("🔥 Error fetching user profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
