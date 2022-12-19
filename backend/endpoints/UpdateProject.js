const Project = require('../models/Project')
const User = require('../models/User')

export const UpdateProjectName =  async (req, res) => {
  const { userId, projectId } = req.params
  const { name, due_date } = req.body

 try{

  const projectToUpdate= await Project.findOne({ userId, projectId })
  console.log("projectToUpdate",  projectToUpdate)
    if (projectToUpdate){

      const updatedProject = await Project.findByIdAndUpdate({ _id: projectId}, { 
         $set: {name: name, due_date: due_date}
        });
    
            res.status(200).json({
            response: "Updated",
            data: updatedProject
      });

    } else {
            res.status(500).json({
            response: "Could not update"
      });
    }
 }catch(error) {
      res.status(401).json({
        response: "Invalid credentials",
        success: false,
        error: error
 })
}
}

// export const addNewGuest = async (req, res) => {
//   const { userId, projectId } = req.params
//   const { guestList, guestName, phone} = req.body
//  try{
//   const user = await User.find({ userId })
//   const projectToChange= await Project.findOne({ projectId })
//   console.log("project to change", projectToChange)
//     if (projectToChange){

//       const addedGuest= await Project.findByIdAndUpdate({ _id: projectId}, { $push:{
//         guestList: new Guest({ guestName, phone })},
//       })
//         res.status(200).json({
//         response: "Guest added",
//         data: addedGuest
//       })
//       console.log("something", addedGuest)

//     } else {
//       res.status(500).json({
//         response: "Could not update"
//       });
//     }
//  }catch(error) {
//       res.status(401).json({
//         response: "Invalid credentials",
//         success: false,
//         error: error
//  })
// }
// }



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