import mongoose from 'mongoose'
import Project from '../models/Project'
import User from '../models/User'
import Budget from '../models/Budget'

//--- add new update to the budgetList --- //

export const AddBudget = async (req, res) => {
  const { userId, projectId } = req.params
  const { itemName, itemPrice } = req.body
  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    if (user && project) {
      const addedItem = await Project.findByIdAndUpdate(
        { _id: projectId },
        {
          $push: { budgetList: new Budget({ itemName, itemPrice }) },
        }
      )
      res.status(200).json({
        response: 'Item added to budget',
        data: addedItem,
      })
    } else {
      res.status(500).json({
        response: 'Could not update',
      })
    }
  } catch {
    res.status(401).json({
      response: 'Invalid credentials',
      success: false,
      error: error,
    })
  }
}

export const deleteItemFromBudget = async (req, res) => {
  const { userId, projectId, itemId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const itemToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { budgetList: { _id: mongoose.Types.ObjectId(itemId) } } }
    )
    if (user && project) {
      res.status(200).json({
        response: `Item has been deleted`,
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Item not found`,
        success: false,
      })
    }
  } catch (error) {
    res.status(401).json({
      response: 'Invalid credentials',
      success: false,
    })
  }
}
