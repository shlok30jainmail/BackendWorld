import express from "express";
import {login, verifyOtp, getAllUser, userGetById,updateUser,disableUser} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import { auth } from "../middleware/authMiddleware.js";
import { datefilter } from "../middleware/dateFilterMidd.js";
const router = express.Router();

router.post("/user/login", login);
router.post("/user/verifyOtp", verifyOtp);
router.get("/user/getUserById",auth, userGetById);
router.get("/user/getAllUser",auth, datefilter, getAllUser)
router.put("/user/updateUser",upload.single("img"),auth, updateUser)
router.put("/user/disableUser",auth, disableUser)




export default router;

