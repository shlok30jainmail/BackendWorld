import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, uploadDir)
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()} - ${file.originalname}`); // it generate unique name so we faced issue when we delete old file and upadte it with new file
        // return cb(null,file.originalname); // - it use main name so by using it we can delete old file that have same name

    }
})

export const upload = multer({storage});

// unlinking file
    
export const deleteFileMulter = async(img,fileName)=>{

     // 🗑️ Delete old image if a new one is uploaded
     if (img && fileName) {
         const oldImagePath = path.join(uploadDir, fileName);

         console.log(oldImagePath);
         if (fs.existsSync(oldImagePath)) {
             fs.unlinkSync(oldImagePath); // Deletes the old image
         }
     }
}