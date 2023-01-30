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
      store.userId = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export const project = createSlice({
  name: 'project',
  initialState: {
    all: {},
    name: null,
    due_date: null,
  },
  reducers: {
    setAllProjects: (store, action) => {
      console.log('setAllProjects', action)
      store.all = action.payload
    },
    setDueDate: (store, action) => {
      console.log('due_date', action)
      store.due_date = action.payload
    },
  },
})

export default user
