import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { styles } from './styles'

const Error = ({ error }) => {
  if (error === null) {
    return <></>
  }

  return (
    <View style={styles.error}>
      <Ionicons name='ios-warning' size={22} style={styles.errorIcon} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  )
}

export default Error
