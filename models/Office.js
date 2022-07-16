import mongoose from "mongoose";

const schema = new mongoose.Schema({
    num: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    address: {
        ref: 'Address',
        type: mongoose.Schema.Types.ObjectId
    },
    places: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
})

export default mongoose.model('Office', schema)