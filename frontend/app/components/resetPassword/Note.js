import React from 'react'
import { Text } from 'react-native'
import { styles } from './styles'

const Note = ({ note }) => {
  return <Text style={styles.noteText}>{note}</Text>
}

export default Note
