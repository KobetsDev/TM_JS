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
    subject: {
        ref: 'Subject',
        type: mongoose.Schema.Types.ObjectId
    },
    lector: {
        ref: 'Lector',
        type: mongoose.Schema.Types.ObjectId
    },
    time: {
        type: Date,
        required: true,
    },
    office: {
        ref: 'Office',
        type: mongoose.Schema.Types.ObjectId
    },
    week: {
        type: Boolean,
    },
    type_lesson: {
        type: String,
        required: true,
    },
    svyazannie_pairs: {
        type: Boolean,
    }
})

export default mongoose.model('Calendar', schema)