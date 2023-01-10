import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
const imageTheme = require('assets/images/theme.jpg')
const imageActivity = require('assets/images/activity.jpg')
const imageFood = require('assets/images/foodDrink.jpg')
const imageDecoration = require('assets/images/decor.jpg')

const BrowsCategoriesPage = ({ route, navigation }) => {
  const projectId = route.params.projectId
  const partyType = route.params.partyType

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

  return (
    <ScrollView contentContainerStyle={[styles.background, backgroundStyle]}>
      <View style={styles.ContainerStyle}>
        <View style={styles.SmallContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Themes', {
                partyType: partyType,
                projectId: projectId,
              })
            }
            title='Themes'>
            <Image source={imageTheme} style={styles.buttonImage} />
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>Themes</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SmallContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Decorations', { partyType: partyType, projectId: projectId })
            }
            title='Decorations'>
            <Image source={imageDecoration} style={styles.buttonImage} />
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>Decorations</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SmallContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FoodnDrinks', { partyType: partyType, projectId: projectId })
            }
            title='Food and Drinks'>
            <Image source={imageFood} style={styles.buttonImage} />
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>Food & Drinks</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.SmallContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Activities', { partyType: partyType, projectId: projectId })
            }
            title='Activity'>
            <Image source={imageActivity} style={styles.buttonImage} />
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>Activities</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    width: 180,
    height: 180,
    margin: 5,
    borderRadius: 8,
  },
  ContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  SmallContainer: {
    marginBottom: '-25%',
  },
  itemNameContainer: {
    borderRadius: 8,
    zIndex: 99,
    top: '-50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 70,
    margin: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.titles,
  },
})

export default BrowsCategoriesPage
