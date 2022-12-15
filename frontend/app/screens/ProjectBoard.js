import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

const ProjectBoard = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Projectboard</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SingleProject')}
        style=''
        title='Project X'>
        <Text>Project</Text>
      </TouchableOpacity>
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
})
export default ProjectBoard
