import React from 'react'
import { Text } from 'react-native'
import { styles } from './styles'

const InputLabel = ({ label }) => {
  return <Text style={styles.inputLabel}>{label}</Text>
}

export default InputLabel
