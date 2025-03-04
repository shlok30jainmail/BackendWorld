import express from "express";
import {login, verifyOtp, getAllUser, userGetById,updateUser} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/user/login", login);
router.post("/user/verifyOtp", verifyOtp);
router.get("/user/getUserById",auth, userGetById);
router.get("/user/getAllUser",auth, getAllUser)
router.put("/user/updateUser",upload.single("img"),auth, updateUser)



export default router;

