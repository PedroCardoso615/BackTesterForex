const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
    max: 15,
  },
  age: {
    type: Number,
    required: true,
    min: [18, "You must be at least 18 years old to register"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },

  permissions: {},

  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);