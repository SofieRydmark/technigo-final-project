import mongoose from 'mongoose'
import crypto from 'crypto'

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
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
})
const User = mongoose.model('User', UserSchema)
module.exports = User
