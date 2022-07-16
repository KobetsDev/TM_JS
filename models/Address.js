import mongoose from "mongoose";

const schema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Address', schema)