import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    short_name: {
        type: String,
        required: true,
        unique: true
    },
    dean_name: {
        type: String,
        required: true,
        unique: true
    },
    // notifications: { //Текст уведомления для факультета
    //     type: String,
    //     required: true,
    //     unique: true
    // }
})

export default mongoose.model('Faculties', schema)