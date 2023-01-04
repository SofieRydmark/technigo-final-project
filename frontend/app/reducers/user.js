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
       body: JSON.stringify(data)
      }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`, options)
    .then ((res) => res.json())
    .then((data) => setAllProjects(data))
    .catch((error) => console.log(error))
    console.log("data", data, allProjects)
  }


}
export const addProject = () => {
  return({getState, dispatch}) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
       body: JSON.stringify({
        name: getState().projects.name,
        due_date: getState().projects.due_date,
        userId: getState().user.userId
        }),
      }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`, options)
    .then ((res) => res.json())
    .then((data) => dispatch(setAllProjects(data)))
    .catch((error) => console.log(error))
    console.log("data", allProjects)
  }


}
export default user


