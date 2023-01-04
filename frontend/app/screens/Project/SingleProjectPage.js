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
  SafeAreaView,
} from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'

const SingleProjectPage = ({ navigation /* projectId */ }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()
  const [singleProject, setSingleProject] = useState([])
  const userId = useSelector((store) => store.user.userId)

console.log('user', userId)

  const getSingleProject = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9`, options)
      .then((res) => res.json())
      .then((data) => setSingleProject(data.data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getSingleProject()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Single Project</Text>
        {singleProject.map((item) =>{
          return (
            <View key={item._id}>
              <Text>{item.name}</Text>
            </View>
          )
        })}
      
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Back to projectBoard</Text>
        </TouchableOpacity>
      </View>
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
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
})
export default SingleProjectPage
