import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native'

// Assets import
import { GuestListStyles } from 'components/ProjectStyling/BudgetStoreGuestList.styling'
import { Ionicons } from '@expo/vector-icons'
import { BASE_URL } from '@env'

// Reducers
import { ui } from '../../reducers/ui'

const GuestList = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const projectId = route.params.projectId
  const userId = useSelector((store) => store.user.userId)
  const dispatch = useDispatch()
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
        guestName: guestName,
        phone: phone,
      }),
    }
    fetch(
      `${BASE_URL}/${userId}/project-board/projects/addGuest/${projectId}`,
      options
    )
      .then((res) => res.json())
      .catch((error) => console.error(error))
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
        },
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
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
            `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteGuest/${guestId}`,
            options
          )
            .then((res) => res.json())
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
      GuestListStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      GuestListStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <SafeAreaView
      style={GuestListStyles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={GuestListStyles.wrapper}>
        <Text style={GuestListStyles.headerH1}>Guest list</Text>
      </View>
      <View style={[GuestListStyles.form, GuestListStyles.boxShadow]}>
        <View style={GuestListStyles.input}>
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
            style={[GuestListStyles.addGuestButton, GuestListStyles.boxShadow]}
            onPress={handleCreate}>
            <Ionicons name='add' size={35} color='black' />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            style={GuestListStyles.flatList}
            data={project.guestList}
            renderItem={({ item }) => (
              <View style={GuestListStyles.listWrapper}>
                <Text style={GuestListStyles.row}>{item.guestName}</Text>
                <Text style={GuestListStyles.row}>{item.phone}</Text>

                <TouchableOpacity style={GuestListStyles.trashIcon} onPress={() => handleDelete(item._id)}>
                  <Text style={GuestListStyles.row}>🗑</Text>
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

export default GuestList
