import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
        trim: true,
    },
    rights: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'user',
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activatinLink: {
        type: String
    },
    date_registration: {
        type: Date,
        required: true,
        minlength: 1,
        trim: true,
        default: Date.now,
    }
})

export default mongoose.model('User', schema)