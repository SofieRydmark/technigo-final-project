import bcrypt from 'bcrypt'
const User = require('../models/User.js')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config();



export const resetPassword = async (req, res) => {
  const email = req.body.email

  try {
    const user = await User.findOne({ email: email })
    console.log('user', user)
    if (!user) {
      res.status(404).json({
        response: 'No user found with that email',
        success: false,
      })
    } else {
      // Create a reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      console.log('resettoken', resetToken)
      user.resetToken = resetToken
      user.resetTokenExpiration = Date.now() + 3600000 // 1 hour
      await user.save()
      console.log('user saved')

      // Send reset token to user's email
      const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
          
        },
      })

      const mailOptions = {
        from: 'partyplannerplanda@outlook.com',
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) requested a password reset for your account at Planda.
      Please click on the following link to complete the process:
      http://localhost:8080/reset/${resetToken}
      If you did not request this, please ignore this email and your password will remain unchanged`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          res.status(400).json({
            response: 'Error sending email',
            success: false,
          })
        } else {
          console.log('Email sent: ' + info.response)
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

/* export const setResetPassword = async (req,res ) => {
  const salt = await bcrypt.genSalt();
 
  const updatedUser = await User.findOneAndUpdate(
    { resetToken: req.body.resetToken },
    {
        $set: {
            password: await bcrypt.hash(req.body.newPassword, salt),
            resetToken: undefined,
            resetTokenExpiration: undefined,
        },
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404).json({
      response: 'Invalid reset token',
      success: false,
    });
    return;
  }
  
  res.status(200).json({
    response: 'Password reset successful',
    success: true,
  });
}
 */