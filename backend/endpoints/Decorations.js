const Decoration = require('../models/Decorations')

/* --------- DECORATIONS GET ----------- */
export const decorationsCategory = async (req, res) => {
  const page = parseInt(req.params.page)
  const limit = parseInt(req.params.limit) + 1

  try {
    const decorationsCollection = await Decoration.find()
      .skip(page * limit)
      .limit(limit)
    res.status(200).json({
      response: decorationsCollection,
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      response: "Can't find any decorations options right now",
      success: false,
    })
  }
}

export const decorationsType = async (req, res) => {
  const page = parseInt(req.params.page)
  const limit = parseInt(req.params.limit) + 1

  try {
    const typeOf = await Decoration.find({ type: req.params.type })
      .skip(page * limit)
      .limit(limit)
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
      response: "Can't find any decorations options for your type right now",
      success: false,
    })
  }
}
