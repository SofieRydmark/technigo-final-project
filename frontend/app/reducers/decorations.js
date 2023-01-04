import { createSlice} from "@reduxjs/toolkit";

const themeProject = createSlice({
    name: 'theme', 
    initialState: {
        userId: null, 
        accessToken: null, 
        name: null, 
        projectId: null,  
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
          setName: (store, action) => {
            console.log('nameTheme', action)
            store.name = action.payload
          }, 
          setProjectId: (store, action) => {
            console.log('projectId',action )
            store.projectId = action.payload
          }
    }
})

export default themeProject