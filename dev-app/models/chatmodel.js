const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({

    isGroupChat: {
        type: Boolean,
        default: false,
    },
    Admin: {
        type: mongoose.schema.Types.ObjectId,
        ref: "User"
    },
    chatId: {
        type: String,
        trim: true,
    },

    users: [
        {
            type: mongoose.schema.Types.ObjectId,
            ref: "User"
        },
    ],

}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;