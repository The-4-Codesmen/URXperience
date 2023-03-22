const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const message = require("./models/messagemodel");
const chat = require("./models/chatmodel");
const User = require("./models/authmodel");
//Config.env to ./config/config.env
require("dotenv").config({
  path: "./config/.env.production",
});

//connect to Database
connectDB();

//Use bodyParser
app.use(bodyParser.json());

//Load all routes
const authRouter = require("./routes/authroute");

// Config for only development
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(morgan("dev"));

  // Morgan gives info about each request
  // Cors it allows to deal with react for localhost at port 3000
  // without much problem
}

//Using routes
app.use("/api", authRouter);

app.use((req, res, next) => {
  res.status(404).json({
    sucess: false,
    message: "Page not found",
  });
});

const PORT = process.env.PORT;
//chat system port
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//get previous messages from room
async function retrievePreviousMessagesinRoom(room) {
  let roomMessages = await message.aggregate([
    { $match: { to: room } },
    //groups messages of the same date
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

// sorting the messages by the dates they were put into chat
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (latestMessages, newestMessages) {
    let previousDate = latestMessages._id.split("/");
    let currentDate = newestMessages._id.split("/");

    //month + year + day
    previousDate = previousDate[2] + previousDate[0] + previousDate[1];
    currentDate = currentDate[2] + currentDate[0] + currentDate[1];

    return previousDate < currentDate ? -1 : 1;
  });
}

//socket connection
io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });
  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await retrievePreviousMessagesinRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    await message.create({ content, from: sender, time, date, to: room });
    //sending message to specified room
    let roomMessages = await retrievePreviousMessagesinRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });

  //creating group chat
  socket.on("group-chat", async (creator, name, members) => {
    await chat.create({ creator: creator, name: name, members: members });
    socket.emit();
  });
  socket.on("leave-chat", async () => {
    const members = await User.find();
    socket.broadcast.emit("new-user", members);
  });
});
//port for server side
server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
