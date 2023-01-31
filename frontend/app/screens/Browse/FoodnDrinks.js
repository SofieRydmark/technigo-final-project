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
import { FoodDrinkStyles } from 'components/BrowseStyling/FoodnDrinksScreen'
import { FOOD_ADD_URL, DRINK_ADD_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'

const FoodnDrinks = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [selectedFetch, setSelectedFetch] = useState('food')
  const [allFood, setAllFood] = useState([])
  const [allDrinks, setAllDrinks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [objectSent, setObjectSent] = useState([])
  const projectId = route.params.projectId
  const partyType = route.params.partyType

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = FoodDrinkStyles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = FoodDrinkStyles.kidsBackground
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }

    // *** FOOD FETCH *** //
    fetch(
      `${BASE_URL}/food/${page}/type/${partyType}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllFood(data.response))
      .then(setPage(page))
      .catch((error) => console.error(error))

    // *** DRINKS FETCH *** //
    fetch(
      `${BASE_URL}/drinks/${page}/type/${partyType}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAllDrinks(data.response))
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

  const handleFoodButton = () => {
    setSelectedFetch('food')
  }

  const handleDrinksButton = () => {
    setSelectedFetch('drinks')
  }

  // *** SEND FOOD TO SINGLE PROJECT  *** //
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
      .catch((error) => console.error(error))
    setObjectSent([...objectSent, name])
  }

  // *** SEND DRINKS TO SINGLE PROJECT  *** //
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
      FoodDrinkStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      FoodDrinkStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <SafeAreaView
      style={[FoodDrinkStyles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={FoodDrinkStyles.container}>
        <View style={FoodDrinkStyles.headerWrapper}>
          <TouchableOpacity onPress={handleFoodButton}>
            <Text
              style={[
                FoodDrinkStyles.h1,
                selectedFetch === 'drinks'
                  ? { opacity: 0.2 }
                  : { textDecorationLine: 'underline', textDecorationColor: 'black' },
              ]}>
              Food
            </Text>
          </TouchableOpacity>
          <Text style={FoodDrinkStyles.h1}> / </Text>
          <TouchableOpacity onPress={handleDrinksButton}>
            <Text
              style={[
                FoodDrinkStyles.h1,
                selectedFetch === 'food'
                  ? { opacity: 0.2 }
                  : { textDecorationLine: 'underline', textDecorationColor: 'black' },
              ]}>
              Drinks
            </Text>
          </TouchableOpacity>
        </View>
        {selectedFetch === 'drinks' ? (
          <>
            <TextInput
              style={FoodDrinkStyles.input}
              placeholder='Search for a drink...'
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
            />
            <FlatList
              style={FoodDrinkStyles.flatList}
              data={allDrinks.filter((drinks) =>
                drinks.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              numColumns={2}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              renderItem={({ item }) => (
                <View style={FoodDrinkStyles.item}>
                  <TouchableOpacity onPress={() => sendDrinksToProject(item.name)}>
                    <Image
                      source={{ uri: item.image }}
                      style={[
                        FoodDrinkStyles.image,
                        objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                      ]}
                    />
                    <View
                      style={[
                        FoodDrinkStyles.itemNameContainer,
                        FoodDrinkStyles.boxShadow,
                        objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                      ]}>
                      <Text style={FoodDrinkStyles.itemName}>{item.name}</Text>
                      <Ionicons style={FoodDrinkStyles.plusIcone} name='add' size={30} color='black' />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.name}
            />
          </>
        ) : (
          <>
            <TextInput
              style={FoodDrinkStyles.input}
              placeholder='Search for food...'
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
            />
            <FlatList
              style={FoodDrinkStyles.flatList}
              data={allFood.filter((foods) =>
                foods.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              numColumns={2}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              renderItem={({ item }) => (
                <View style={FoodDrinkStyles.item}>
                  <TouchableOpacity onPress={() => sendFoodToProject(item.name)}>
                    <Image
                      source={{ uri: item.image }}
                      style={[
                        FoodDrinkStyles.image,
                        objectSent.includes(item.name) ? { opacity: 0.5 } : { borderColor: 'none' },
                      ]}
                    />
                    <View
                      style={[
                        FoodDrinkStyles.itemNameContainer,
                        FoodDrinkStyles.boxShadow,
                        objectSent.includes(item.name) ? { opacity: 0.5 } : { opacity: 1 },
                      ]}>
                      <Text style={FoodDrinkStyles.itemName}>{item.name}</Text>
                      <Ionicons style={FoodDrinkStyles.plusIcone} name='add' size={30} color='black' />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.name}
            />
          </>
        )}
        <View style={FoodDrinkStyles.arrows}>
          <TouchableOpacity onPress={prevPage} style={{ paddingRight: 70 }}>
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

export default FoodnDrinks
