import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
{
    validity:{
        type:Number,
    },
    planName:{
        type:String,
        trim:true
    },
    planDescription:{
        type:String,
        trim:true
    },
    amount:{
        type:Number
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
    timestamps:true
}
)

export default mongoose.model("Plan", planSchema);