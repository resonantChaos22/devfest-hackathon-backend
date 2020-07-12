const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId,
    },
    patient: { 
        type: mongoose.Schema.Types.ObjectId,
    },
    diagnostics: { 
        type: String,
    },
    docs: [{ 
        type: String,
    }],
    meds: [{ 
        type: mongoose.Schema.Types.ObjectId,
    }],
    tests: [{ 
        type: mongoose.Schema.Types.ObjectId,
    }],
    status: { 
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);