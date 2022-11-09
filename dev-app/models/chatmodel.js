const mongoose = require('mongoose')


//User Schema
const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    hash_password: {
        //password will be saved as hash after encryption
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        //there will be one for students(normal) and RAs()
        default: "Normal",
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, { timestamps: true })



module.exports = mongoose.model('chat', chatSchema)