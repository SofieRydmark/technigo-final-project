import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (store, actions) => {
      store.isLoading = actions.payload
    },
  },
})
