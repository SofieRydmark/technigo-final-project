import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import { PARTYTYPE_THEME_URL, THEME_ADD_URL } from 'assets/urls/urls'

// Reducers
import user from '../../reducers/user'

const Themes = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [objectSent, setObjectSent] = useState([])
  const [allThemes, setAllThemes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [themeSelected, setThemeSelected] = useState([])
  const partyType = route.params.partyType
  const projectId = route.params.projectId

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

  const getAllThemes = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(PARTYTYPE_THEME_URL(partyType), options)
      .then((res) => res.json())
      .then((data) => setAllThemes(data.response))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllThemes()
  }, [])

  /****************** SEND OBJECT TO SINGLE PROJECT  ************************* */
  const sendObjectToProject = (name) => {
    if (themeSelected[name]) {
      // check if theme has already been selected
      // show alert or warning message
      return
    }
    setThemeSelected({ ...themeSelected, [name]: true }) // update themeSelected state

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        themesName: name,
      }),
    }

    fetch(THEME_ADD_URL(userId, projectId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
  }

  const buttonIcon = require('assets/images/addCircle.png')

  return (
    <SafeAreaView
      style={[styles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.h1}>Themes</Text>
      <TextInput
        style={styles.input}
        placeholder='Search for a theme...'
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        style={styles.flatList}
        data={allThemes.filter((theme) =>
          theme.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        numColumns={2}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>
              <Image source={{ uri: item.image }} style={{ width: 110, height: 110 }} />
              <View style={styles.itemNameContainer}>
                <View style={styles.itemNameBackground}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <View
                  style={[
                    styles.addButtonCircle,
                    objectSent.includes(item.name) ? { backgroundColor: colors.peach } : null,
                  ]}>
                  <Image source={buttonIcon} style={styles.addButton} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  grownupBackground: {
    backgroundColor: colors.green,
  },
  kidsBackground: {
    backgroundColor: colors.peach,
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
  flatList: {
    flex: 0.9,
    alignSelf: 'center',
  },
  h1: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    margin: 10,
    width: 110,
    height: 110,
  },
  itemNameContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNameBackground: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButtonCircle: {
    position: 'absolute',
    zIndex: 1,
    top: -13,
    right: -13,
    width: 25,
    height: 25,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 20,
    height: 20,
  },
})

export default Themes
