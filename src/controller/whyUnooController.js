import { deleteFileMulter } from "../middleware/multer.js";
import WhyUnoo from "../models/whyUnooModel.js";

export const createUnoo = async(req,res) =>{
    const {title} = req.body;
    const image = req.file ? req.file.key : undefined;   
   try{
    const data = await WhyUnoo.create({title, image});

    return res.status(201).json({
        success:true,
        message:"WhyUNOO created successfully",
        data:data
    })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}

export const getUnoo = async(req,res) =>{
    const {unooId} = req.query;
   try{
    const data = await WhyUnoo.findById(unooId);
    if(!data){
        return res.status(404).json({
            success:false,
            message:"Why UNOO not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:"Get why unoo successfully",
        data:data
    })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}

export const updateUnoo = async(req,res) =>{
    const {unooId} = req.query;
    const {title} = req.body;
    const image = req.file ? req.file.key : undefined;   
    const updatedData = {title};
   try{
  
     const unoo = await WhyUnoo.findById(unooId);
     if(!unoo){
        return res.status(404).json({
            success:false,
            message:"Why unoo not found"
        })
     }

    if (image) {
        deleteFileMulter(unoo?.image);
        updatedData.image = image;
      }

      const data = await WhyUnoo.findByIdAndUpdate(unooId, updatedData);

    return res.status(200).json({
        success:true,
        message:"Updated why unoo successfully",
        data:data
    })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}


export const deleteUnoo = async(req,res) =>{
    const {unooId} = req.query;
   try{
    const data = await WhyUnoo.findOneAndDelete(unooId);

    return res.status(200).json({
        success:true,
        message:"Delete why unoo successfully",
    })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}
 export const filterUnoo = async(req,res)=>{
    const {sort=-1, page =1, limit =20, title} = req.query;
    const skip = (page-1)*limit;
    const  filter = {
        ...(title && {title: new RegExp(title, "i")})
    };

    try{
      const data = await WhyUnoo.find(filter).sort({ createdAt: parseInt(sort) })
      .skip(skip)
      .limit(limit);
      const total = await WhyUnoo.countDocuments(filter);

      return res.status(200).json({
        success:true,
        message:"All why wnoo fetched successfully",
        data:data,
        currentPage:page,
        page: Math.ceil(total/limit)
      })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

 }