import bcrypt from 'bcrypt'
const User = require('../models/User.js')


const crypto = require('crypto')

// ************ SIGN IN/SIGN UP/UPDATE USER ENDPOINTS *************** //

export const signUp =  async (req, res) => {
    const { email, password } = req.body
    try {
      const salt = bcrypt.genSaltSync()
      if (password.length < 8) {
        res.status(400).json({
          response: 'Password must be minimum 8 characters',
          success: false,
        })
      } else {
        const newUser = await new User({
          email: email.toLowerCase(),
          password: bcrypt.hashSync(password, salt),
        }).save()
        res.status(201).json({
          response: {
            email: newUser.email,
            accessToken: newUser.accessToken,
            userId: newUser._id,
          },
          success: true,
        })
      }
    } catch (error) {
      const userExists = await User.findOne({ email })
      if (email === '') {
        res.status(400).json({
          response: 'Please enter an email',
          error: error,
          success: false,
        })
      } else if (userExists) {
        res.status(400).json({
          response: 'User already exists',
          success: false,
        })
      } else if (error.code === 11000 && error.keyPattern.email) {
        res.status(400).json({
          response: 'User already exists',
          error: error,
          success: false,
        })
      } else {
        res.status(400).json({
          response: error,
          success: false,
        })
      }
    }
  }

export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(201).json({
          success: true,
          response: {
            userId: user._id,
            email: user.email,
            accessToken: user.accessToken,
          },
        })
      } else {
        res.status(400).json({
          success: false,
          response: 'Credentials did not match',
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response: 'oops something went wrong',
        error: error,
      })
    }
  }