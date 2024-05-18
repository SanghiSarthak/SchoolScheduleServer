// models/User.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isUser: {
    type: Boolean,
    default: false
  },
  name : {
    type : String,
    required : true
  }
});

UserSchema.plugin(passportLocalMongoose);
const AdminUser = mongoose.model('Admin', UserSchema);

module.exports = AdminUser;
