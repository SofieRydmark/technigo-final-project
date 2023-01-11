import React from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Assets imports
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

const WhatAreWeDoing = ({ navigation }) => {
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
        <Text style={styles.headerH1}>What are we doing today?</Text>
      </View>
      <View style={[styles.container, styles.boxShadow]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={[styles.partyButton, styles.boxShadow]}>
          <Text style={styles.buttonText}>Go to my projectboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChooseProject')}
          style={[styles.partyButton, styles.boxShadow]}>
          <Text style={styles.buttonText}>Choose your project</Text>
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
    fontSize: 15,
    fontFamily: fonts.button,
  },
  container: {
    borderRadius: 30,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontFamily: fonts.titles,
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
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
export default WhatAreWeDoing
