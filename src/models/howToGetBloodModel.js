import mongoose from 'mongoose';

const HowToGetBloodSchema = new mongoose.Schema({
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    image3: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const HowToGetBloodModel = mongoose.model('HowToGetBlood', HowToGetBloodSchema);

export default HowToGetBloodModel;