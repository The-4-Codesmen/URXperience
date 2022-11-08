const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()


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
if(process.env.NODE_ENV === 'development'){
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

app.use((req, res, next) =>{
    res.status(404).json({
        sucess: false,
        message:"Page not found"
    })
})

const PORT = process.env.PORT

//port for server side
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})