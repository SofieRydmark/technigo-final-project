import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native'

// Formik and calender
import { Formik } from 'formik'
import CalendarPicker from 'react-native-calendar-picker'
import DatePicker from 'react-native-datepicker'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { PROJECTS_URL } from 'assets/urls/urls'
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
  const [allProjects, setAllProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const dispatch = useDispatch()

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
  }, [allProjects])

  // *** ADD NEW PROJECT FETCH *** //

  const addNewProject = () => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name: name,
        due_date: dueDate,
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
  generateBoxShadowStyle(-5, 3, '#171717', 0.2, 4, 6, '#171717')

  return (
    <SafeAreaView
      style={styles.background}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.headerH1}>Projectboard</Text>
      <Text style={styles.headerH2}>{email}</Text>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={[styles.findAddButton, styles.boxShadow]}>
        <Text style={styles.buttonText}>New project</Text>
        <Ionicons name='add' size={20} color='black' style={{ padding: 8 }} />
      </TouchableOpacity>

      <Modal animationType='slide' visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.calendar}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setShowModal(false)
              }}>
              <AntDesign name='close' size={25} color='black' />
            </TouchableOpacity>
            <CalendarPicker
              onDateChange={(date) => setDueDate(date.toISOString().slice(0, 10))}
              minDate={new Date()}
            />
          </View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder='Party name..'
            placeholderTextColor={colors.darkGrey}
            fontSize={18}
          />
          <TouchableOpacity
            style={styles.boxShadow}
            onPress={() => {
              addNewProject(dueDate, name)
              setShowModal(false)
              setName('')
            }}>
            <AntDesign
              name='checkcircle'
              size={50}
              color={colors.peach}
              style={{ marginTop: 30 }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={[styles.container, styles.boxShadow]}>
        <Text style={styles.projectListH3}>All projects</Text>
        <FlatList
          style={styles.flatList}
          data={allProjects}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SingleProjectPage', { projectId: item._id })
                  }}>
                  <MaterialIcons name='edit' size={20} color={colors.darkGrey} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SingleProjectPage', { projectId: item._id })
                  }}>
                  <Text style={styles.row1}>{item.name}</Text>
                  <Text style={styles.row2}>{item.due_date}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => deleteProject(item._id)}>
                <Text>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.findAddButton, styles.boxShadow]}
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
  closeBtn: {
    right: -150,
    top: -30,
  },
  calendar: {
    fontFamily: fonts.text,
    backgroundColor: colors.green,
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
  },
  headerH1: {
    marginTop: 50,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: fonts.titles,
  },
  headerH2: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.text,
    textTransform: 'uppercase',
    color: colors.darkGrey,
    textAlign: 'center',
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
    width: '95%',
    maxHeight: 330,
  },
  listItem: {
    borderRadius: 10,
    margin: 5,
    padding: 18,
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
  // add new project input + button styling
  input: {
    backgroundColor: colors.white,
    margin: 20,
    borderWidth: 1,
    padding: 20,
    borderRadius: 12,
    width: 250,
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
  },
  findAddButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
    width: '50%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.button,
  },
  calendar: {
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
  errorText: {
    fontFamily: fonts.text,
    color: 'red',
  },
})

export default ProjectBoard
