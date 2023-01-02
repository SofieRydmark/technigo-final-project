import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
} from 'react-native'
import { Formik } from 'formik'
import { Octicons } from '@expo/vector-icons'

import colors from '../config/colors'
import user from '../reducers/user'

const SignIn = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()

  // toggle see or hide password on input
  const showPassword = () => {
    setHidePassword(!hidePassword)
  }

  // sign ip form function with post sign in url
  const signInSubmit = (values) => {
    setLoginError(null)
    console.log('everything ok, lets fetch')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    }

    fetch('http://10.0.2.2:8080/signIn', options) // registration URL
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setError(null))
            setLoginError(null)
          })
          navigation.navigate('ProjectBoard')
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setEmail(null))
            setLoginError(data.response)
          })
        }
      })
  }
  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <ScrollView contentContainerStyle={styles.background}>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Welcome</Text>
            <Text style={styles.headerH2}>
              Not a member yet? Sign up
              <Text style={styles.here} onPress={() => navigation.navigate('SignUp')}>
                {' '}
                here
              </Text>
            </Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
              console.log('cred formik', values)
              if (values.email === '' || values.password === '') {
                return setLoginError('Please fill in all fields')
              } else {
                signInSubmit(values)
                actions.resetForm()
              }
            }}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                  label='email'
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  required
                  placeholder='hello@email.com'
                  keyboardType='email-address'
                />
                <Text style={styles.label}>PASSWORD</Text>
                <TextInput
                  label='password'
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  required
                  //secureTextEntry={hidePassword === true ? 'true' : 'false'}
                  placeholder='*******'
                />
                <TouchableOpacity onPress={showPassword}>
                  <Octicons
                    name={hidePassword === true ? 'eye-closed' : 'eye'}
                    size={20}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
                {loginError !== null && <Text>{loginError}</Text>}
                <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text style={styles.forgotPassword} onPress={''}>
            Forgot password?
          </Text>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  eyeIcon: {
    color: colors.darkGrey,
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 35,
  },
  form: {
    borderRadius: 10,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 16,
    color: colors.darkGrey,
    textAlign: 'center',
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerH2: {
    fontSize: 16,
    textAlign: 'center',
  },
  here: {
    fontWeight: 'bold',
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  label: {
    fontSize: 15,
    color: colors.darkGrey,
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
  signInButton: {
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
export default SignIn
