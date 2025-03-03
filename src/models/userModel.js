import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
     
        name:{
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
            type:String,
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);