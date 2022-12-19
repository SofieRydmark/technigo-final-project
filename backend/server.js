import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import getEndpoints from 'express-list-endpoints'
import themeData from './data/themes.json'
import decorationsData from './data/decorations.json'
import drinksData from './data/drinks.json'
import activitiesData from './data/activities.json'
import foodData from './data/food.json'
import authenticateUser from './AuthenticateUser/authenticateUser'
import { signIn, signUp } from './endpoints/Signup'
import { deleteUser, changePassword } from './endpoints/AdminAccount'
import { ThemesType, ThemesCategory ,ThemesId } from './endpoints/Theme'
import { decorationsCategory, decorationsType } from './endpoints/Decorations'
import { drinksCategory, drinksType } from './endpoints/Drinks'
import { foodCategory, foodType } from './endpoints/Food'
import { activityCategory, activityType } from './endpoints/Activity'
import { addNewProject, allProjects, ProjectBoard, SingleProjectId } from './endpoints/ProjectBoard'
import { UpdateProjectName } from './endpoints/UpdateProject'
import { deleteProject } from './endpoints/DeleteProject'

const Food = require('../backend/models/Food')
const Decoration = require('../backend/models/Decorations')
const Activity = require('../backend/models/Activity')
const Drink = require('../backend/models/Drink')
const Theme = require('../backend/models/Theme')
const Project = require('../backend/models/Project')
const User = require('../backend/models/User')

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-project'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// ************ RESET DB *************** //
if (process.env.RESET_DB) {
  const seedDataBase = async () => {
    await Theme.deleteMany() 
    await Decoration.deleteMany()
    await Drink.deleteMany()
    await Activity.deleteMany()
    await Food.deleteMany()

     themeData.forEach((singleTheme) => {
      const newTheme = new Theme(singleTheme)
      newTheme.save()
    }) 
   decorationsData.forEach((singleDecor) => {
      const newDecoration = new Decoration(singleDecor)
      newDecoration.save()
    })
    drinksData.forEach((singleDrink) => {
      const newDrink = new Drink(singleDrink)
      newDrink.save()
    })
    foodData.forEach((singleFood) => {
      const newFood = new Food(singleFood)
      newFood.save()
    })
    activitiesData.forEach((singleActivity) => {
      const newActivity = new Activity(singleActivity)
      newActivity.save()
    })
  }
  seedDataBase()
}
 
// ************ PORT *************** //
const port = process.env.PORT || 8080
const app = express()

// ************ MIDDLEWARES *************** //
app.use(cors())
app.use(express.json())

// ************ ENDPOINTS *************** //
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({
      status_code: 503,
      error: 'Server unavailable',
    })
  }
})

app.get('/', (req, res) => {
  res.send(getEndpoints(app))
})
// ************ SIGN UP / SIGN IN *************** //
app.post('/signUp', signUp);
app.post('/signIn', signIn)

// ************ ADMIN USER ACCOUNT *************** //
app.delete('/:userId/admin/delete', authenticateUser, deleteUser)
app.patch('/:userId/admin/change', authenticateUser, changePassword)

// ************ CATEGORY ENDPOINTS GET  *************** //

// ************ THEMES *************** //
app.get('/themes', authenticateUser, ThemesCategory) 
app.get('/themes/:id', authenticateUser,ThemesId) 
app.get('/themes/type/:type', authenticateUser, ThemesType)  

// ************ DECORATIONS *************** //
app.get('/decorations', authenticateUser,decorationsCategory)
app.get('/decorations/type/:type', authenticateUser, decorationsType)

// ************ DRINKS *************** //
app.get('/drinks', authenticateUser, drinksCategory)
app.get('/drinks/type/:type', authenticateUser,drinksType)

// ************ FOOD *************** //
app.get('/food', authenticateUser,foodCategory)
app.get('/food/type/:type', authenticateUser,foodType)

// ************ ACTIVITIES *************** //
app.get('/activities', authenticateUser, activityCategory)
app.get('/activities/type/:type', authenticateUser,activityType)

// ************ PROJECT ENDPOINTS *************** //

// ************ PROJECT BOARD AND SINGLE PROJECT GET*************** //
app.get('/:userId/project-board', authenticateUser, ProjectBoard)
app.get('/:userId/project-board/projects', authenticateUser,allProjects)
app.get('/:userId/project-board/projects/:projectId', authenticateUser,SingleProjectId)

// ************ ADD NEW PROJECTS AND OBJECT *************** //
app.post('/:userId/project-board/projects/addProject', authenticateUser,addNewProject)

/* change name and due date in single project and add guests to guest list */ //WORK OK
app.patch("/:userId/project-board/projects/:projectId", async (req, res) => {
  const { userId, projectId } = req.params
  const { name, due_date } = req.body

 try{

  const projectToChange= await Project.findOne({ userId, projectId })
    if (projectToChange){

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
})


/* Add new guest to the the guest list on project */// WORKS OK
app.post("/:userId/project-board/projects/:projectId/addGuest", authenticateUser, async (req, res) => {
  const { userId, projectId } = req.params
  const { guestList, guestName, phone} = req.body
 try{
  const user = await User.find({ userId })
  const projectToChange= await Project.findOne({ projectId })
    if (projectToChange){

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
})

/* DELETE the guest from the guest list*/ 

app.delete('/:userId/project-board/projects/:projectId/delete/:guestId', authenticateUser, async (req, res) => {
  const { userId, projectId, guestId } = req.params
  const { guestList, name, guestListName } = req.body

  try {
    const user = await User.find({ userId })
    const projectToUpdate = await Project.find({ projectId })

    if (user && projectToUpdate) {
      const guestToDelete =  Project.findByIdAndUpdate({_id: projectId}, {$pull: {guestList:{ _id: guestId } }});

      console.log("guestToDelete",guestToDelete)
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
)


/* DELETE the project from the project board */ //WORKS PERFECT
app.delete(
  '/:userId/project-board/projects/delete/:projectId',
  authenticateUser,
  async (req, res) => {
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
)

// ************ PROJECTBOARD ENDPOINTS *************** //


// ************ START SERVER *************** //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
