import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    email: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      console.log('userid', action)
      store.userId = action.payload
    },
    setEmail: (store, action) => {
      console.log('email', action)
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      console.log('accestoken', action)
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      console.log('error', action)
      store.error = action.payload
    },
  },
})

export default user




/* export const project = createSlice({
  name: 'project',
  initialState: {
    all: null
    // name: null,
    // userProject: null,
    // due_date: null
  //   guestList: {},
  //   themeProjectList: {}, 
  //   decorationsProjectList: {}, 
  //   foodProjectList: null,
  //   drinksProjectList: null,
  //   activitiesProjectList:  null, 
  //   budgetList: null,
  //   error: null,
   },
  reducers: {
    setAllProjects: (store, action) => {
      store.all = action.payload
    }, 

    setProjectName: (store, action) => {
        console.log('projectName', action)
        store.name = action.payload
    },
    setDueDate: (store, action) => {
        console.log("due_date", action)
        store.due_date = action.payload
    },
    setProjectId: (store, action) => {
      console.log('projectId', action)
      store._id = action.payload
    }
  },
},
) */

