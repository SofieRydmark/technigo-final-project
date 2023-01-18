import mongoose from 'mongoose'
import User from '../models/User'
import Project from '../models/Project'
import DrinksProject from '../models/DrinksProject'
import FoodProject from '../models/FoodProject'
import ActivityProject from '../models/ActivityProject'
import DecorationProject from '../models/DecorationsProject'

export const DeleteTheme = async (req, res) => {
  const { userId, projectId, themeId } = req.params
  const { themProjectList, themesName } = req.body
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
  const { drinksProjectList, drinksProject, drinksName } = req.body
  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const drinksToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { drinksProjectList: { _id: mongoose.Types.ObjectId(drinksId) } } }
    )

    if (user && project) {
      console.log('guestToDelete', drinksToDelete)
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
  const { foodProjectList, foodProject, foodName } = req.body
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
  const { activitiesProjectList, activityProject, activitiesName } = req.body
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
  const { decorationsProjectList, decorationProject, decorationsName } = req.body
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
