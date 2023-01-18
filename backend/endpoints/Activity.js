import Activity from '../models/Activity'

/* --------- ACTIVITIES GET  ----------- */
export const activityCategory = async (req, res) => {
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const activitiesCollection = await Activity.find()
      .sort({ name: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
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
  const resultsPerPage = 6
  let page = req.params.page >= 1 ? req.params.page : 1
  page = page - 1

  try {
    const typeOf = await Activity.find({ type: req.params.type })
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
      response: "Can't find any Activity options for your type right now",
      success: false,
    })
  }
}
