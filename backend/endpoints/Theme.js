const Theme = require('../models/Theme')

/* --------- THEMES GET  ----------- */
export const ThemesCategory = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const themesCollection = await Theme.find()
      .sort({ name: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
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

export const ThemesType = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const typeOf = await Theme.find({ type: req.params.type })
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
      response: "Can't find any activities options for your type right now",
      success: false,
    })
  }
}
