import express from 'express';
import {updateHowToGetBlood, getHowToGetBlood} from '../controller/howToGetBloodController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.get("/getHowToGetBlood", getHowToGetBlood);
router.put(
    "/updateHowToGetBlood",
    upload.fields([
      { name: "image1" },
      { name: "image2" },
      { name: "image3" }
    ]),
    updateHowToGetBlood
  );
  

export default router;
