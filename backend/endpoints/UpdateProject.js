const Project = require('../models/Project')
const User = require('../models/User')
const Guest = require('../models/Guest')

export const UpdateProjectName =  async (req, res) => {
  const { userId, projectId } = req.params
  const { name, due_date } = req.body

 try{

  const projectToUpdate= await Project.findOne({ userId, projectId })
  console.log("projectToUpdate",  projectToUpdate, userId)
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

export const addNewGuest = async (req, res) => {
const { userId, projectId } = req.params
const { guestList, guestName, phone} = req.body
try{
/* const user = await User.findOne({ userId }) */
 const projectToChange= await Project.findOne({ userProject: userId, _id: projectId })
console.log("project to change", projectToChange, userId)
if ( /* user &&  */ projectToChange){

  const addedGuest= await Project.findByIdAndUpdate({ _id: projectId}, { $push:{
  guestList: new Guest({ guestName, phone })},
 })
res.status(200).json({
response: "Guest added",
 data: addedGuest
})
   console.log("something", addedGuest)

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

