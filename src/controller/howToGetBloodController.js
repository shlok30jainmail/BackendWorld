import HowToGetBloodModel from "../models/howToGetBloodModel.js";

export const getHowToGetBlood = async (req, res) => {
  try {
    const data = await HowToGetBloodModel.findOne();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "GetHowToBlood is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get HowToBlood successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateHowToGetBlood = async (req, res) => {
  const { howToGetBloodId } = req.query;
  const image1 = req.files?.image1 ? req.files.image1[0].filename : undefined;
  const image2 = req.files?.image2 ? req.files.image2[0].filename : undefined;
  const image3 = req.files?.image3 ? req.files.image3[0].filename : undefined;
  const updatedData = {};

  try {
    const blood = await HowToGetBloodModel.findById(howToGetBloodId);

    if (!blood) {
      return res.status(404).json({
        success: false,
        message: "GetHowToBlood is not found",
      });
    }

    if (image1) {
      deleteFileMulter(blood?.image1);
      updatedData.image1 = image1;
    }
    if (image2) {
      deleteFileMulter(blood?.image2);
      updatedData.image2 = image2;
    }

    if (image3) {
      deleteFileMulter(blood?.image3);
      updatedData.image3 = image3;
    }

    const  data = await HowToGetBloodModel.findByIdAndUpdate(howToGetBloodId, updatedData, {new:true});

    return res.status(200).json({
      success: true,
      message: "Updated HowToBlood successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
