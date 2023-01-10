import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import colors from 'assets/styling/colors.js'

const MainButton = () => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
})

export default MainButton
