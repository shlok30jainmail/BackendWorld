import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";

import {deleteFileMulter } from "../middleware/multer.js"
import { generateOtp, generateReferralCode } from "../helpers/generateRandomOTPorReferral.js";

// login
export const login = async (req,res)=>{
    const {name, mobile, email} = req.body;
      const otp = generateOtp();
      console.log(otp);
    try{
        const hashOtp = await bcrypt.hash(otp.toString(), 10);
        console.log(hashOtp);

        const user =  await userModel.findOneAndUpdate({mobile},{  // don't use await here - due to async behaviour of js we get error
            name,
            mobile,
            email,
            otp:hashOtp
        },
        { new: true, upsert: true }  // ✅ Return updated document & create if not found
    )

    // 🔍 Fetch the saved user to verify OTP is hashed
        const savedUser = await userModel.findOne({ mobile });
        console.log("Stored OTP in DB:", savedUser.otp);
     console.log("email : ", email)
      if(email != undefined){
              // nodmailer
    // 3️⃣ Send Email with Invoice PDF Attachment
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shlok30jain@gmail.com",
          pass: process.env.MAIL_PASS,
        },
      });
      const mailOptions = {
        from: "shlok30jain@gmail.com",
      //   to: recipientEmail,
        to: "shlok24cs114@satiengg.in",
        subject: "Your OTP",
        text: `Your OTP :${otp} and Don't share it with other`,
      };
  
      await transporter.sendMail(mailOptions);
      }

        res.status(200).json({
            success:true,
            data: "Your otp is : "+ otp,
            message: email !==undefined ?"OTP successfully sent on your gmail": "OTP successfully sent on your mobile"
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

// get all user using filter - for admin
export const getAllUser = async(req,res)=>{
    const {search, mobile, page =1, limit=10,  disable} = req.query;
    let {sort} = req.query; // const will give error when we change it

    // sort by -1 or 1
    var ssort;
    if(sort ==-1) ssort =-1;
    else ssort = 1;
   
    // skip 
    const skip = (page -1)*limit;
    // date filter use 
    let dateFilter = req.uri ; // use a middleware and add it in route
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
        ...(disable && {disable}),
        ...dateFilter,

      };

    try{
       const user = await userModel.find(query).sort({createdAt:ssort}).skip(skip).limit(limit);
       const total = await userModel.countDocuments(query);
       res.status(201).json({
        success:true,
        data:user,
        currentPage:page,
        totalPage: Math.ceil(total/limit)
       })
    }catch(error){
       res.status(501).json({
        success:false,
        message:error.message
       })
    }
}


// disable user  - For Admin
export const disableUser = async(req,res)=>{
    const {userId} = req.query;
    try{
        const user  = await userModel.findById(userId);
        const data = await userModel.findOneAndUpdate({_id:userId}, {disable: !user.disable}, {new:true});

     res.status(200).json({
        success:true,
        message: user.disable === true ? "User is disabled successfully":"User is enabled successfully"
     })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


