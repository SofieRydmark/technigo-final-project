const Food = require('../models/Food')

/* --------- FOOD GET  ----------- */
export const foodCategory = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const foodCollection = await Food.find()
      .sort({ name: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
    res.status(200).json({
      response: foodCollection,
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      response: "Can't find any food options right now",
      success: false,
    })
  }
}

export const foodType = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const typeOf = await Food.find({ type: req.params.type })
      .sort({ name: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
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
      response: "Can't find any food options for your type right now",
      success: false,
    })
  }
}
