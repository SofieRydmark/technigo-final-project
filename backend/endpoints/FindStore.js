import Stores from '../models/Stores'

export const FindStore = async (req, res) => {
  
    try {
      const storeCollection = await Stores.find()
      res.status(200).json({
        response: storeCollection,
        success: true,
      })
    } catch (error) {
      res.status(400).json({
        response: "Can't find any stores right now",
        success: false,
      })
    }
  }
