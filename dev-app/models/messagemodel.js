const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: String,
    from: Object,
    socketid: String,
    time: String,
    date: String,
    to: String
})
const message = mongoose.model('Message', messageSchema);
module.exports = message;
// const messageSchema = new mongoose.Schema({

//     content: {
//         type: String,
//         trim: true,
//     },

//     sender: {
//         type: mongoose.schema.Types.ObjectId,
//         ref: "User"
//     },
//     chat: {
//         type: mongoose.schema.Types.ObjectId,
//         ref: "Chat",
//     },

// }, { timestamps: true });

// const Chat = mongoose.model('Message', messageSchema);

// module.exports = Message;