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
