import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'
import { useRoute } from '@react-navigation/native'

//colors and reducer
import colors from '../../config/colors'
import user from '../../reducers/user'

// import { fetchProjects } from '../../reducers/user' /* needed with thunks */

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
  const [allProjects, setAllProjects] = useState([])
  const dispatch = useDispatch()
  console.log('useSelectorProject', allProjects)

  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  /* --- GET ALL PROJECTS FETCH--*/

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllProjects(data.response))
      .catch((error) => console.log(error))
    console.log('data', allProjects)
  }, [])

  /* --- ADD NEW PROJECT FETCH  --*/

  const addNewProject = (values) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name: values.name, // values comes from Formik
        due_date: values.due_date,
      }),
    }
    fetch(
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addProject`,
      options
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  /*--- DELETE PROJECT ---*/

  const deleteProject = (projectId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ _id: projectId }),
    }
    fetch(
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/delete/${projectId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      {accessToken && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Hej, {email}, välkomna till din projektsida!!</Text>
          </View>
          <View style={styles.form}>
            <Formik
              initialValues={{ name: '', due_date: '' }}
              onSubmit={(values, actions) => {
                if (values.name === '' || values.due_date === '') {
                  return setLoginError('Please fill the name')
                } else {
                  addNewProject(values)
                  actions.resetForm()
                }
              }}>
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.input}>
                  <TextInput
                    label='name'
                    onChangeText={handleChange('name')}
                    value={values.name}
                    placeholder={'Projekt namn'}
                    required
                    multiline={false}
                    autoCapitalize='none'
                    maxLength={20}
                  />
                  <TextInput
                    label='due_date'
                    onChangeText={handleChange('due_date')}
                    value={values.due_date}
                    placeholder={'Datum: YYYY-MM-DD'}
                    multiline={false}
                    autoCapitalize='none'
                  />

                  <TouchableOpacity style={styles.addProjectButton} onPress={handleSubmit}>
                    <Text>NYTT PROJEKT</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View>
              {allProjects.map((singleProject) => {
                return (
                  <>
                    <View key={singleProject._id} style={styles.listWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('SingleProjectPage', { projectId: singleProject._id })
                        }}>
                        <Text style={styles.row}>{singleProject.due_date}</Text>
                        <Text style={styles.row}>{singleProject.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )
              })}
            </View>
            <TouchableOpacity onPress={logout}>
              <Text>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FindStore')}>
              <Text>Find store</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
    paddingVertical: 60,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },

  listWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    margin: 2,
  },
  // sigle item styling
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  // maping + formik with white background
  form: {
    borderRadius: 10,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  // add new project input + button styling
  addProjectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
    width: '100%',
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },

  input: {
    marginBottom: 10,
    padding: 25,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 12,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },

  //delete icon styling
  trashIcon: {
    color: colors.red,
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
})

export default ProjectBoard
