

const mongoose = require('mongoose')

const eventmodel = new mongoose.Schema({
    
    title: {
        type: String,
        trim: true,
    },    
    description: {
        type: String,
        trim: true,
    }, 
    date: {
        type: String,
        trim: true,
    }, 
    from: {
        type: String,
        trim: true,
    }, 
    to: {
        type: String,
        trim: true,
    }, 
    author:{
        type: String,
        trim: true,

    }, 
    authorName:{
        type: String,
        trim: true,

    }
});

const event = mongoose.model('event', eventmodel);

module.exports = event;