const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    creator: String,
    name: String,
    createdAt: Date,
    members: [{
        type:String
    }]
})
const chat = mongoose.model('Chat', chatSchema);
module.exports = chat;