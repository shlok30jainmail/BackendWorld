import mongoose from "mongoose";

const { Schema, model } = mongoose;

const WhyUnooModel = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const WhyUnoo = model("WhyUnoo", WhyUnooModel);

// Function to check and create a default entry
const ensureDefaultWhyUnoo = async () => {
    try {
        const count = await WhyUnoo.countDocuments();
        if (count === 0) {
            await WhyUnoo.create({
                title: "Default Title",
                image: "default-image-url.jpg",
            });
            console.log("Default entry created in WhyUnoo collection.");
        }
    } catch (error) {
        console.error("Error ensuring default entry:", error);
    }
};

export { ensureDefaultWhyUnoo };
export default WhyUnoo;