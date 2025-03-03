import express from "express";
import {login, verifyOtp} from "../controller/userController.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/verifyOtp", verifyOtp);


export default router;

