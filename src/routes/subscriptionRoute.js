import express from "express";
import { createSubscription, getSubscriptionData, getSubscriberData} from "../controller/subscriptionController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/createSubscription",auth, createSubscription);
router.get("/getSubscriptionData",auth, getSubscriptionData);
router.get("/getSubscriberData",auth, getSubscriberData);


export default router;