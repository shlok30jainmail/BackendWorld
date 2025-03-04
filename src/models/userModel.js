import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
     
        name:{
            type:String,
            trim:true
        },
        img:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            trim:true
        },
        mobile:{
            type:Number,
            trim: true
        },
        password:{
            type:String,
            trim:true
        },
        otp:{
            type:String, // don't use trim ok here
        },
        userType:{
            type:String,
            enum: ["ADMIN", "USER", "SUBADMIN"],
            default:"USER",
            trim:true
        },
        referralCode:{
            type:String,
            default:null
        },
        disable:{
            type:Boolean,
            default:false
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);