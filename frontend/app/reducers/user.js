import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: '',
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

export const project = createSlice({
  name: 'project',
  initialState: {
    name: '',
    userProject: null,
    due_date: '',
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
    setProjectName: (store, action) => {
        console.log('projectName', action)
        store.name = action.payload
    },
    setDueDate: (store, action) => {
        console.log("due_date", action)
        store.due_date = action.payload
    },
  },
},
)

export const fetchProjects = ({name, due_date, userId}) => {
  const [allProjects, setAllProjects] = useState([])
  return({getState}) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
       body: JSON.stringify({
        name: getState().project.name,
        userId: getState().user.userId
        }),
      }
    fetch(`http://localhost:8080/${userId}/project-board/projects`, options)
    .then ((res) => res.json())
    .then((data) => setAllProjects(data.response))
    .catch((error) => console.log(error))
    console.log("data", data)
  }

  

}
export default user


