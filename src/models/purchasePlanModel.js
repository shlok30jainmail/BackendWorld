import mongoose from "mongoose";

const purchasePlanSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        planId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Plan',
        },
        planName:{
            type:String,
            trim:true
        },
        planDescription:{
            type:String,
            trim:true
        },
        planAmount:{
            type:Number,
            default:0
        },
        startPlan:{
             type:String,
             trim:true
        },
        endPlan:{
            type:String,
            trim:true
        },
        productManagement:{
            type:Boolean,
            default:false
        },
        serviceManagement:{
            type:Boolean,
            default:false,
        },
        detailedReport:{
            type:Boolean,
            default:false,
        },
        keywordReport:{
            type:Boolean,
            default:false,
        },
    
        competitorAnalysis:{
            type:Boolean,
            default:false,
        },
    
        addEvent:{
            type:Boolean,
            default:false,
        },
    
        replyWithAI:{
             type:Boolean,
             default:false,
        },
    
        disable:{
            type:Boolean,
            default:false
        }


    },
    {
        timestamps:true,
    }
)

export default mongoose.model("purchasePlan",purchasePlanSchema);