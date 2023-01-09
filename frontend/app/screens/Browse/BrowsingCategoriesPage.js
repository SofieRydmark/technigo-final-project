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
  const dispatch = useDispatch()
  const projectId = route.params.projectId
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
              onPress={() => navigation.navigate('Themes', { partyType: partyType, projectId:projectId })}
              title='Themes'>
              <Image source={imageTheme} style={styles.buttonImage} />
              <View style={styles.itemNameContainer}>
                <View style={styles.itemNameBackground}>
                <Text style={styles.itemName}>Themes</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Decorations', { partyType: partyType, projectId:projectId})}
              title='Decorations'>
              <Image source={imageDecoration} style={styles.buttonImage} />
              <View style={styles.itemNameContainer}>
              <View style={styles.itemNameBackground}>
                <Text style={styles.itemName}> Decorations</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoodnDrinks', { partyType: partyType, projectId:projectId })}
              title='Food and Drinks'>
              <Image source={imageFood} style={styles.buttonImage} />
              <View style={styles.itemNameContainer}>
                <View style={styles.itemNameBackground}>
                  <Text style={styles.itemName}>Food & Drinks </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SmallContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Activities', { partyType: partyType, projectId:projectId })}
              title='Activity'>
              <Image source={imageActivity} style={styles.buttonImage} />
              <View style={styles.itemNameContainer}>
                <View style={styles.itemNameBackground}>
                  <Text style={styles.itemName}> Activities</Text>
                </View>
              </View>
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
  buttonImage: {
    margin: 10,  
    width: 130,  
    height: 130, 
  },
  ContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
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
  itemNameContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 15,
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
})

export default BrowsCategoriesPage
