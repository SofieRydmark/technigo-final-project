import React from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

const WhatKindOfParty = ({ navigation, route }) => {
  const projectId = route.params.projectId

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
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>What kind of party do you need ideas for?</Text>
      </View>
      <View style={[styles.container, styles.boxShadow]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BrowsingCategoriesPage', {
              partyType: 'grownup',
              projectId: projectId,
            })
          }
          style={[styles.partyButton, styles.boxShadow]}>
          <Text style={styles.buttonText}>Grown-up party</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BrowsingCategoriesPage', {
              partyType: 'kids',
              projectId: projectId,
            })
          }
          style={[styles.partyButton, styles.boxShadow]}>
          <Text style={styles.buttonText}>Kids party</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    fontSize: 16,
    fontFamily: fonts.button,
  },
  container: {
    borderRadius: 30,
    padding: 30,
    width: '90%',
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 30,
    marginHorizontal: 15,
  },
  headerH1: {
    fontSize: 25,
    fontFamily: fonts.titles,
    textAlign: 'center',
  },
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
})
export default WhatKindOfParty
