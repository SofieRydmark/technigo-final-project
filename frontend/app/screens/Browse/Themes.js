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
  Modal,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { THEME_ADD_URL } from 'assets/urls/urls'
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
                  <Ionicons style={styles.plusIcone} name='add' size={30} color='black' />
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
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Are you sure you want more than one theme?</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <AntDesign name='close' size={25} color='black' style={styles.closeModal2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  arrows: {
    flexDirection: 'row',
  },
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
  closeModal2: {
    right: -20,
    top: -15,
  },
  input: {
    backgroundColor: colors.lightGrey,
    width: '85%',
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
    marginBottom: 10,
    marginTop: 50,
    fontFamily: fonts.titles,
    fontSize: 30,
  },
  item: {
    width: '50%',
    marginBottom: -70,
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
    width: '87%',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '90%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalText: {
    fontFamily: fonts.text,
    textAlign: 'center',
  },
  plusIcone: {
    marginLeft: 100,

  }
})

export default Themes
