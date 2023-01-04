import React from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../../config/colors'

const WhatAreWeDoing = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>What are we doing today?</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Go to my projectboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('WhatKindOfParty')}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Browse ideas for a new party</Text>
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
