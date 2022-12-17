import bcrypt from 'bcrypt';
const User = require('../models/User.js')

const crypto = require('crypto')

export const deleteUser = async (req, res) => {
    const { userId } = req.params
    try {
      const user = await User.findOneAndDelete({ userId })
      if (user) {
        res.status(200).json({
          success: true,
          response: 'Account removed :(',
        })
      } else {
        res.status(400).json({
          success: false,
          response: 'User not found',
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response: error,
      })
    }
  }


export const changePassword = async (req, res) => {
    const { userId } = req.params
    const { password } = req.body
    const salt = bcrypt.genSaltSync()
    try {
      const user = await User.findOne({ userId })
      if (user) {
        const newPassword = bcrypt.hashSync(password, salt)
        const updateUser = await User.findByIdAndUpdate(
          { _id: userId },
          {
            $set: {
              password: newPassword,
            },
          }
        )
        res.status(200).json({
          success: true,
          data: updateUser,
          response: 'Password changed',
        })
      } else {
        res.status(400).json({
          success: false,
          response: 'User not found',
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response: error,
      })
    }
  }
  