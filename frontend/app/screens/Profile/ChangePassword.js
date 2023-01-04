import React from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../../config/colors'

const ChangePassword = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Change Password</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.partyButton}>
          <Text style={styles.buttonText}>Back to profile</Text>
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
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
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
export default ChangePassword
