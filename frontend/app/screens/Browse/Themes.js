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
import fonts from 'assets/styling/fonts.js'
import { PARTYTYPE_THEME_URL, THEME_ADD_URL } from 'assets/urls/urls'
import { AntDesign, Ionicons } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'

const Themes = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [objectSent, setObjectSent] = useState('')
  const [allThemes, setAllThemes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [themeSelected, setThemeSelected] = useState([])
  const partyType = route.params.partyType
  const projectId = route.params.projectId

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/themes/${page}/type/${partyType}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllThemes(data.response))
      .then(setPage(page))
      .catch((error) => console.error(error))
  }, [page])

  const nextPage = () => {
    if (page === 13) {
      return
    }
    setPage(page + 1)
  }

  const prevPage = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1)
  }

  /****************** SEND OBJECT TO SINGLE PROJECT  ************************* */
  const sendObjectToProject = (name) => {
    if (themeSelected[name]) {
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
    <SafeAreaView
      style={[styles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.h1}>Themes</Text>
        <TextInput
          style={styles.input}
          placeholder='Search for a theme...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <View style={styles.arrows}>
          <TouchableOpacity onPress={prevPage}>
            <AntDesign name='leftcircle' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage}>
            <AntDesign name='rightcircle' size={24} color='black' />
          </TouchableOpacity>
        </View>
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
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                    objectSent.includes(item.name)
                      ? { borderColor: colors.peach, opacity: 0.5 }
                      : { borderColor: 'none' },
                  ]}
                />
                <View
                  style={[
                    styles.itemNameContainer,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                  ]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  arrows: {
    flexDirection: 'row',
    margin: 20,
  },
  input: {
    backgroundColor: colors.lightGrey,
    width: '80%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: fonts.text,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  flatList: {
    width: '90%',
    height: '100%',
  },
  h1: {
    marginBottom: 20,
    marginTop: 50,
    fontFamily: fonts.titles,
    fontSize: 30,
  },
  item: {
    width: '50%',
    marginBottom: -60,
    padding: 4,
  },
  itemNameContainer: {
    borderRadius: 8,
    zIndex: 99,
    top: '-50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 70,
    width: '80%',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 14,
    fontFamily: fonts.titles,
  },
  image: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 2,
  },
})

export default Themes
