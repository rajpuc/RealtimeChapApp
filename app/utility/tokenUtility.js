import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME,JWT_KEY} from "../config/config.js";


export const generateToken = (email, userId) => {
    try {
        const payload = { email, userId };
        const options = { expiresIn: JWT_EXPIRE_TIME };

        return jwt.sign(payload, JWT_KEY, options);
    } catch (error) {
        console.error("Token generation error:", error.message);
        throw new Error("Failed to generate authentication token.");
    }
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_KEY);
    } catch (error) {
        console.error("Token verification error:", error.message);
        return null; // Returns null for invalid tokens
    }
};