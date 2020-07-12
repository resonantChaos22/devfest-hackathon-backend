const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: { 
        type: String,
    },
    prescriptions: [{ 
        type: mongoose.Schema.Types.ObjectId,
    }],
    doctors: [{ 
        type: mongoose.Schema.Types.ObjectId,
    }],
    docs: [{ 
        type: String,
    }],
});

module.exports = mongoose.model('Patient', userSchema);