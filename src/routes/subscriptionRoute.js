import express from "express";
import { createSubscription, getSubscriptionData, getSubscriberData} from "../controller/subscriptionController.js";
const router = express.Router();
router.post("/createSubscription", createSubscription);
router.get("/getSubscriptionData", getSubscriptionData);
router.get("/getSubscriberData", getSubscriberData);


export default router;