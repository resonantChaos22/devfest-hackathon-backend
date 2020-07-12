const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  active: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  hospital: {
    type: String,
  },
  docs: [
    {
      type: String,
    },
  ],
  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);
