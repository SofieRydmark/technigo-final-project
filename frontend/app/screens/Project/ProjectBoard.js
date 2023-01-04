import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity,  FlatList, SafeAreaView } from 'react-native'

//colors and reducer
import colors from '../../config/colors'
import user from '../../reducers/user'
import { fetchProjects } from '../../reducers/user'

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
    const [allProjects, setAllProjects] = useState([])
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

    /* Thinks we need on project board:
  - fetch all projects from DB (GET)
  - add new project (POST)
  - remove project  (DELETE) */

  const getAllProject = (/*{name, due_date, userId}*/) => {
    return (
      fetchProjects()
    )

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: accessToken,
    //   },
    //    body: JSON.stringify({ name: name, due_date: due_date }),
    // }
    // fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`, options)
    //   .then ((res) => res.json())
    //   .then((data) => setAllProjects(data.response))
    //   .catch((error) => console.log(error))
    //   console.log("data", allProjects)
    }

    // useEffect (() => {
    //   getAllProject()
    // }, [] )

  return (
    <SafeAreaView contentContainerStyle={styles.background}>
      {accessToken && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Hello {email}, this is your projectboard</Text>
          </View>
          <View>
            <FlatList
              data={projects}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.item}>{item.name}</Text>
                  <Text>{item.due_date}</Text>
            
          
               </View>
          )}
          keyExtractor={(item) => item._id}
          />
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
    </SafeAreaView>
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
})
export default ProjectBoard
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

//colors and reducer
import colors from '../../config/colors'
import user from '../../reducers/user'

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      {accessToken && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Hello {email}, this is your projectboard</Text>
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
})
export default ProjectBoard
