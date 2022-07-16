import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    published: {
        type: Boolean,
        required: true,
    },
    faculties: {
        ref: 'Faculties',
        type: mongoose.Schema.Types.ObjectId
    },
    profile: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Group', schema)