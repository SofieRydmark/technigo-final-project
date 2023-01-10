import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
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
  const buttonIcon = require('assets/images/addCircle.png')
  const [page, setPage] = useState(0)
  let limit = 5

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
    fetch(
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/themes/type/${partyType}/${page}/5`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllThemes([...data.response]))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllThemes()
  }, [])

  const nextPage = () => {
    setPage(page + 1)
  }

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

  return (
    <ScrollView
      style={[styles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.h1}>Themes</Text>
      <TextInput
        style={styles.input}
        placeholder='Search for a theme...'
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <Text style={styles.currentPageTxt}>{page}</Text>
      <TouchableOpacity style={styles.nextPageWrapper} onPress={nextPage}>
        <Text style={styles.nextPageTxt}>next</Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        {allThemes
          .filter((theme) => theme.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item) => (
            <View style={styles.smallContainer} key={item.name}>
              <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>
                <Image source={{ uri: item.image }} style={styles.buttonImage} />
                <View style={styles.itemNameContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <View
                  style={[
                    styles.addButtonCircle,
                    objectSent.includes(item.name) ? { backgroundColor: colors.peach } : null,
                  ]}>
                  <Image source={buttonIcon} style={styles.addButton} />
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  grownupBackground: {
    backgroundColor: colors.green,
  },
  kidsBackground: {
    backgroundColor: colors.peach,
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
  h1: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: 'bold',
  },
  addButtonCircle: {
    position: 'absolute',
    zIndex: 99,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 30,
    height: 30,
  },
  buttonImage: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 8,
  },
  smallContainer: {
    width: '50%',
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemNameContainer: {
    borderRadius: 8,
    zIndex: 99,
    top: '-50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 70,
    margin: 16,
  },
  nextPage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextPageTxt: {
    fontSize: 20,
  },
  currentPageTxt: {
    fontSize: 20,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.titles,
  },
})

export default Themes
