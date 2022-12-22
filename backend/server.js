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
import { UpdateProjectName, addNewGuest, deleteGuest } from './endpoints/UpdateProject'
import { deleteProject } from './endpoints/DeleteProject'
import { addActivity, addDecorations, addDrinks, addFood, addTheme/* , deleteObject */ } from './endpoints/AddObject'
import { DeleteActivity, DeleteDecoration, DeleteDrink, DeleteFood, DeleteTheme } from './endpoints/DeleteObject'
import { ToggleActivity, ToggleDecoration, ToggleDrinks, ToggleFood, ToggleTheme } from './endpoints/ToggleCompleted'

const Food = require('../backend/models/Food')
const Decoration = require('../backend/models/Decorations')
const Activity = require('../backend/models/Activity')
const Drink = require('../backend/models/Drink')
const Theme = require('../backend/models/Theme')
/* const Project = require('../backend/models/Project')
const User = require('../backend/models/User') */

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

/* change name and due date in single project and add guests to guest list */
app.patch('/:userId/project-board/projects/change/:projectId', authenticateUser, UpdateProjectName)
app.post('/:userId/project-board/projects/addGuest/:projectId', authenticateUser, addNewGuest)

// ************ ADD OBJECTS TO YOUR PROJECT*************** //
app.post('/:userId/project-board/projects/addTheme/:projectId', authenticateUser, addTheme)
app.patch('/:userId/project-board/projects/addDrinks/:projectId', authenticateUser, addDrinks)
app.patch('/:userId/project-board/projects/addFood/:projectId', authenticateUser, addFood)
app.patch('/:userId/project-board/projects/addDecoration/:projectId', authenticateUser, addDecorations)
app.patch('/:userId/project-board/projects/addActivity/:projectId', authenticateUser, addActivity)

// ************ DELETE OBJECT FROM YOUR PROJECT *************** //
app.delete('/:userId/project-board/projects/:projectId/deleteTheme/:themeId', authenticateUser, DeleteTheme ) 
app.delete('/:userId/project-board/projects/:projectId/deleteDrink/:drinksId', authenticateUser, DeleteDrink ) 
app.delete('/:userId/project-board/projects/:projectId/deleteFood/:foodId', authenticateUser, DeleteFood ) 
app.delete('/:userId/project-board/projects/:projectId/deleteActivity/:activityId', authenticateUser, DeleteActivity ) 
app.delete('/:userId/project-board/projects/:projectId/deleteDecoration/:decorationId', authenticateUser, DeleteDecoration )

// ************ TOGGLE COMPLETED FOR OBJECT *************** //

app.patch('/:userId/project-board/projects/:projectId/completed/drink/:drinksId', authenticateUser, ToggleDrinks)
app.patch('/:userId/project-board/projects/:projectId/completed/food/:foodId', authenticateUser, ToggleFood)
app.patch('/:userId/project-board/projects/:projectId/completed/decoration/:decorationId', authenticateUser, ToggleDecoration)
app.patch('/:userId/project-board/projects/:projectId/completed/activity/:activityId', authenticateUser, ToggleActivity)
app.patch('/:userId/project-board/projects/:projectId/completed/theme/:themeId', authenticateUser, ToggleTheme)

// ************ DELETE PROJECT *************** //
app.delete('/:userId/project-board/projects/delete/:projectId',authenticateUser, deleteProject)

// ************ DELETE GUEST FROM GUEST LIST *************** //
app.delete('/:userId/project-board/projects/:projectId/deleteGuest/:guestId', authenticateUser, deleteGuest)


// ************ START SERVER *************** //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
