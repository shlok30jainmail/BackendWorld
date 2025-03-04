import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {deleteFileMulter } from "../middleware/multer.js"
import { generateOtp, generateReferralCode } from "../helpers/generateRandomOTPorReferral.js";

// login
export const login = async (req,res)=>{
    const {name, mobile} = req.body;
      const otp = generateOtp();
      console.log(otp);
    try{
        const hashOtp = await bcrypt.hash(otp.toString(), 10);
        console.log(hashOtp);

        const user =  await userModel.findOneAndUpdate({mobile},{  // don't use await here - due to async behaviour of js we get error
            name,
            mobile,
            otp:hashOtp
        },
        { new: true, upsert: true }  // ✅ Return updated document & create if not found
    )

    // 🔍 Fetch the saved user to verify OTP is hashed
        const savedUser = await userModel.findOne({ mobile });
        console.log("Stored OTP in DB:", savedUser.otp);
        res.status(200).json({
            success:true,
            data: "Your otp is : "+ otp,
        })
       
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// verify otp 
export const verifyOtp = async(req, res)=>{
    const {mobile, otp} = req.body;
    try{
       const user = await userModel.findOne({mobile});
       if(!user){
        res.status(404).json({
            success:false,
            message: "User not found"
        })
       }
       console.log("user otp : ", user.otp);
       console.log("entered otp : ", otp)
         
       // generate token 
       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "9d" });
       console.log("Generated Token:", token); // Debugging Log
       user._doc.token = token; // insert it with user.document to show in postman for certain time it does not save it in db ok

      // adding a referral code 
      user.referralCode = generateReferralCode();
      await user.save();
        const cmpHashOtp = await bcrypt.compare(otp, user.otp)
          if(cmpHashOtp){
            res.status(201).json({
                success:true,
                message:"User Registered Successfully",
                data : user
            })
          }else{
            res.status(501).json({
                success:false,
                message:"otp is invalid"
            })
          }
       

    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// ✅ Move from "controller/" to "middleware/uploads/"
// const UPLOADS_DIR = path.join(__dirname, "../middleware/uploads");


// update user by id
export const updateUser = async(req,res)=>{
    const {userId} = req.query;
    const {name,email,mobile, password} = req.body;
    const img = req.file ? req.file.filename : undefined; // Get file name if uploaded

 try{
    //  // 🔍 Find user to get old image
     const userData = await userModel.findOne({ _id: userId });
     if (!userData) {
         return res.status(404).json({
             success: false,
             message: "User not found",
         });
     }

    const updateData = { name, email, mobile, password };
    if (img){
        deleteFileMulter(img,userData.img); // first unlink file that is stored in db
        updateData.img = img; // Only update img if a new file is uploaded
    } 
    const user = await userModel.findOneAndUpdate(
        {_id:userId}, 
        // {name,email,mobile, password, img},
        updateData,
        { new: true } // return updated one not old one
    );
    res.status(201).json({
        success:true,
        data:user
    })
 }catch(error){
       res.status(501).json({
        success:false,
        message:error.message
       })
 }
}

// get user by id
export const userGetById = async(req,res)=>{
    const {userId} = req.query;
  try{
    const user = await userModel.findOne({_id:userId});
    if(!user){
        res.status(404).json({
            success:false,
            message: "User not found !"
        })
    }
    res.status(201).json({
        success:true,
        data: user
    })

  }catch(error){
     res.status(501).json({
        success:false,
        message:error.message
     })
  }   
}

// get all user using filter
export const getAllUser = async(req,res)=>{
    const {search, mobile, page =1, limit=10, sort=-1, disable} = req.query;
     const skip = (page -1)*limit;

    const query = {
        // ...(search && { name: new RegExp(search, "i") }), // when we use one field only
        ...(search && {                // when we use multiple fields using one searcg
            $or:[
                {name: new RegExp(search, "i")},
                { email: new RegExp(search, "i")}
            ]
        }),

        // ...(search && { mobile: new RegExp(search, "i") }),
        ...(mobile && {mobile}),
        ...(disable && {disable})

      };
    try{
       const user = await userModel.find(query).skip(skip);
       res.status(201).json({
        success:true,
        data:user
       })
    }catch(error){
       res.status(501).json({
        success:false,
        message:error.message
       })
    }
}



