import express from 'express';
import {createEvent, getEvent, updateEvent, deleteEvent, filterEvent} from '../controller/eventController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();


router.delete("/deleteEvent", deleteEvent);
router.post("/createEvent", upload.single("image"), createEvent);
router.get("/getEvent", getEvent);
router.put("/updateEvent", upload.single("image"), updateEvent);
router.get("/filterEvent", filterEvent);


export default router;
