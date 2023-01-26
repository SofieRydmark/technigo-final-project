import mongoose from 'mongoose'
import User from '../models/User'
import Project from '../models/Project'

export const DeleteTheme = async (req, res) => {
  const { userId, projectId, themeId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const themeToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { themeProjectList: { _id: mongoose.Types.ObjectId(themeId) } } }
    )

    if (user && project) {
      res.status(200).json({
        response: 'Theme has been deleted',
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Guest not found`,
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

export const DeleteDrink = async (req, res) => {
  const { userId, projectId, drinksId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const drinksToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { drinksProjectList: { _id: mongoose.Types.ObjectId(drinksId) } } }
    )

    if (user && project) {
      res.status(200).json({
        response: 'Drink has been deleted',
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Guest not found`,
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

export const DeleteFood = async (req, res) => {
  const { userId, projectId, foodId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const foodToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { foodProjectList: { _id: mongoose.Types.ObjectId(foodId) } } }
    )

    if (user && project) {
      res.status(200).json({
        response: 'Food has been deleted',
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Guest not found`,
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

export const DeleteActivity = async (req, res) => {
  const { userId, projectId, activityId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const activityToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { activitiesProjectList: { _id: mongoose.Types.ObjectId(activityId) } } }
    )

    if (user && project) {
      res.status(200).json({
        response: 'Activity has been deleted',
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Guest not found`,
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

export const DeleteDecoration = async (req, res) => {
  const { userId, projectId, decorationId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const decorationToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { decorationsProjectList: { _id: mongoose.Types.ObjectId(decorationId) } } }
    )

    if (user && project) {
      res.status(200).json({
        response: 'Decoration has been deleted',
        success: true,
      })
    } else {
      res.status(404).json({
        response: `Guest not found`,
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
