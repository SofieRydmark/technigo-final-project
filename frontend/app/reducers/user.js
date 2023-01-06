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
     //userProject: null,
     due_date: null
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
      console.log("setAllProjects", action)
      store.all = action.payload
    }, 

    setNewProject: (store, action) => {
        console.log('projectName', action)
        store.newProject = action.payload
    },
    setDueDate: (store, action) => {
        console.log("due_date", action)
        store.due_date = action.payload
    },
  },
},
)

export const fetchProjects = (accessToken) => {
  // const [allProjects, setAllProjects] = useState([])
  return ({  dispatch, getState, userId }) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/63b489f60b16576ee3a8c5f7/project-board/projects`, options)
    .then ((res) => res.json())
    .then((json) => dispatch(project.actions.setAllProjects(json.response)))
    .catch((error) => console.log(error))
    // console.log("data", allProjects)
  }


}
// export const addProject = () => {
//   return({getState, dispatch, userId}) => {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//          Authorization: accessToken,
//       },
//        body: JSON.stringify({
//         name: '',
//         due_date: ''
//         }),
//       }
//     fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/63b489f60b16576ee3a8c5f7/project-board/projects/addProject`, options)
//     .then ((res) => res.json())
//     .then((json) => dispatch(setNewProject(json.project.)))
//     .catch((error) => console.log(error))
//     console.log("data", addProject)
//   }



// }

export default user

