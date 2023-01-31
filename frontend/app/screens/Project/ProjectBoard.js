import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors'
import { ProjectBoardStyles } from 'components/ProjectStyling/ProjectBoard.styling'
import CalendarPicker from 'react-native-calendar-picker'
import { PROJECTS_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
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
      .catch((error) => console.error(error))
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
      `${BASE_URL}/${userId}/project-board/projects/addProject`,
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
      `${BASE_URL}/${userId}/project-board/projects/delete/${projectId}`,
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
      ProjectBoardStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ProjectBoardStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-5, 3, '#171717', 0.2, 4, 6, '#171717')

  return (
    <SafeAreaView
      style={ProjectBoardStyles.background}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={ProjectBoardStyles.headerH1}>Project board</Text>
      <Text style={ProjectBoardStyles.headerH2}>{email}</Text>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={[ProjectBoardStyles.findAddButton, ProjectBoardStyles.boxShadow]}>
        <Text style={ProjectBoardStyles.buttonText}>New project</Text>
        <Ionicons name='add' size={20} color='black' style={{ padding: 8 }} />
      </TouchableOpacity>

      <Modal animationType='slide' visible={showModal}>
        <View style={ProjectBoardStyles.modalContainer}>
          <View style={ProjectBoardStyles.calendar}>
            <TouchableOpacity
              style={ProjectBoardStyles.closeBtn}
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
            style={ProjectBoardStyles.input}
            value={name}
            onChangeText={setName}
            placeholder='Party name..'
            placeholderTextColor={colors.darkGrey}
            fontSize={18}
          />
          <TouchableOpacity
            style={ProjectBoardStyles.boxShadow}
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

      <View style={[ProjectBoardStyles.container, ProjectBoardStyles.boxShadow]}>
        <Text style={ProjectBoardStyles.projectListH3}>All projects</Text>
        <FlatList
          style={ProjectBoardStyles.flatList}
          data={allProjects}
          renderItem={({ item }) => (
            <View style={ProjectBoardStyles.listItem}>
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
                  <Text style={ProjectBoardStyles.row1}>{item.name}</Text>
                  <Text style={ProjectBoardStyles.row2}>{item.due_date}</Text>
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
          style={[ProjectBoardStyles.findAddButton, ProjectBoardStyles.boxShadow]}
          onPress={() => {
            navigation.navigate('FindStore')
          }}>
          <Text style={ProjectBoardStyles.buttonText}>Find Store</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProjectBoard
