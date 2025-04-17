import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    time: {
        type: String,
    },
    date: {
        type: Date,
    },
},{timestamps: true});

const Event = mongoose.model('Event', EventSchema);

export default Event;