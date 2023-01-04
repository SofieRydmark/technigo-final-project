import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  Button,
  Image,
  FlatList,
} from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'

const Activities = ({route, navigation}) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
  const dispatch = useDispatch()
  const [allActivities, setAllActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const partyType= route.params.partyType

  const logout = () => {
    console.log('logged out')
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate('SignIn')
    }
  }, [accessToken])

  const getAllActivities = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/activities/type/${partyType}`, options)
      .then((res) => res.json())
      .then((data) => setAllActivities(data.response))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllActivities()
  }, [])

  /****************** SEND OBJECT TO SINGLE PROJECT  ************************* */
  const sendObjectToProject = (name) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
           activitiesName: name,
      }),
    };
    console.log('name', name)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addActivity/63b58581b9761f6338902ec9`, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  console.log('Activity send',sendObjectToProject)


  return (
    <>
      <ScrollView contentContainerStyle={styles.background}>
        <TextInput
          style={styles.input}
          placeholder='Search for a theme...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <FlatList
          data={allActivities.filter((Activity) =>
            Activity.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>
              <Text>{item.name}</Text>
              <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text> Hello themes</Text>

        <TouchableOpacity onPress={logout}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 50,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
})

export default Activities
