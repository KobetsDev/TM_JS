import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    published: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('Group', schema)