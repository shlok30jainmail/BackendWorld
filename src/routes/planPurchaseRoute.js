import express from "express";
import {createPurchasePlan, getPurchasePlanbyId, filterPurchasePlan} from "../controller/purchasePlanController.js";
import { auth, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/createPurchasePlan", auth, createPurchasePlan)
router.get("/getPurchasePlanbyId", auth, getPurchasePlanbyId)
router.get("/filterPurchasePlan",  filterPurchasePlan)
// router.put("/updatePurchasePlan", adminAuth, updatePurchasePlan)



export default router;