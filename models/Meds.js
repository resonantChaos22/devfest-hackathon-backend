const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timing: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Meds', userSchema);
