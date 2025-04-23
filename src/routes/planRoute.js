import express from "express";
import { createPlan, getPlanById, updatePlanById, disablePlanById, filterPlan } from "../controller/planController.js";
import { auth, adminAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createPlan", adminAuth, createPlan);
router.get("/getPlanById", auth, getPlanById);
router.put("/updatePlanById", adminAuth, updatePlanById);
router.put("/disablePlanById", adminAuth, disablePlanById);
router.get("/filterPlan", auth, filterPlan);


export default router;