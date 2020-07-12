const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: { 
        type: String,
    },
    email: { 
        type: String,
    },
    contact: { 
        type: Number,
    },
    location: { 
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);