import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { Ionicons } from '@expo/vector-icons'
import { ONEPROJECT_URL } from 'assets/urls/urls'

// Reducers
import { ui } from '../../reducers/ui'

const GuestList = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const projectId = route.params.projectId
  const [allGuests, setAllGuests] = useState([])
  const userId = useSelector((store) => store.user.userId)
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()
  console.log('project id guest', projectId)
  const [project, setProject] = useState(route.params.project)
  const [guestName, setGuestName] = useState('')
  const [phone, setPhone] = useState('')

  // *** ADD NEW GUEST FETCH *** //
  const addNewGuest = (values) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        // guestName: values.guestName, // values comes from Formik
        // phone: values.phone,
        guestName: guestName,
        phone: phone,
      }),
    }
    fetch(
      `https:party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addGuest/${projectId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
  const handleCreate = () => {
    addNewGuest()
    setGuestName('')
    setPhone('')
    setProject((prev) => {
      return { ...prev, guestList: [...prev.guestList, { guestName, phone }] }
    })
  }

  // *** DELETE GUEST FROM THE LIST *** //
  const deleteGuest = (guestId) => {
    // pop up alert after clicking on trash can
    Alert.alert('Delete', 'Are you sure you wish to delete this guest?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed')
        },
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          console.log('deleting item')

          dispatch(ui.actions.setLoading(true))
          const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
            body: JSON.stringify({ _id: guestId }),
          }
          fetch(
            `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteGuest/${guestId}`,
            options
          )
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .finally(() => dispatch(ui.actions.setLoading(false)))
        },
      },
    ])
  }

  const handleDelete = (itemId) => {
    deleteGuest(itemId)
    setProject({ ...project, guestList: project.guestList.filter((item) => item._id !== itemId) })
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
      <View style={styles.wrapper}>
        <Text style={styles.headerH1}>Guest list</Text>
      </View>
      <View style={[styles.form, styles.boxShadow]}>
        <View style={styles.input}>
          <TextInput
            value={guestName}
            onChangeText={setGuestName}
            placeholder='Enter guest name'
            fontSize={18}
            required
          />
          <TextInput
            value={phone}
            fontSize={18}
            onChangeText={setPhone}
            placeholder='Enter phone number'
            required
          />

          <TouchableOpacity
            style={[styles.addGuestButton, styles.boxShadow]}
            onPress={handleCreate}>
            <Ionicons name='add' size={35} color='black' />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            style={styles.flatList}
            data={project.guestList}
            renderItem={({ item }) => (
              <View style={styles.listWrapper}>
                <Text style={styles.row}>{item.guestName}</Text>
                <Text style={styles.row}>{item.phone}</Text>

                <TouchableOpacity style={styles.trashIcon} onPress={() => handleDelete(item._id)}>
                  <Text style={styles.row}>🗑</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </SafeAreaView>
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
  headerH1: {
    marginTop: 50,
    fontSize: 30,
    fontFamily: fonts.titles,
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
  wrapper: {
    marginBottom: 30,
    marginTop: 20,
  },
  listWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    flexWrap: 'wrap',
    margin: 2,
  },
  // single item styling
  row: {
    padding: 15,
    fontSize: 20,
    fontFamily: fonts.text,
  },
  // maping + formik with white background
  form: {
    borderRadius: 10,
    padding: 30,
    width: '90%',
    backgroundColor: colors.white,
  },
  // add new guest input + button styling
  addGuestButton: {
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
    padding: 25,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    borderColor: 'transparent',
    backgroundColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  //delete icon styling
  trashIcon: {
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 1,
  },
})
export default GuestList
