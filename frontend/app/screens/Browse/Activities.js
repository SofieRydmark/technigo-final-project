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
import { ACTIVITY_ADD_URL } from 'assets/urls/urls'
import { SimpleLineIcons } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'

const Activities = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [allActivities, setAllActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [objectSent, setObjectSent] = useState([])
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
      `https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/activities/${page}/type/${partyType}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllActivities(data.response))
      .then(setPage(page))
      .catch((error) => console.error(error))
  }, [page])

  const nextPage = () => {
    if (page === 5) {
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

  // *** SEND OBJECT TO SINGLE PROJECT  *** //
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
    }

    fetch(ACTIVITY_ADD_URL(userId, projectId), options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
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
      style={[styles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.h1}>Activities</Text>

        <TextInput
          style={styles.input}
          placeholder='Search for an activity...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <FlatList
          style={styles.flatList}
          data={allActivities.filter((active) =>
            active.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                  ]}
                />
                <View
                  style={[
                    styles.itemNameContainer,
                    styles.boxShadow,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                  ]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <View style={styles.arrows}>
          <TouchableOpacity onPress={prevPage} style={{ paddingRight: 60 }}>
            <SimpleLineIcons name='arrow-left' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage}>
            <SimpleLineIcons name='arrow-right' size={24} color='black' />
          </TouchableOpacity>
        </View>
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
  },
  input: {
    backgroundColor: colors.lightGrey,
    width: '85%',
    marginBottom: 5,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  flatList: {
    width: '90%',
    marginVertical: 30,
  },
  h1: {
    marginBottom: 20,
    marginTop: 60,
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
    textTransform: 'capitalize',
  },
  image: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    borderRadius: 8,
  },
})

export default Activities
