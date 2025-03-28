import mongoose from "mongoose";
import subscriptionModel from "../models/subscriptionModel.js";

// create subscription
export const createSubscription = async(req,res)=>{
    const {subscriber, channel} = req.body;
    try{
        const chk = await subscriptionModel.findOne({subscriber, channel})
        console.log("chk is", chk);
        if(!chk){
            const data = await subscriptionModel.create({subscriber, channel});
            return res.status(200).json({
                success:true,
                message:"Create Subscription Successfully",
                data:data
               })
        }
       res.status(200).json({
        success:true,
        message:"You are a subscribed user of this channel",
       })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get subscription
export const getSubscriptionData = async(req,res)=>{
    const {subscriber} = req.query;
    try{
        const subscriberId = new mongoose.Types.ObjectId(subscriber);
        const data = await subscriptionModel.aggregate([
            {
            $match:{
                subscriber:subscriberId
            }
        }, 
        {
            $count:"totalCount"
        }
    ]);
    const totalCount = data.length > 0 ? data[0].totalCount : 0;
    res.status(200).json({
       success:true,
       message:"Your channel subscription data fetched successfully !",
       totalChannelSubscriped:totalCount 
    })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get subscriber data
export const getSubscriberData = async(req,res)=>{
    const {channel} = req.query;
    try{
        const channelId = new mongoose.Types.ObjectId(channel);
        const data = await subscriptionModel.aggregate([
            {
            $match:{
                channel:channelId
            }
        }, 
        {
            $count:"totalCount"
        }
    ]);
    const totalCount = data.length > 0 ? data[0].totalCount : 0;
    res.status(200).json({
       success:true,
       message:"Your Total subscriber data fetched successfully !",
       totalChannelSubscriped:totalCount 
    })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}