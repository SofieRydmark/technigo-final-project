import React from 'react'
import { View, TextInput as TextInputNative } from 'react-native'
import { styles } from './styles'
import { ErrorMessage } from './ErrorMessage'
import { InputLabel } from './InputLabel'

const TextInput = ({ name, label, ...rest }) => {
  return (
    <>
      {label !== undefined && <InputLabel label={label} />}
      <View style={styles.inputWrap}>
        <TextInputNative {...rest} />
      </View>
      <ErrorMessage name={name} />
    </>
  )
}

export default TextInput
