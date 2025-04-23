import express from "express";
import {login, verifyOtp, getAllUser, userGetById,updateUser,disableUser} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import { datefilter } from "../middleware/dateFilterMidd.js";
const router = express.Router();

router.post("/user/login", login);
router.post("/user/verifyOtp", verifyOtp);
router.get("/user/getUserById", userGetById);
router.get("/user/getAllUser",datefilter, getAllUser)
router.put("/user/updateUser",upload.single("img"), updateUser)
router.put("/user/disableUser", disableUser)




export default router;

