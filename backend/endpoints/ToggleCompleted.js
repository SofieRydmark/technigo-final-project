import mongoose from 'mongoose'
const User = require('../models/User')
const Project = require('../models/Project')
const DrinksProject = require('../models/DrinksProject')
const FoodProject = require('../models/FoodProject')
const ActivityProject = require('../models/ActivityProject')
const DecorationProject = require('../models/DecorationsProject')

export const ToggleDrinks = async (req, res ) => {
    try {
        const { userId, projectId, drinksId } = req.params
        const { isCompleted } = req.body
    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const drinksToToggle = await Project.findByIdAndUpdate(
          projectId,
          {
            $set: {
                'drinksProjectList.$[elem].isCompleted': isCompleted }},
                { new: true, arrayFilters: [
                {'elem._id': mongoose.Types.ObjectId(drinksId)}]})
                if (user && project) {
                    res.status(200).json({
                      response: 'Drink has been toggled',
                      drinksToToggle,
                      success: true,
                    })
                  } else {
                    res.status(404).json({
                      response: `User or project not found`,
                      success: false,
                    })
                  }
                  } catch (error) {
                  res.status(401).json({
                  response: 'Invalid credentials',
                  success: false,
                  })}}
                  
export const ToggleFood = async (req, res ) => {
    try {
        const { userId, projectId, foodId } = req.params
        const { isCompleted } = req.body
    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const foodToToggle = await Project.findByIdAndUpdate(
          projectId,
          {
            $set: {
                'foodProjectList.$[elem].isCompleted': isCompleted }},
                { new: true, arrayFilters: [
                {'elem._id': mongoose.Types.ObjectId(foodId)}]})
                if (user && project) {
                    res.status(200).json({
                      response: 'Food has been completed',
                      foodToToggle,
                      success: true,
                    })
                  } else {
                    res.status(404).json({
                      response: `User or project not found`,
                      success: false,
                    })
                  }
                  } catch (error) {
                  res.status(401).json({
                  response: 'Invalid credentials',
                  success: false,
                  })}}

export const ToggleDecoration = async (req, res ) => {
    try {
        const { userId, projectId, decorationId } = req.params
        const { isCompleted } = req.body
    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const decorationToToggle = await Project.findByIdAndUpdate(
          projectId,
          {
            $set: {
                'decorationsProjectList.$[elem].isCompleted': isCompleted }},
                { new: true, arrayFilters: [
                {'elem._id': mongoose.Types.ObjectId(decorationId)}]})
                if (user && project) {
                    res.status(200).json({
                      response: 'Decoration has been completed',
                      decorationToToggle,
                      success: true,
                    })
                  } else {
                    res.status(404).json({
                      response: `User or project not found`,
                      success: false,
                    })
                  }
                  } catch (error) {
                  res.status(401).json({
                  response: 'Invalid credentials',
                  success: false,
                  })}}

export const ToggleActivity = async (req, res ) => {
    try {
        const { userId, projectId, activityId } = req.params
        const { isCompleted } = req.body
    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const activityToToggle = await Project.findByIdAndUpdate(
          projectId,
          {
            $set: {
                'activitiesProjectList.$[elem].isCompleted': isCompleted }},
                { new: true, arrayFilters: [
                {'elem._id': mongoose.Types.ObjectId(activityId)}]})
                if (user && project) {
                    res.status(200).json({
                      response: 'Activity has been completed',
                      activityToToggle,
                      success: true,
                    })
                  } else {
                    res.status(404).json({
                      response: `User or project not found`,
                      success: false,
                    })
                  }
                  } catch (error) {
                  res.status(401).json({
                  response: 'Invalid credentials',
                  success: false,
                  })}}

export const ToggleTheme = async (req, res ) => {
    try {
        const { userId, projectId, themeId } = req.params
        const { isCompleted } = req.body
    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const themeToToggle = await Project.findByIdAndUpdate(
          projectId,
          {
            $set: {
                'themeProjectList.$[elem].isCompleted': isCompleted }},
                { new: true, arrayFilters: [
                {'elem._id': mongoose.Types.ObjectId(themeId)}]})
                if (user && project) {
                    res.status(200).json({
                      response: 'Theme has been completed',
                      activityToToggle,
                      success: true,
                    })
                  } else {
                    res.status(404).json({
                      response: `User or project not found`,
                      success: false,
                    })
                  }
                  } catch (error) {
                  res.status(401).json({
                  response: 'Invalid credentials',
                  success: false,
                  })}}
                  
  export const ToggleGuest = async (req, res ) => {
      try {
        const { userId, projectId, guestId } = req.params
        const { isCompleted } = req.body
                    
        const user = await User.findById(userId)
        const project = await Project.findById(projectId)
        const guestToToggle = await Project.findByIdAndUpdate(projectId,
                    {
                      $set: {
                          'guestProjectList.$[elem].isCompleted': isCompleted }},
                            { new: true, arrayFilters: [
                            {'elem._id': mongoose.Types.ObjectId(guestId)}]})
                                if (user && project) {
                                    res.status(200).json({
                                      response: 'Theme has been completed',
                                      guestToToggle,
                                      success: true,
                                    })
                                  } else {
                                    res.status(404).json({
                                      response: `User or project not found`,
                                      success: false,
                                    })
                                  }
                                  } catch (error) {
                                  res.status(401).json({
                                  response: 'Invalid credentials',
                                  success: false,
                                  })}}