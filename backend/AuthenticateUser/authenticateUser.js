const User = require('../models/User.js')

// ************ USER AUTHENTICATION *************** //
const authenticateUser = async (req, res, next) => {
    const accessToken = req.header('Authorization')
  
    try {
      const user = await User.findOne({ accessToken })
      if (user) {
        next() // when user is confirmed call the next function after authentication
      } else {
        res.status(401).json({ response: 'Please log in', success: false })
      }
    } catch (error) {
      res.status(500).json({ response: error, success: false })
    }
  }
  
  export default authenticateUser;
  