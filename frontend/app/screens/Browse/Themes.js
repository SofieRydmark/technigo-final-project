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
  Modal,
} from 'react-native'

// Assets import
import { ThemeStyles } from 'components/BrowseStyling/ThemeScreen.styling'
import { THEME_ADD_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'

const Themes = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [objectSent, setObjectSent] = useState('')
  const [allThemes, setAllThemes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [themeSelected, setThemeSelected] = useState('')
  const partyType = route.params.partyType
  const projectId = route.params.projectId

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = ThemeStyles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = ThemeStyles.kidsBackground
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
      `${BASE_URL}/themes/${page}/type/${partyType}`,
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

  // *** SEND OBJECT TO SINGLE PROJECT  *** //
  const sendObjectToProject = (name) => {
    if (themeSelected !== '') {
      setShowModal(true)
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
      ThemeStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ThemeStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <SafeAreaView
      style={[ThemeStyles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={ThemeStyles.container}>
        <Text style={ThemeStyles.h1}>Themes</Text>

        <TextInput
          style={ThemeStyles.input}
          placeholder='Search for a theme...'
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <FlatList
          style={ThemeStyles.flatList}
          data={allThemes.filter((theme) =>
            theme.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={({ item }) => (
            <View style={ThemeStyles.item}>
              <TouchableOpacity onPress={() => sendObjectToProject(item.name)}>
                <Image
                  source={{ uri: item.image }}
                  style={[
                    ThemeStyles.image,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                  ]}
                />
                <View
                  style={[
                    ThemeStyles.itemNameContainer,
                    ThemeStyles.boxShadow,
                    objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                  ]}>
                  <Text style={ThemeStyles.itemName}>{item.name}</Text>
                  <Ionicons name='add' size={30} color='black' />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <View style={ThemeStyles.arrows}>
          <TouchableOpacity onPress={prevPage} style={{ paddingRight: 60 }}>
            <SimpleLineIcons name='arrow-left' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage}>
            <SimpleLineIcons name='arrow-right' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <Modal
          animationType={'slide'}
          transparent
          visible={showModal}
          backdropOpacity={0.3}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={ThemeStyles.modalBackground}>
            <View style={ThemeStyles.modalContent}>
              <View style={ThemeStyles.modalHeader}>
                <Text style={ThemeStyles.modalText}>Are you sure you want more than one theme?</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <AntDesign name='close' size={25} color='black' style={ThemeStyles.closeModal2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default Themes
