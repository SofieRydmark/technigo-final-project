const Project = require('../models/Project')
const User = require('../models/User')

export const ProjectBoard = async (req, res) => {
    const { userId } = req.params
    try {
      const user = await User.findOne({ userId })
      if (user)
        res.status(200).json({
          response: `Welcome back`,
          success: true,
        })
    } catch (error) {
      res.status(401).json({
        response: 'Invalid credentials',
        success: false,
      })
    }
  }


export const allProjects =  async (req, res) => {
    const { userId } = req.params
    const allProjects = await Project.find({ userProject: userId })
    try {
      if (allProjects) {
        res.status(200).json({
          response: allProjects,
          success: true,
        })
      } else if (allProjects.length === 0) {
        res.status(200).json({
          response: `Could not find any projects!`,
          success: false,
        })
      }
    } catch (error) {
      res.status(404).json({
        response: `Could not find any projects!`,
        success: false,
      })
    }
  }
  /* GET singleProject */ //WORKS PERFECT
  export const SingleProjectId =  async (req, res) => {
    const { userId, projectId } = req.params
  
    try {
      const singleProject = await Project.find({ projectId, userProject: userId })
      if (singleProject) {
        res.status(200).json({
          response: `Everything is ok`,
          success: true,
          data: singleProject,
        })
      } else {
        res.status(404).json({
          response: `Could not find project`,
          success: false,
        })
      }
    } catch (error) {
      res.status(400).json({
        response: error,
        success: false,
      })
    }
  }
  
  /* add project to the board */ //WORKS PERFECT
   export const addNewProject = async (req, res) => {
    const { userId } = req.params
    const { name, due_date } = req.body
    try {
      const newProject = new Project({ name, due_date, userProject: userId })
      await newProject.save()
      res.status(200).json({
        success: true,
        response: newProject,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        response: `Project failed to add`,
        error: error,
      })
    }
  }