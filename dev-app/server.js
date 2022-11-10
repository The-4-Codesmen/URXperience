const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()

const rooms = ['Engineering', 'Nursing', 'Business']
//Config.env to ./config/config.env
require('dotenv').config({
    path: './config/config.env'
})

//connect to Database 
connectDB()


//Use bodyParser
app.use(bodyParser.json())


//Load all routes
const authRouter = require('./routes/authroute')
// Config for only development
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))

    // Morgan gives info about each request
    // Cors it allows to deal with react for localhost at port 3000
    // without much problem
}



//Using routes
app.use('/api', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        sucess: false,
        message: "Page not found"
    })
})

const PORT = process.env.PORT
//port for server side
const server = app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})

//5000-backend
//const server = require('http').createServer(app)
//chat system port
const io = require("socket.io")(server, {
    pingTimeout: 100000,
    cors: {
        origin: "http://localhost:3000",
    },
})

io.on("connection",(socket)=>{

    console.log(socket.id);
    socket.on('send-message', message, room);
    io.emit('forwarded-message', message )
})




//client side 
// npm i socket.io-client

import io from 'socket.io-client'
const socket = io("http://localhost:3000");

socket.on('connect', ()=>{
   
    displayMessage('connected with id: ' +socket.id)

    //funtion to send message to server 
    socket.emit('send-message',"data to be passed to server",room);

})


socket.on('forwarded-message', message =>{
    //display message

})

