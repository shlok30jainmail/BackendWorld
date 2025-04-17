import express from 'express';
import {createUnoo, updateUnoo, getUnoo, filterUnoo, deleteUnoo} from '../controller/whyUnooController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();


router.delete("/deleteUnoo", deleteUnoo);
router.post("/createUnoo", upload.single("image"), createUnoo);
router.get("/getUnoo", getUnoo);
router.put("/updateUnoo", upload.single("image"), updateUnoo);
router.get("/filterUnoo", filterUnoo);


export default router;
