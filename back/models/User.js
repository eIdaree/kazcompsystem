const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_number: {
      type: String,
      required: true,
      unique: true
    },
    roles: [{
      type: String,
      default: "User"
    }],
    active: {
      type: Boolean,
      default: true
    }
  });
  
  module.exports = mongoose.model('User', userSchema);
