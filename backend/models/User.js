import mongoose from "mongoose";
import bcrypt from "bcrypt";

const crypto = require('crypto')

// ************ SCHEMAS & MODELS *************** //
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})
const User = mongoose.model("User", UserSchema)
module.exports = User; 