// // const jwt = require("jsonwebtoken")
// import jwt from "jsonwebtoken"


// export const auth = async (req, res, next) => {
//     try {
//         let token = req.headers["authorization"];
//         if (!token) return res.status(401).json({ success: false, message: "JWT token is required", isAuthorized: false });

//         if (token.startsWith("Bearer ")) token = token.slice(7);

//         let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decodeToken);

//         if (!decodeToken.userId) return res.status(400).json({ success: false, message: "Token does not contain userId", isAuthorized: false });

//         req.userId = decodeToken.userId; // Pass userId for further use
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "JWT token has expired", isAuthorized: false });
//         }
//         return res.status(400).json({ success: false, message: "Invalid JWT token", isAuthorized: false });
//     }
// };





// const jwt = require("jsonwebtoken")
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";


export const auth = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) return res.status(401).json({ success: false, message: "JWT token is required", isAuthorized: false });

        if (token.startsWith("Bearer ")) token = token.slice(7);

        let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodeToken);

        if (!decodeToken.userId) return res.status(400).json({ success: false, message: "Token does not contain userId", isAuthorized: false });
        
        const user = await userModel.findById(decodeToken.userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        req.userId = decodeToken.userId; // Pass userId for further use
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "JWT token has expired", isAuthorized: false });
        }
        return res.status(400).json({ success: false, message: "Invalid JWT token", isAuthorized: false });
    }
};


export const adminAuth = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) return res.status(401).json({ success: false, message: "JWT token is required", isAuthorized: false });

        if (token.startsWith("Bearer ")) token = token.slice(7);

        let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodeToken);

        if (!decodeToken.userId) return res.status(400).json({ success: false, message: "Token does not contain userId", isAuthorized: false });
        
        const user = await userModel.findById(decodeToken.userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        if(user.userType != "ADMIN") return res.status(500).json({success:false, message:"You are not an admin"})
        req.userId = decodeToken.userId; // Pass userId for further use
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "JWT token has expired", isAuthorized: false });
        }
        return res.status(400).json({ success: false, message: "Invalid JWT token", isAuthorized: false });
    }
};




