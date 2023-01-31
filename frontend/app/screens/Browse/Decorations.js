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
import { DecorStyles } from 'components/BrowseStyling/DecorationsScreen.styling'
import { DECOR_ADD_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'

const Decorations = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [allDecors, setAllDecors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [objectSent, setObjectSent] = useState([])
  const partyType = route.params.partyType
  const projectId = route.params.projectId

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = DecorStyles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = DecorStyles.kidsBackground
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
      `${BASE_URL}/decorations/${page}/type/${partyType}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllDecors(data.response))
      .then(setPage(page))
      .catch((error) => console.error(error))
  }, [page])

  const nextPage = () => {
    if (page === 9) {
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
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        decorationsName: name,
      }),
    }

    fetch(DECOR_ADD_URL(userId, projectId), options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
  }

  // Box shadow styling IOS and android
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
      DecorStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      DecorStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <SafeAreaView
      style={[DecorStyles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={DecorStyles.container}>
        <Text style={DecorStyles.h1}>Decorations</Text>

        <TextInput
          style={DecorStyles.input}
          placeholder='Search for a decoration...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <FlatList
          style={DecorStyles.flatList}
          data={allDecors.filter((decor) =>
            decor.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={({ item }) => (
            <View style={DecorStyles.item}>
              <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>

                <Image
                  source={{ uri: item.image }}
                  style={[
                    DecorStyles.image,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                  ]}
                />
                <View
                  style={[
                    DecorStyles.itemNameContainer,
                    DecorStyles.boxShadow,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                  ]}>
                  <Text style={DecorStyles.itemName}>{item.name}</Text>
                  <Ionicons style={DecorStyles.plusIcone} name='add' size={30} color='black' />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <View style={DecorStyles.arrows}>
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

export default Decorations
