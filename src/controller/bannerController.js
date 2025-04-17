import BannerModel from "../models/bannerModel.js";
import { deleteFileMulter } from "../middleware/multer.js";

// const { bannerId, homeIndex, homeAddIndex, homeRemoveIndex, imageIndex, imageRemoveIndex, imageAddIndex } = req.query;

// export const updateBanner = async (req, res) => {
//   const { bannerId} = req.query;

//   // Handling multiple images for homeImage and image
//   const homeImage = req.files?.homeImage?.map((file) => file.location) || [];
//   const image = req.files?.image?.map((file) => file.location) || [];

//   // Handling single image uploads
//   const contactUsImage = req.files?.contactUsImage?.[0]?.location;
//   const fundraisersImage = req.files?.fundraisersImage?.[0]?.location;
//   const ngoImage = req.files?.ngoImage?.[0]?.location;
//   const bloodBankImage = req.files?.bloodBankImage?.[0]?.location;
//   const foundAndMissingImage = req.files?.foundAndMissingImage?.[0]?.location;
//   const donateImage = req.files?.donateImage?.[0]?.location;
//   const donateSaveImage = req.files?.donateSaveImage?.[0]?.location;

//   try {
//     const banner = await BannerModel.findById(bannerId);
//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     const updatedData = {};

//     // Handle arrays
//     if (homeImage.length > 0) {
//       if (Array.isArray(banner.homeImage)) {
//         banner.homeImage.forEach((img) => deleteFileMulter(img));
//       } else if (banner.homeImage) {
//         deleteFileMulter(banner.homeImage);
//       }
//       updatedData.homeImage = homeImage;
//     }

//     if (image.length > 0) {
//       if (Array.isArray(banner.image)) {
//         banner.image.forEach((img) => deleteFileMulter(img));
//       } else if (banner.image) {
//         deleteFileMulter(banner.image);
//       }
//       updatedData.image = image;
//     }

//     // Handle single image fields
//     if (contactUsImage) {
//       deleteFileMulter(banner.contactUsImage);
//       updatedData.contactUsImage = contactUsImage;
//     }

//     if (fundraisersImage) {
//       deleteFileMulter(banner.fundraisersImage);
//       updatedData.fundraisersImage = fundraisersImage;
//     }

//     if (ngoImage) {
//       deleteFileMulter(banner.ngoImage);
//       updatedData.ngoImage = ngoImage;
//     }

//     if (bloodBankImage) {
//       deleteFileMulter(banner.bloodBankImage);
//       updatedData.bloodBankImage = bloodBankImage;
//     }

//     if (foundAndMissingImage) {
//       deleteFileMulter(banner.foundAndMissingImage);
//       updatedData.foundAndMissingImage = foundAndMissingImage;
//     }

//     if (donateImage) {
//       deleteFileMulter(banner.donateImage);
//       updatedData.donateImage = donateImage;
//     }

//     if (donateSaveImage) {
//       deleteFileMulter(banner.donateSaveImage);
//       updatedData.donateSaveImage = donateSaveImage;
//     }

//     const data = await BannerModel.findByIdAndUpdate(bannerId, updatedData, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Banner Updated",
//       data: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateBanner = async (req, res) => {
//   const {
//     bannerId,
//     homeIndex,
//     homeAddIndex,
//     homeRemoveIndex,
//     imageIndex,
//     imageAddIndex,
//     imageRemoveIndex,
//   } = req.query;

//   const homeImage = req.files?.homeImage?.map((file) => file.location) || [];
//   const image = req.files?.image?.map((file) => file.location) || [];

//   const contactUsImage = req.files?.contactUsImage?.[0]?.location;
//   const fundraisersImage = req.files?.fundraisersImage?.[0]?.location;
//   const ngoImage = req.files?.ngoImage?.[0]?.location;
//   const bloodBankImage = req.files?.bloodBankImage?.[0]?.location;
//   const foundAndMissingImage = req.files?.foundAndMissingImage?.[0]?.location;
//   const donateImage = req.files?.donateImage?.[0]?.location;
//   const donateSaveImage = req.files?.donateSaveImage?.[0]?.location;

//   try {
//     const banner = await BannerModel.findById(bannerId);
//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     // --- Home Image Array Updates ---
//     if (homeImage.length > 0) {
//       if (homeIndex !== undefined) {
//         const index = Number(homeIndex);
//         if (banner.homeImage?.[index]) deleteFileMulter(banner.homeImage[index]);
//         banner.homeImage[index] = homeImage[0];
//       } else if (homeAddIndex !== undefined) {
//         banner.homeImage.splice(Number(homeAddIndex), 0, homeImage[0]);
//       } else if (homeRemoveIndex !== undefined) {
//         const index = Number(homeRemoveIndex);
//         if (banner.homeImage?.[index]) {
//           deleteFileMulter(banner.homeImage[index]);
//           banner.homeImage.splice(index, 1);
//         }
//       } else {
//         // replace all if no index given
//         banner.homeImage?.forEach(img => deleteFileMulter(img));
//         banner.homeImage = homeImage;
//       }
//     }

//     // --- Image Array Updates ---
//     if (image.length > 0) {
//       if (imageIndex !== undefined) {
//         const index = Number(imageIndex);
//         if (banner.image?.[index]) deleteFileMulter(banner.image[index]);
//         banner.image[index] = image[0];
//       } else if (imageAddIndex !== undefined) {
//         banner.image.splice(Number(imageAddIndex), 0, image[0]);
//       } else if (imageRemoveIndex !== undefined) {
//         const index = Number(imageRemoveIndex);
//         if (banner.image?.[index]) {
//           deleteFileMulter(banner.image[index]);
//           banner.image.splice(index, 1);
//         }
//       } else {
//         banner.image?.forEach(img => deleteFileMulter(img));
//         banner.image = image;
//       }
//     }

//     // --- Single Image Updates ---
//     const updateField = (field, file) => {
//       if (file) {
//         deleteFileMulter(banner[field]);
//         banner[field] = file;
//       }
//     };

//     updateField("contactUsImage", contactUsImage);
//     updateField("fundraisersImage", fundraisersImage);
//     updateField("ngoImage", ngoImage);
//     updateField("bloodBankImage", bloodBankImage);
//     updateField("foundAndMissingImage", foundAndMissingImage);
//     updateField("donateImage", donateImage);
//     updateField("donateSaveImage", donateSaveImage);

//     await banner.save();

//     res.status(200).json({
//       success: true,
//       message: "Banner Updated",
//       data: banner,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const updateBanner = async (req, res) => {
//   const {
//     bannerId,
//     homeIndex,
//     homeAddIndex,
//     homeRemoveIndex,
//     imageIndex,
//     imageAddIndex,
//     imageRemoveIndex,
//     homeTitle,
//     homeDescription
//   } = req.query;

//   // Log to verify file upload
//   console.log('req.files:', req.files);

//   const homeImage = req.files?.homeImage?.map((file) => ({
//     image: file.location,
//     title: homeTitle || '',
//     description: homeDescription || ''
//   })) || [];
//   const image = req.files?.image?.map((file) => file.location) || [];

//   // Log to verify homeImage content
//   console.log('homeImage:', homeImage);

//   const contactUsImage = req.files?.contactUsImage?.[0]?.location;
//   const fundraisersImage = req.files?.fundraisersImage?.[0]?.location;
//   const ngoImage = req.files?.ngoImage?.[0]?.location;
//   const bloodBankImage = req.files?.bloodBankImage?.[0]?.location;
//   const foundAndMissingImage = req.files?.foundAndMissingImage?.[0]?.location;
//   const donateImage = req.files?.donateImage?.[0]?.location;
//   const donateSaveImage = req.files?.donateSaveImage?.[0]?.location;

//   try {
//     const banner = await BannerModel.findById(bannerId);
//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     // Log to verify homeImage array before update
//     console.log('banner.homeImage before:', banner.homeImage);

//     // --- Home Image Array Updates ---
//     if (homeImage.length > 0) {
//       if (homeIndex !== undefined) {
//         const index = Number(homeIndex);
//         if (banner.homeImage?.[index]) deleteFileMulter(banner.homeImage[index].image);
//         banner.homeImage[index] = homeImage[0];
//       } else if (homeAddIndex !== undefined) {
//         banner.homeImage.splice(Number(homeAddIndex), 0, homeImage[0]);
//       } else if (homeRemoveIndex !== undefined) {
//         const index = Number(homeRemoveIndex);
//         if (banner.homeImage?.[index]) {
//           deleteFileMulter(banner.homeImage[index].image);
//           banner.homeImage.splice(index, 1);
//         }
//       } else {
//         // replace all if no index given
//         banner.homeImage?.forEach(img => deleteFileMulter(img.image));
//         banner.homeImage = homeImage;
//       }
//     }

//     // Log to verify homeImage array after update
//     console.log('banner.homeImage after:', banner.homeImage);

//     // --- Image Array Updates ---
//     if (image.length > 0) {
//       if (imageIndex !== undefined) {
//         const index = Number(imageIndex);
//         if (banner.image?.[index]) deleteFileMulter(banner.image[index]);
//         banner.image[index] = image[0];
//       } else if (imageAddIndex !== undefined) {
//         banner.image.splice(Number(imageAddIndex), 0, image[0]);
//       } else if (imageRemoveIndex !== undefined) {
//         const index = Number(imageRemoveIndex);
//         if (banner.image?.[index]) {
//           deleteFileMulter(banner.image[index]);
//           banner.image.splice(index, 1);
//         }
//       } else {
//         banner.image?.forEach(img => deleteFileMulter(img));
//         banner.image = image;
//       }
//     }

//     // --- Single Image Updates ---
//     const updateField = (field, file) => {
//       if (file) {
//         deleteFileMulter(banner[field]);
//         banner[field] = file;
//       }
//     };

//     updateField("contactUsImage", contactUsImage);
//     updateField("fundraisersImage", fundraisersImage);
//     updateField("ngoImage", ngoImage);
//     updateField("bloodBankImage", bloodBankImage);
//     updateField("foundAndMissingImage", foundAndMissingImage);
//     updateField("donateImage", donateImage);
//     updateField("donateSaveImage", donateSaveImage);

//     await banner.save();

//     res.status(200).json({
//       success: true,
//       message: "Banner Updated",
//       data: banner,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateBanner = async (req, res) => {
//   const {
//     bannerId,
//     homeIndex,
//     homeAddIndex,
//     homeRemoveIndex,
//     imageIndex,
//     imageAddIndex,
//     imageRemoveIndex,
//     homeTitle,
//     homeDescription
//   } = req.query;

//   // Only process homeImage uploads when needed
//   const homeImage = (homeIndex !== undefined || homeAddIndex !== undefined || (!homeRemoveIndex && !homeIndex && !homeAddIndex))
//     ? req.files?.homeImage?.map((file) => ({
//         image: file.location,
//         title: homeTitle || '',
//         description: homeDescription || ''
//       })) || []
//     : [];

//   // Log to verify inputs
//   console.log('req.files:', req.files);
//   console.log('homeImage:', homeImage);
//   console.log('query:', { bannerId, homeIndex, homeAddIndex, homeRemoveIndex });

//   const image = req.files?.image?.map((file) => file.location) || [];

//   const contactUsImage = req.files?.contactUsImage?.[0]?.location;
//   const fundraisersImage = req.files?.fundraisersImage?.[0]?.location;
//   const ngoImage = req.files?.ngoImage?.[0]?.location;
//   const bloodBankImage = req.files?.bloodBankImage?.[0]?.location;
//   const foundAndMissingImage = req.files?.foundAndMissingImage?.[0]?.location;
//   const donateImage = req.files?.donateImage?.[0]?.location;
//   const donateSaveImage = req.files?.donateSaveImage?.[0]?.location;

//   try {
//     const banner = await BannerModel.findById(bannerId);
//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     // Log homeImage array before update
//     console.log('banner.homeImage before:', banner.homeImage);

//     // --- Home Image Array Updates ---
//     if (homeRemoveIndex !== undefined) {
//       const index = Number(homeRemoveIndex);
//       if (banner.homeImage?.[index]) {
//         deleteFileMulter(banner.homeImage[index].image);
//         banner.homeImage.splice(index, 1);
//       }
//     } else if (homeImage.length > 0) {
//       if (homeIndex !== undefined) {
//         const index = Number(homeIndex);
//         if (banner.homeImage?.[index]) deleteFileMulter(banner.homeImage[index].image);
//         banner.homeImage[index] = homeImage[0];
//       } else if (homeAddIndex !== undefined) {
//         banner.homeImage.splice(Number(homeAddIndex), 0, homeImage[0]);
//       } else {
//         // replace all if no index given
//         banner.homeImage?.forEach(img => deleteFileMulter(img.image));
//         banner.homeImage = homeImage;
//       }
//     }

//     // Log homeImage array after update
//     console.log('banner.homeImage after:', banner.homeImage);

//     // --- Image Array Updates ---
//     if (image.length > 0) {
//       if (imageIndex !== undefined) {
//         const index = Number(imageIndex);
//         if (banner.image?.[index]) deleteFileMulter(banner.image[index]);
//         banner.image[index] = image[0];
//       } else if (imageAddIndex !== undefined) {
//         banner.image.splice(Number(imageAddIndex), 0, image[0]);
//       } else if (imageRemoveIndex !== undefined) {
//         const index = Number(imageRemoveIndex);
//         if (banner.image?.[index]) {
//           deleteFileMulter(banner.image[index]);
//           banner.image.splice(index, 1);
//         }
//       } else {
//         banner.image?.forEach(img => deleteFileMulter(img));
//         banner.image = image;
//       }
//     }

//     // --- Single Image Updates ---
//     const updateField = (field, file) => {
//       if (file) {
//         deleteFileMulter(banner[field]);
//         banner[field] = file;
//       }
//     };

//     updateField("contactUsImage", contactUsImage);
//     updateField("fundraisersImage", fundraisersImage);
//     updateField("ngoImage", ngoImage);
//     updateField("bloodBankImage", bloodBankImage);
//     updateField("foundAndMissingImage", foundAndMissingImage);
//     updateField("donateImage", donateImage);
//     updateField("donateSaveImage", donateSaveImage);

//     await banner.save();

//     res.status(200).json({
//       success: true,
//       message: "Banner Updated",
//       data: banner,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateBanner = async (req, res) => {
  const {
    bannerId,
    homeIndex,
    homeAddIndex,
    homeRemoveIndex,
    imageIndex,
    imageAddIndex,
    imageRemoveIndex,
    homeTitle,
    homeDescription
  } = req.query;

  // Only process homeImage uploads when needed
  const homeImage = (homeIndex !== undefined || homeAddIndex !== undefined || (!homeRemoveIndex && !homeIndex && !homeAddIndex))
    ? req.files?.homeImage?.map((file) => ({
        image: file.location,
        title: homeTitle || '',
        description: homeDescription || ''
      })) || []
    : [];

  // Only process image uploads when needed
  const image = (imageIndex !== undefined || imageAddIndex !== undefined || (!imageRemoveIndex && !imageIndex && !imageAddIndex))
    ? req.files?.image?.map((file) => file.location) || []
    : [];

  // Log to verify inputs
  console.log('req.files:', req.files);
  console.log('homeImage:', homeImage);
  console.log('image:', image);
  console.log('query:', { bannerId, homeIndex, homeAddIndex, homeRemoveIndex, imageIndex, imageAddIndex, imageRemoveIndex });

  const contactUsImage = req.files?.contactUsImage?.[0]?.location;
  const fundraisersImage = req.files?.fundraisersImage?.[0]?.location;
  const ngoImage = req.files?.ngoImage?.[0]?.location;
  const bloodBankImage = req.files?.bloodBankImage?.[0]?.location;
  const foundAndMissingImage = req.files?.foundAndMissingImage?.[0]?.location;
  const donateImage = req.files?.donateImage?.[0]?.location;
  const donateSaveImage = req.files?.donateSaveImage?.[0]?.location;

  try {
    const banner = await BannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Log arrays before update
    console.log('banner.homeImage before:', banner.homeImage);
    console.log('banner.image before:', banner.image);

    // --- Home Image Array Updates ---
    if (homeRemoveIndex !== undefined) {
      const index = Number(homeRemoveIndex);
      if (banner.homeImage?.[index]) {
        deleteFileMulter(banner.homeImage[index].image);
        banner.homeImage.splice(index, 1);
      }
    } else if (homeImage.length > 0) {
      if (homeIndex !== undefined) {
        const index = Number(homeIndex);
        if (banner.homeImage?.[index]) deleteFileMulter(banner.homeImage[index].image);
        banner.homeImage[index] = homeImage[0];
      } else if (homeAddIndex !== undefined) {
        banner.homeImage.splice(Number(homeAddIndex), 0, homeImage[0]);
      } else {
        // replace all if no index given
        banner.homeImage?.forEach(img => deleteFileMulter(img.image));
        banner.homeImage = homeImage;
      }
    }

    // --- Image Array Updates ---
    if (imageRemoveIndex !== undefined) {
      const index = Number(imageRemoveIndex);
      if (banner.image?.[index]) {
        deleteFileMulter(banner.image[index]);
        banner.image.splice(index, 1);
      }
    } else if (image.length > 0) {
      if (imageIndex !== undefined) {
        const index = Number(imageIndex);
        if (banner.image?.[index]) deleteFileMulter(banner.image[index]);
        banner.image[index] = image[0];
      } else if (imageAddIndex !== undefined) {
        banner.image.splice(Number(imageAddIndex), 0, image[0]);
      } else {
        // replace all if no index given
        banner.image?.forEach(img => deleteFileMulter(img));
        banner.image = image;
      }
    }

    // Log arrays after update
    console.log('banner.homeImage after:', banner.homeImage);
    console.log('banner.image after:', banner.image);

    // --- Single Image Updates ---
    const updateField = (field, file) => {
      if (file) {
        deleteFileMulter(banner[field]);
        banner[field] = file;
      }
    };

    updateField("contactUsImage", contactUsImage);
    updateField("fundraisersImage", fundraisersImage);
    updateField("ngoImage", ngoImage);
    updateField("bloodBankImage", bloodBankImage);
    updateField("foundAndMissingImage", foundAndMissingImage);
    updateField("donateImage", donateImage);
    updateField("donateSaveImage", donateSaveImage);

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner Updated",
      data: banner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBanner = async (req, res) => {
  const { bannerId } = req.query();
  try {
    const banner = await BannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found !",
      });
    }

    const data = await BannerModel.findByIdAndDelete(bannerId);
    return res.status(200).json({
      success: true,
      message: "Banner Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};


export const getBanner = async (req, res) => {
  const { bannerId } = req.query;
  try {
    const banner = await BannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found !",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Banner Fetched Successfully",
      data:banner
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
