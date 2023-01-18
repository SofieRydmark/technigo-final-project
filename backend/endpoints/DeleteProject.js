import Project from '../models/Project'
import User from '../models/User'

/* DELETE the project from the project board */
export const deleteProject = async (req, res) => {
  const { userId, projectId } = req.params
  try {
    const user = await User.find({ userId })
    const projectToDelete = await Project.findOneAndDelete({ userProject: userId, _id: projectId })
    console.log('delete', user, projectToDelete)
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
