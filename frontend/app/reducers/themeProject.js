import { createSlice} from "@reduxjs/toolkit";

const themeProject = createSlice({
    name: 'themeName', 
    initialState: {
        items: [],
        error: null,  
    }, 
    reducers: {
        setAccessToken: (store, action) => {
            console.log('accestoken', action)
            store.accessToken = action.payload
          }, 
          setUserId: (store, action) => {
            console.log('userid', action)
            store.userId = action.payload
          }, 
          setDecorationsName: (store, action) => {
            console.log('nameTheme', action)
            store.name = action.payload
          }, 
          setProjectId: (store, action) => {
            console.log('projectId',action )
            store.projectId = action.payload
          }, 
          set_Id: (store, action) => {
            store._id = action.payload
          }, 
          setIsCompleted: (store, action) => {
            store.isCompleted = action.payload
          }, 
    }
})

export default themeProject