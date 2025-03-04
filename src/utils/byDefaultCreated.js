import userModel from "../models/userModel.js";

// create ADMIN by default

const adminCreation = async()=>{
    try{
        const user = await userModel.findOne({userType:"ADMIN"});
      if(!user){
            await userModel.create({
            name:"Shlok Kumar Jain",
            userType:"ADMIN",
            mobile:1234567890
           })
      }
      console.log("Admin Created by default");

    }catch(error){
        console.log("Admin is not created due to some error")
    }
}

export const runDefault = ()=>{
    adminCreation();
}