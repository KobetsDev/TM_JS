import mongoose from "mongoose";

const schemaAddress = new mongoose.Schema({
    place: {
        type: String,
        required: true,
        unique: true
    }
})

export const Address = () => mongoose.model('Address', schemaAddress)


const schemaCalendar = new mongoose.Schema({
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

export const Calendar = () => mongoose.model('Calendar', schemaCalendar)


const schemaFaculties = new mongoose.Schema({
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
    notifications: {
        type: String,
        required: true,
        unique: true
    }
})

export const Faculties = () => mongoose.model('Faculties', schemaFaculties)

const schemaGroup = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    published: {
        type: Boolean,
        required: true,
        unique: true
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

export const Group = function () { mongoose.model('Group', schemaGroup) }

const schemaLector = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const Lector = () => mongoose.model('Lector', schemaLector)

const schemaOffice = new mongoose.Schema({
    num: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        ref: 'Address',
        type: mongoose.Schema.Types.ObjectId
    },
    places: {
        type: String,
        required: true
    }
})

export const Office = () => mongoose.model('Office', schemaOffice)

const schemaSubject = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const Subject = () => mongoose.model('Subject', schemaSubject)


const schemaUser = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User = () => mongoose.model('User', schemaUser)