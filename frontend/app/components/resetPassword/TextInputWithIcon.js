import React from 'react'
import { View, TextInput } from 'react-native'
import { styles } from './styles'
import { Ionicons } from 'react-native-vector-icons'
import { ErrorMessage } from './ErrorMessage'

const TextInputWithIcon = ({ ionIcon, name, ...rest }) => {
  return (
    <>
      <View style={styles.inputWrap}>
        <View style={styles.inputIcon}>
          <Ionicons name={ionIcon} size={25} color='#ccc' />
        </View>
        <TextInput {...rest} />
      </View>
      <ErrorMessage name={name} />
    </>
  )
}

export default TextInputWithIcon
