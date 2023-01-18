import bcrypt from 'bcrypt'
import User from '../models/User.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

// Mail transporter credentials
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const resetPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(404).json({
        response: 'No user found with that email',
        success: false,
      })
    } else {
      // Create a reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      user.resetToken = resetToken
      user.resetTokenExpiration = Date.now() + 3600000 // 1 hour
      await user.save()

      const mailOptions = {
        from: 'partyplannerplanda@outlook.com',
        to: user.email,
        subject: 'Password Reset',
        text: `Seems like you have forgotten your email at Planda. Don't worry. 
      Please click on the following link to reset your password and receive a new one:
      https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/reset/${resetToken}
      If you did not request this, please ignore this email and your password will remain unchanged`,
      }

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log(error)
          res.status(400).json({
            response: 'Error sending email',
            success: false,
          })
        } else {
          console.log('Reset link sent to' + user.email)
          res.status(200).json({
            response: 'Reset link sent to your email',
            success: true,
          })
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      response: 'Error resetting email',
      success: false,
    })
  }
}

export const setResetPassword = async (req, res) => {
  const { resetToken } = req.params
  const salt = bcrypt.genSaltSync()
  const newPassword = crypto.randomBytes(10).toString('hex')

  try {
    const hashedPassword = bcrypt.hashSync(newPassword, salt)
    const updatedUser = await User.findOneAndUpdate(
      { resetToken: resetToken },
      {
        $set: {
          password: hashedPassword,
          resetToken: '',
          resetTokenExpiration: '',
        },
      }
    )

    const mailOptions = {
      from: 'partyplannerplanda@outlook.com',
      to: updatedUser.email,
      subject: 'New password',
      text: `Your password has been updated to ${newPassword}`,
    }

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(400).json({
          response: 'Error sending new password',
          success: false,
        })
      } else {
        res.status(200).json({
          message: 'A new password has been sent to your email',
          success: true,
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    })
  }
}
