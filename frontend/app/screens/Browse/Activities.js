import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'

// Assets import
import { ActivitiesStyles } from 'components/BrowseStyling/ActivitiesScreen.styling'
import { ACTIVITY_ADD_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

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
    backgroundStyle = ActivitiesStyles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = ActivitiesStyles.kidsBackground
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
      `${BASE_URL}/activities/${page}/type/${partyType}`,
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
      ActivitiesStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ActivitiesStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <SafeAreaView
      style={[ActivitiesStyles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={ActivitiesStyles.container}>
        <Text style={ActivitiesStyles.h1}>Activities</Text>

        <TextInput
          style={ActivitiesStyles.input}
          placeholder='Search for an activity...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <FlatList
          style={ActivitiesStyles.flatList}
          data={allActivities.filter((active) =>
            active.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={({ item }) => (
            <View style={ActivitiesStyles.item}>
              <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>
                <Image
                  source={{ uri: item.image }}
                  style={[
                    ActivitiesStyles.image,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                  ]}
                />
                <View
                  style={[
                    ActivitiesStyles.itemNameContainer,
                    ActivitiesStyles.boxShadow,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                  ]}>
                  <Text style={ActivitiesStyles.itemName}>{item.name}</Text>
                  <Ionicons style={ActivitiesStyles.plusIcone} name='add' size={30} color='black' />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <View style={ActivitiesStyles.arrows}>
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

export default Activities
