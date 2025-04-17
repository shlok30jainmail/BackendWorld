import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BannerSchema = new Schema(
    {
        homeImage: [
            {
                title: String,
                description:String,
                image: String,
            },
        ],
        contactUsImage: {
            type: String,
        },
        fundraisersImage: {
            type: String,
        },
        ngoImage: {
            type: String,
        },
        bloodBankImage: {
            type: String,
        },
        foundAndMissingImage: {
            type: String,
        },
        donateImage: {
            type: String,
        },
        donateSaveImage: {
            type: String,
        },
        image: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const BannerModel = model("Banner", BannerSchema);

export default BannerModel;