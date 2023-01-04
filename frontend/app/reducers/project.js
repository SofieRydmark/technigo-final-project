import { createSlice } from '@reduxjs/toolkit'

export const project = createSlice({
  name: 'project',
  initialState: {
    name: null,
    userProject: null,
    due_date: null,
    guestList: null,
    themeProjectList: null, 
    decorationsProjectList: null, 
    foodProjectList: null,
    drinksProjectList: null,
    activitiesProjectList:  null, 
    budgetList: null,
    error: null,
    _id: null, 
  },
  reducers: {
    setProjectName: (store, action) => {
        console.log('projectName', action)
        store.name = action.payload
    },
    setDueDate: (store, action) => {
        console.log("due_date", action)
        store.due_date = action.payload
    },
    setProjectId: (store,action) => {
        console.log('projectId', action)
        store._id = action.payload
    }
  },
})