const Project = require('../models/Project')
const User = require('../models/User')
const ThemeProject = require('../models/ThemeProject')
const DrinksProject = require('../models/DrinksProject')
const FoodProject = require('../models/FoodProject')
const ActivityProject = require('../models/ActivityProject')
const DecorationProject = require('../models/DecorationsProject')

// Add on all objects except theme that you only can have 1 of . 
export const addTheme = async (req, res) => {
    const { userId, projectId } = req.params
    const { themProjectList, themesName } = req.body
  
   try{
    const projectToUpdate= await Project.findOne({ userProject: userId, _id: projectId})
      
      if (projectToUpdate){

        const updateProject = await Project.findByIdAndUpdate({ _id: projectId}, { 
            $push: {themeProjectList: new ThemeProject({ themesName })}
           });

          res.status(200).json({
          response: "Added to project",
          data: updateProject
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }


  //********************** ADD DRINKS ************************* */
  export const addDrinks = async (req, res) => {
    const { userId, projectId } = req.params
    const { drinksProjectList, drinksProject, drinksName} = req.body
  
   try{
    const projectToUpdate= await Project.findOne({ userProject: userId, _id: projectId})
   
      if (projectToUpdate){
        const addToProject= await Project.findByIdAndUpdate({ _id: projectId }, {$push:{
          drinksProjectList: new DrinksProject({drinksName})
          
        }}
          )
          res.status(200).json({
          response: "Added to project",
          data: addToProject
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }

 //********************** ADD FOOD ************************* */
  export const addFood = async (req, res) => {
    const { userId, projectId } = req.params
    const { foodProjectList, foodProject, foodName} = req.body
  
   try{
    const projectToUpdate= await Project.findOne({ userProject: userId, _id: projectId})
   
      if (projectToUpdate){
        const addToProject= await Project.findByIdAndUpdate({ _id: projectId }, {$push:{
          foodProjectList: new FoodProject({foodName})
          
        }}
          )
          res.status(200).json({
          response: "Added to project",
          data: addToProject
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }

  //********************** ADD ACTIVITY  ************************* */
  export const addActivity = async (req, res) => {
    const { userId, projectId } = req.params
    const { activitiesProjectList, activityProject,  activitiesName} = req.body
  
   try{
    const projectToUpdate= await Project.findOne({ userProject: userId, _id: projectId})
   
      if (projectToUpdate){
        const addToProject= await Project.findByIdAndUpdate({ _id: projectId }, {$push:{
            activitiesProjectList: new ActivityProject({activitiesName})
          
        }}
          )
          res.status(200).json({
          response: "Added to project",
          data: addToProject
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }
  
   //********************** ADD DECORATIONS  ************************* */
   export const addDecorations = async (req, res) => {
    const { userId, projectId } = req.params
    const { decorationsProjectList, decorationProject , decorationsName} = req.body
  
   try{
    const projectToUpdate= await Project.findOne({ userProject: userId, _id: projectId})
   
      if (projectToUpdate){
        const addToProject= await Project.findByIdAndUpdate({ _id: projectId }, {$push:{
          decorationsProjectList: new DecorationProject({decorationsName})
          
        }}
          )
          res.status(200).json({
          response: "Added to project",
          data: addToProject
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }
  
  