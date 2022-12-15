import React, { useState } from 'react'
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

import { Fontisto } from '@expo/vector-icons'
import colors from '../config/colors'

const SignUp = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [loginError, setLoginError] = useState(null)

  const signUnSubmit = () => {
    console.log('sign up', email, password)

    if (password !== confirmPassword) {
      return setLoginError('Please enter valid passwords')
    }

    /* const options = {
      method: 'POST',r
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }

    fetch('https://project-authentication-yz4wzwvsha-uc.a.run.app/login', options) // login URL
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setUserName(data.response.username))
            dispatch(user.actions.setError(null))
            setLoginError(null)
          })
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUserName(null))
            setLoginError(data.response)
          })
        }
      }) */
  }
  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <ScrollView contentContainerStyle={styles.background}>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Create new account</Text>
            <Text style={styles.headerH2}>Already a member? Sign in here</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              label='Email'
              style={styles.input}
              onChangeText={(email) => setEmail(email)}
              value={email}
              required
              placeholder='hello@email.com'
              keyboardType='email-address'
            />
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              label='Password'
              style={styles.input}
              onChangeText={(password) => setPassword(password)}
              value={password}
              required
              secureTextEntry={true}
              placeholder='*******'
            />
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <TextInput
              label='Confirm Password'
              style={styles.input}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              value={confirmPassword}
              required
              secureTextEntry={true}
              placeholder='*******'
            />
            <TouchableOpacity
              onPress={() => signUnSubmit()}
              style={styles.signUpButton}
              title='Sign in'>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
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
  form: {
    borderRadius: 10,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 16,
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
  signUpButton: {
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
export default SignUp
