import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  Button,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'

const FoodnDrinks = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()
  const [selectedFetch, setSelectedFetch] = useState('food')
  const [allFood, setAllFood] = useState([])
  const [allDrinks, setAllDrinks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const logout = () => {
    console.log('logged out')
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate('SignIn')
    }
  }, [accessToken])
  // FOOD FETCH
  const getAllFood = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch('https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/food', options)
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
    fetch('https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/drinks', options)
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

  return (
    <SafeAreaView style={styles.background}>
      <Button onPress={handleDrinksButton} title='drinks'>
        Drinks
      </Button>
      <Button onPress={handleFoodButton} title='food'>
        Food
      </Button>
      <TextInput
        style={styles.input}
        placeholder='Search for a theme...'
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />

      {selectedFetch === 'food' ? (
        <View style={{ height: 400, width: 300, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
            data={allFood.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>{item.name}</Text>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View style={{ height: 400, width: 300, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
            data={allDrinks.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>{item.name}</Text>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 100,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FoodnDrinks
