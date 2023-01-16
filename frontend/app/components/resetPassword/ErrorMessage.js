import React from 'react'
import { View, Text } from 'react-native'
import { ErrorMessage as ErrorMessageFormik } from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const ErrorMessage = ({ name }) => {
  return (
    <ErrorMessageFormik name={name}>
      {(msg) => (
        <View style={styles.error}>
          <Ionicons name='ios-warning' size={22} style={styles.errorIcon} />
          <Text style={styles.errorText}>{msg}</Text>
        </View>
      )}
    </ErrorMessageFormik>
  )
}

export default ErrorMessage
