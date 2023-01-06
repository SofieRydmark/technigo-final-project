import React, { useEffect } from 'react'
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
} from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'

const BrowsCategoriesPage = ({ route, navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  const partyType = route.params.partyType
  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

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

  const imageTheme = require('../../assets/theme.jpg')
  const imageActivity = require('../../assets/activity.jpg')
  const imageFood = require('../../assets/test.jpg')
  const imageDecoration = require('../../assets/test1.jpg')
  return (
    <ScrollView contentContainerStyle={[styles.background, backgroundStyle]}>
      {accessToken && (
        <View style={styles.ContainerStyle}>
          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Themes', { partyType: partyType })}
              title='Themes'>
              <Image source={imageTheme} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Themes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Decorations', { partyType: partyType })}
              title='Decorations'>
              <Image source={imageActivity} style={styles.buttonImage} />
              <Text style={styles.buttonText}> Decorations</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoodnDrinks', { partyType: partyType })}
              title='Food and Drinks'>
              <Image source={imageFood} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Food & Drinks </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Activities', { partyType: partyType })}
              title='Activity'>
              <Image source={imageActivity} style={styles.buttonImage} />
              <Text style={styles.buttonText}> Activities</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  grownupBackground: {
    backgroundColor: colors.green,
  },
  kidsBackground: {
    backgroundColor: colors.peach,
  },
  /* button: { 
    width: '100%',
    height: 200, 
    alignItems: 'center',
    justifyContent: 'center',
  
  }, */
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    /* position: 'absolute', */
    /*   top: 100,
    left: 65, */
    /* transform: [{ translateX: -50 }, { translateY: -50 }], */
  },
  buttonImage: {
    width: 90,
    height: 110,
    left: 15,
  },
  ContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 50,
    margin: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  SmallContainer: {
    width: '48%',
    margin: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

export default BrowsCategoriesPage
