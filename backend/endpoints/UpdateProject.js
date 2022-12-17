const Project = require('../models/Project')
const User = require('../models/User')

export const UpdateProjectName =  async (req, res) => {
    const { userId, projectId } = req.params
    const { guestList, phone, name, due_date } = req.body
    // console.log("name", req.body.guestList)
    try {
      const projectToChange = await Project.findOne({ _id: projectId, userProject: userId })
      if (projectToChange) {
        // const guestListupdate = req.body.guestList
        // const nameUpdate = req.body.name
        const updatedProject = await Project.findByIdAndUpdate(
          { _id: projectId },
          {
            $push: {
              guestList: guestList,
            },
            $set: { name: name, due_date: due_date },
          }
        )
        res.status(200).json({
          response: 'Updated',
          data: updatedProject,
        })
        console.log('something', guestList)
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




  // DENNA GÔR KAJA I GAMLA REPO ELLER HUR ? 
 /*  app.delete('/:userId/project-board/projects/:projectId', authenticateUser, async (req, res) => {
    const { userId, projectId } = req.params
    const { guestList, name, guestListName } = req.body
    // console.log("name", req.body.guestList)
    try {
      const projectToChange = await Project.findOne({ _id: projectId, userProject: userId })
      if (projectToChange) {
        // const guestListupdate = req.body.guestList
        // const nameUpdate = req.body.name
        const updatedProject = await Project.findByIdAndUpdate(
          { _id: projectId },
          {
            $push: {
              guestList: guestList,
            },
            $set: { name: name, guestList: guestListName },
          }
        )
        res.status(200).json({
          response: 'Updated',
          data: updatedProject,
        })
        console.log(name, guestList)
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
  }) */