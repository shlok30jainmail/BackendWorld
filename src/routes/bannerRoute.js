import express from 'express';
import { updateBanner , deleteBanner} from '../controller/bannerController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.put(
  '/updateBanner',
  upload.fields([
    { name: 'homeImage', maxCount: 10 },         // array of images
    { name: 'image', maxCount: 10 },             // array of images
    { name: 'contactUsImage', maxCount: 1 },
    { name: 'fundraisersImage', maxCount: 1 },
    { name: 'ngoImage', maxCount: 1 },
    { name: 'bloodBankImage', maxCount: 1 },
    { name: 'foundAndMissingImage', maxCount: 1 },
    { name: 'donateImage', maxCount: 1 },
    { name: 'donateSaveImage', maxCount: 1 },
  ]),
  updateBanner
);

router.delete("/deleteBanner", deleteBanner);

export default router;
