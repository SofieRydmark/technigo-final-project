const Activity = require('../models/Activity')

/* --------- ACTIVITIES GET  ----------- */
export const activityCategory = async (req, res) => {
    try {
      const activitiesCollection = await Activity.find()
      res.status(200).json({
        response: activitiesCollection,
        success: true,
      })
    } catch (error) {
      res.status(400).json({
        response: "Can't find any activities options right now",
        success: false,
      })
    }
  }
  
export const activityType = async (req, res) => {
    try {
      const typeOf = await Activity.find({ type: req.params.type })
      if (!typeOf) {
        res.status(400).json({
          response: 'not found',
          success: false,
        })
      } else {
        res.status(200).json({
          response: typeOf,
          success: true,
        })
      }
    } catch (error) {
      res.status(400).json({
        response: "Can't find any Activity options for your type right now",
        success: false,
      })
    }
  }
  