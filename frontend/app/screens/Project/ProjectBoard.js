import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

// Formik
import { Formik } from 'formik'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { PROJECTS_URL } from 'assets/urls/urls'
import { MaterialIcons, AntDesign, Octicons, Ionicons } from '@expo/vector-icons'

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

  // *** GET ALL PROJECTS FETCH *** //
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

  // *** ADD NEW PROJECT FETCH *** //

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
      .catch((error) => setLoginError(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  // *** DELETE PROJECT *** //

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
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
  // *** BOX SHADOW STYLING FUNCTION IOS & ANDROID *** //
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
    <SafeAreaView
      style={styles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.headerH1}>Projectboard</Text>
      <Text style={styles.headerH2}>{email}</Text>
      <View style={styles.container}>
        <Text style={styles.projectListH3}>Add new</Text>
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
                  placeholder={'Name'}
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
                      <Text style={styles.doneButtonText}>Add date</Text>
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
                  <Ionicons name='add' size={35} color='black' />
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        <Text style={styles.projectListH3}>All projects</Text>
        <FlatList
          style={styles.flatList}
          data={allProjects}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SingleProjectPage', { projectId: item._id })
                }}>
                <View style={styles.editIcon}>
                  <MaterialIcons name='edit' size={20} color={colors.darkGrey} />
                </View>
                <View styles={styles.itemInfo}>
                  <Text style={styles.row1}>{item.name}</Text>
                  <Text style={styles.row2}>{item.due_date}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.trashIcon}>
                <TouchableOpacity onPress={() => deleteProject(item._id)}>
                  <Text>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />

        <TouchableOpacity
          style={[styles.findStoreButton, styles.boxShadow]}
          onPress={() => {
            navigation.navigate('FindStore')
          }}>
          <Text style={styles.buttonText}>Find Store</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  headerH1: {
    marginTop: 80,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: fonts.titles,
  },
  headerH2: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: fonts.text,
    textTransform: 'uppercase',
    color: colors.darkGrey,
    textAlign: 'center',
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
  projectListH3: {
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    fontFamily: fonts.text,
    color: colors.darkGrey,
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  // single item styling
  flatList: {
    width: '90%',
  },
  listItem: {
    borderRadius: 10,
    marginBottom: 10,
    paddingTop: -10,
    paddingBottom: 20,
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row1: {
    paddingLeft: 12,
    fontSize: 18,
    fontFamily: fonts.text,
  },
  row2: {
    paddingLeft: 12,
    fontSize: 16,
    fontFamily: fonts.text,
  },
  // maping + formik with white background
  form: {
    paddingHorizontal: 15,
    width: '100%',
  },
  // add new project input + button styling
  addProjectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    top: -20,
    right: 5,
    marginTop: -20,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: colors.peach,
  },
  input: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  //icon styling
  trashIcon: {
    right: -20,
    top: 10,
  },
  editIcon: {
    left: -20,
    top: '45%',
  },
  findStoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: '50%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  inputText: {
    fontFamily: fonts.input,
    fontSize: 17,
    top: 10,
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 17,
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
    fontSize: 17,
  },
  chosenDateText: {
    fontFamily: fonts.input,
    fontSize: 17,
  },
  errorText: {
    fontFamily: fonts.text,
    color: 'red',
  },
})

export default ProjectBoard
