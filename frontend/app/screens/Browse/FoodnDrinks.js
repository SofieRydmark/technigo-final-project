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
import {
  PARTYTYPE_FOOD_URL,
  PARTYTYPE_DRINK_URL,
  FOOD_ADD_URL,
  DRINK_ADD_URL,
} from 'assets/urls/urls'

// Reducers
import user from '../../reducers/user'

const FoodnDrinks = ({ route, navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [selectedFetch, setSelectedFetch] = useState('drinks')
  const [allFood, setAllFood] = useState([])
  const [allDrinks, setAllDrinks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [objectSent, setObjectSent] = useState([])
  const buttonIcon = require('assets/images/addCircle.png')
  const projectId = route.params.projectId
  const partyType = route.params.partyType

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

  // FOOD FETCH
  const getAllFood = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(PARTYTYPE_FOOD_URL(partyType), options)
      .then((res) => res.json())
      .then((data) => setAllFood(data.response))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllFood()
  }, [])

  //DRINKS FETCH
  const getAllDrinks = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(PARTYTYPE_DRINK_URL(partyType), options)
      .then((res) => res.json())
      .then((data) => setAllDrinks(data.response))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllDrinks()
  }, [])

  const handleFoodButton = () => {
    setSelectedFetch('food')
  }

  const handleDrinksButton = () => {
    setSelectedFetch('drinks')
  }
  /****************** SEND FOOD TO SINGLE PROJECT  ************************* */
  const sendFoodToProject = (name) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        foodName: name,
      }),
    }

    fetch(FOOD_ADD_URL(userId, projectId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
  }

  /****************** SEND DRINKS TO SINGLE PROJECT  ************************* */
  const sendDrinksToProject = (name) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        drinksName: name,
      }),
    }

    fetch(DRINK_ADD_URL(userId, projectId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
  }

  return (
    <SafeAreaView style={[styles.background, backgroundStyle]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDrinksButton} style={styles.partyButton}>
          <Text>Drinks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFoodButton} style={styles.partyButton}>
          <Text>Food</Text>
        </TouchableOpacity>
      </View>
      {selectedFetch === 'food' ? (
        <View>
          <Text style={styles.h1}>Food</Text>
          <TextInput
            style={styles.input}
            placeholder='Search for a theme...'
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <FlatList
            style={styles.flatList}
            data={allFood.filter((theme) =>
              theme.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => sendFoodToProject(item.name)}>
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
        </View>
      ) : (
        <View>
          <Text style={styles.h1}>Drinks</Text>
          <TextInput
            style={styles.input}
            placeholder='Search for a theme...'
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <FlatList
            style={styles.flatList}
            data={allDrinks.filter((theme) =>
              theme.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => sendDrinksToProject(item.name)}>
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
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    fontSize: 14,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  flatList: {
    flex: 0.9,
    alignSelf: 'center',
  },
  h1: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
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
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 50,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.peach,
    margin: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 100,
  },
})

export default FoodnDrinks
