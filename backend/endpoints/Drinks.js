import Drink from '../models/Drink'

/* --------- DRINKS GET  ----------- */
export const drinksCategory = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const drinks = await Drink.find()
      .sort({ name: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
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
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const typeOf = await Drink.find({ type: req.params.type })
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
      response: "Can't find any drinks options for your type right now",
      success: false,
    })
  }
}
