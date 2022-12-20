const Theme = require('../models/Theme')


/* --------- THEMES GET  ----------- */
export const ThemesCategory =  async (req, res) => {
    try {
      const themesCollection = await Theme.find()
      res.status(200).json({
        response: themesCollection,
        success: true,
      })
    } catch (error) {
      res.status(400).json({
        response: "Can't find any themes options right now",
        success: false,
      })
    }
  }
  export const ThemesId = async (req, res) => {
    try {
      const themeId = await Theme.findById(req.params.id)
  
      if (themeId) {
        res.status(200).json({
          success: true,
          theme: themeId,
        })
      } else {
        res.status(404).json({
          success: false,
          status_code: 404,
          error: `Id not found, try another`,
        })
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        status_code: 400,
        error: 'Invalid id',
      })
    }
  }

export const ThemesType = async (req, res) => {
    try {
      const typeOf = await Theme.find({ type: req.params.type })
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
        response: "Can't find any activities options for your type right now",
        success: false,
      })
    }
  }