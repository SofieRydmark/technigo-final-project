import mongoose from 'mongoose'
import Project from '../models/Project'
import User from '../models/User'
import Guest from '../models/Guest'

export const UpdateProjectName = async (req, res) => {
  const { userId, projectId } = req.params
  const { name, due_date } = req.body

  try {
    const projectToUpdate = await Project.findOne({ userId, projectId })
    if (projectToUpdate) {
      const updatedProject = await Project.findByIdAndUpdate(
        { _id: projectId },
        {
          $set: { name: name, due_date: due_date },
        }
      )

      res.status(200).json({
        response: 'Updated',
        data: updatedProject,
      })
    } else {
      res.status(500).json({
        response: 'Could not update',
      })
    }
  } catch (error) {
    res.status(401).json({
      response: 'Invalid credentials',
      success: false,
      error: error,
    })
  }
}

export const addNewGuest = async (req, res) => {
  const { userId, projectId } = req.params
  const { guestName, phone } = req.body
  try {
    const projectToChange = await Project.findOne({ userProject: userId, _id: projectId })
    if (projectToChange) {
      const addedGuest = await Project.findByIdAndUpdate(
        { _id: projectId },
        {
          $push: {
            guestList: new Guest({ guestName, phone }),
          },
        }
      )
      res.status(200).json({
        response: 'Guest added',
        data: addedGuest,
      })
    } else {
      res.status(500).json({
        response: 'Could not update',
      })
    }
  } catch (error) {
    res.status(401).json({
      response: 'Invalid credentials',
      success: false,
      error: error,
    })
  }
}

export const deleteGuest = async (req, res) => {
  const { userId, projectId, guestId } = req.params

  try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const guestToDelete = await Project.findByIdAndUpdate(
      { _id: projectId },
      { $pull: { guestList: { _id: mongoose.Types.ObjectId(guestId) } } }
    )
    if (user && project) {
      res.status(200).json({
        response: `Guest has been deleted`,
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
