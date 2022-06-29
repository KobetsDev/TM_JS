import mongoose from "mongoose";
// import Group from "./Group";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    group: [{
        ref: 'Group',
        type: mongoose.Schema.Types.ObjectId
    }],
    // lector: [{
    //     ref: 'Lector',
    //     type: mongoose.Schema.Types.ObjectId
    // }],
    // address: [{
    //     ref: 'Address',                 
    //     type: mongoose.Schema.Types.ObjectId
    // }],

})

export default mongoose.model('Lesson', schema)