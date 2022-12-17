const Project = require('../models/Project')
const User = require('../models/User')
/* DELETE the project from the project board */ //WORKS PERFECT
export const deleteProject = async (req, res) => {
      const { userId, projectId } = req.params
      try {
        const user = await User.find({ userId })
        const projectToDelete = await Project.findOneAndDelete({ projectId })
        if (user && projectToDelete) {
          res.status(200).json({
            response: `Project has been deleted`,
            success: true,
          })
        } else {
          res.status(404).json({
            response: `Project not found`,
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
  