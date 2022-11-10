const User = require('../models/authmodel');
const Chat = require('../models/chatmodel');
const Message = require('../models/messagemodel');
const asyncHandler = require("express-async-handler");



// finding all chats need => userID. 
const fetchChats = asyncHandeler(async (req, res) => {

    const userId = req.user.id;
    Chat.find({ users: { $elemMatch: { $eq: userId } } }).then(result => res.send(
        res.send(result))
    )

});


// creating group needs => users array , current login user, groupname. 
const createGroup = asyncHandeler(async (req, res) => {

    const userArray = JSON.parse(req.body.users);
    userArray.push(req.user);
    const groupName = req.body.group_name;

    try {
        const groupChat = await Chat.create({

            isGroupChat: true,
            Admin: req.user,
            chatId: groupName,
            users: userArray
        });
    } catch (error) { }

});

const addUser = asyncHandeler(async (req, res) => {





});

module.exports = { fetchChats, createGroup, addUser };