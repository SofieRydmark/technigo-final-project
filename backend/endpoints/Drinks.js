const Drink = require('../models/Drink')


/* --------- DRINKS GET  ----------- */
export const drinksCategory = async (req, res) => {
    try {
      const drinks = await Drink.find()
      res.status(200).json({
        response: drinks,
        success: true,
      })
    } catch (error) {
      res.status(400).json({
        response: "Can't find any drinks option right now",
        success: false,
      })
    }
  }
  
  export const drinksType = async (req, res) => {
    try {
      const typeOf = await Drink.find({ type: req.params.type })
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
        response: "Can't find any drinks options for your type right now",
        success: false,
      })
    }
  }