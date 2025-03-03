import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// login
export const login = async (req,res)=>{
    const {name, mobile} = req.body;
      const otp = "1234";
      console.log(otp);
    try{
        const hashOtp = await bcrypt.hash(otp.toString(), 10);
        console.log(hashOtp);
        const data = await userModel.find({mobile}); // use findOne kyuki ek hi honga
       if(!data){
        const user =  new userModel({  // don't use await here - due to async behaviour of js we get error
            name,
            mobile,
            otp:hashOtp
        })
        await user.save();
       }else{
        const user =  await userModel.findOneAndUpdate({  // don't use await here - due to async behaviour of js we get error
            name,
            mobile,
            otp:hashOtp
        })
       }

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
       user._doc.token = token; // insert it with user.doc


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

