

import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // ✅ Verify JWT Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Decoded JWT Payload:", decoded);

            // ✅ Fetch user from DB including role_name
            const [users] = await pool.query(`
                SELECT users.id, users.full_name, users.email, roles.role_name 
                FROM users
                JOIN roles ON users.role_id = roles.id
                WHERE users.id = ?`, [decoded.id]);

            if (!users || users.length === 0) {
                console.log("❌ User not found in database");
                return res.status(401).json({ message: "User not found" });
            }

            req.user = users[0]; // ✅ Attach user with `role_name`
            
            console.log("✅ req.user assigned:", req.user); // Debugging Log

            next();
        } catch (error) {
            console.error("🚨 JWT Error:", error.message);
            return res.status(401).json({ message: "Unauthorized, Invalid Token" });
        }
    } else {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "Unauthorized, No Token Provided" });
    }
};


// ✅ Middleware for Role-Based Access Control
export const authorize = (roles) => {
    return (req, res, next) => {
        console.log("🔍 Checking User Role:", req.user.role_name); // ✅ Debugging Log
        console.log(roles);
        if (!roles.includes(req.user.role_name)) {  
            return res.status(403).json({ message: "Forbidden: You do not have permission" });
        }

        next();
    };
};


