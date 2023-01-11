import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

// Formik
import { Formik } from 'formik'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { PROJECTS_URL, PROJECTS_ADD_URL, ONEPROJECT_DELETE_URL } from 'assets/urls/urls'

// Reducers
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
  const [allProjects, setAllProjects] = useState([])
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()
  const [calendarVisible, setCalendarVisible] = useState(false)

  /* --- GET ALL PROJECTS FETCH--*/
  useEffect(() => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(PROJECTS_URL(userId), options)
      .then((res) => res.json())
      .then((data) => setAllProjects(data.response))
      .catch((error) => console.log(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    // console.log('data', allProjects)
  }, [allProjects])

  /* --- ADD NEW PROJECT FETCH  --*/

  const addNewProject = (values) => {
    dispatch(ui.actions.setLoading(true))
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
      .catch((error) => setLoginError(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  /*--- DELETE PROJECT ---*/

  const deleteProject = (projectId) => {
    dispatch(ui.actions.setLoading(true))
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
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      styles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Hi, {email}, Welcome to your project board</Text>
      </View>
      <View style={[styles.form, styles.boxShadow]}>
        <Formik
          initialValues={{ name: '', due_date: '' }}
          onSubmit={(values, actions) => {
            if (values.name === '') {
              setLoginError('Please fill out the name')
            } else if (values.due_date === '') {
              setLoginError('Please fill the date')
            } else if (values.name.length <= 5) {
              setLoginError('Name too short, min 5 characters')
            } else {
              addNewProject(values)
              setLoginError(null)
              actions.resetForm()
            }
          }}>
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.input}>
              <TextInput
                label='name'
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder={'Project name'}
                required
                multiline={false}
                autoCapitalize='none'
                maxLength={20}
                style={styles.inputText}
              />
              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

              <Modal visible={calendarVisible} animationType={'slide'}>
                <View style={styles.calendar}>
                  <CalendarPicker
                    onDateChange={(date) =>
                      handleChange('due_date')(date.toISOString().slice(0, 10))
                    }
                    style={styles.calendar}
                    minDate={new Date()}
                  />
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => setCalendarVisible(false)}>
                    <Text style={styles.doneButtonText}>CHOOSE</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <TouchableOpacity
                onPress={() => {
                  setCalendarVisible(true)
                }}>
                <Text style={values.due_date ? styles.chosenDateText : styles.defaultDateText}>
                  {values.due_date ? values.due_date : 'YYYY-MM-DD'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.addProjectButton, styles.boxShadow]}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>New Project</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View>
          {allProjects.map((singleProject) => {
            return (
              <View key={singleProject._id}>
                <View style={styles.listWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SingleProjectPage', { projectId: singleProject._id })
                    }}>
                    <Text style={styles.row}>{singleProject.due_date}</Text>
                    <Text style={styles.row}>{singleProject.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.trashIcon}
                    onPress={() => deleteProject(singleProject._id)}>
                    <Text style={styles.row}>🗑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
          <View style={styles.findContainer}>
            <TouchableOpacity
              style={[styles.findStoreButton, styles.boxShadow]}
              onPress={() => {
                navigation.navigate('FindStore')
              }}>
              <Text style={styles.buttonText}>Find Store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.green,
    alignItems: 'center',
    paddingVertical: 60,
    paddingBottom: 100,
  },
  header: {
    marginTop: 30,
    marginBottom: 30,
  },
  headerH1: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.titles,
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
  // single item styling
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontFamily: fonts.text,
  },
  // maping + formik with white background
  form: {
    borderRadius: 10,
    padding: 25,
    width: '90%',
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
  findStoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
    width: '50%',
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  findContainer: {
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 10,
  },
  inputText: {
    fontFamily: fonts.input,
    fontSize: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: fonts.button,
  },
  calendar: {
    flex: 1,
    paddingTop: 100,
    fontFamily: fonts.text,
    backgroundColor: colors.green,
    alignItems: 'center',
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    textAlign: 'center',
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  doneButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.button,
  },
  defaultDateText: {
    fontFamily: fonts.input,
    fontWeight: 'bold',
  },
  chosenDateText: {
    fontFamily: fonts.input,
  },
  errorText: {
    fontFamily: fonts.text,
    color: 'red',
  },
})

export default ProjectBoard
