import {React, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'

//colors and reducer
import colors from '../../config/colors'
import user from '../../reducers/user'
// import { fetchProjects } from '../../reducers/user' /* needed with thunks */

const ProjectBoard = ({ route,navigation, _id,}) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
  const projectId = route.params.projectId
  console.log("projectId", projectId)

  /*--- FINDING PROJECTID USING REDUX--- */
  
  // const { projectId } = match.params

  // const project = useSelector((store) =>
  //   store.user.find(project => project.id === projectId)
  // )

  // if (!project) {
  //   return (
  //     console.log("project not found")
  //   )
  // }
  // const projectId = useSelector((store) => store.user.projectId)

  const [allProjects, setAllProjects] = useState([])
  const dispatch = useDispatch()
  console.log("useSelectorProject", allProjects)


  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  /* Thinks we need on project board:
  - remove project  (DELETE) */

  // dispatch(fetchProjects(accessToken)) // CODE NEEDED WITH THUNKS

  /* --- GET ALL PROJECTS FETCH--*/
  
    useEffect (() => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      }
      fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`, options)
        .then ((res) => res.json())
        .then((data) => setAllProjects(data.response))
        .catch((error) => console.log(error))
        console.log("data", allProjects)
    }, [] )

      /* --- ADD NEW PROJECT FETCH  --*/
    
    const addNewProject = ( values) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: accessToken,
        },
         body: JSON.stringify({
          name: values.name,  // values comes from Formik
          due_date: values.due_date
          }),
        }
        fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addProject`, options)
        .then ((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))

    }

    /*--- DELETE PROJECT ---*/

    const deleteProject = (name) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify({
          projectName: name,  
          _id: projectId,
        }),
      };
      console.log('id', projectId)
      fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/delete/${projectId}`, options)
        .then((res) => res.json())
         .then((data) => console.log(data))
         .catch((error) => console.error(error));
    

    }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      {accessToken && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Hello {email}, this is your projectboard</Text>
          </View>
          <Formik
          initialValues={{ name: '', due_date: ''}}
          onSubmit={(values, actions) => {
            if (values.name === '' || values.due_date === '') {
              return setLoginError('Please fill the name') 
            } else {
              addNewProject(values)
              actions.resetForm()
            }
            }}>
             {({  handleChange, handleSubmit, values }) => (
          <View>
                <TextInput  style={{ height: 40, width: 100 }}
                label = 'name'
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder={"project name"}
                required
                multiline={false}
                autoCapitalize = 'none'
            />
            <TextInput style={{ height: 40, width: 100 }}
                label = 'due_date'
                onChangeText={handleChange('due_date')}
                value={values.due_date}
                placeholder={"YYYY-MM-DD"}
                multiline={false}
                autoCapitalize = 'none'
            />
   
            <TouchableOpacity onPress={handleSubmit}>
              <Text>add Project</Text>
            </TouchableOpacity> 
          </View>
             )}
          </Formik>

          <View>
            {allProjects.map((singleProject) => {
              return(
                <>
                <View>
                  <Text key={_id} style={styles.item}>{singleProject.name}</Text>
                  <Text>{singleProject.due_date}</Text>
                  <TouchableOpacity onPress={() => deleteProject()}>
                      <Text>✖️</Text>
                  </TouchableOpacity>
                </View>
                </>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SingleProjectPage')}>
            <Text>Project</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('WhatKindOfParty')}>
            <Text>Brows Categories </Text>
         {/*  <TouchableOpacity onPress={() => navigation.navigate('BrowsingCategoriesPage')}>
            <Text>Browse Categories </Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
          }




const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
});


export default ProjectBoard