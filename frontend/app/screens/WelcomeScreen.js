import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

const WelcomeScreen = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const signInSubmit = () => {
    console.log('hello', email, password)

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
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Welcome</Text>
        <Text style={styles.headerH2}>Not a member yet? Sign up here</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          value={email}
          required
          placeholder='user@email.com'
          keyboardType='email-address'
        />
        <TextInput
          label='Password'
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          value={password}
          required
          maxLength='20'
          secureTextEntry={true}
          placeholder='*******'
          keyboardType='numeric'
        />
        <TouchableOpacity onPress={signInSubmit} style={styles.signinButton} title='Sign in'>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '50%',
    backgroundColor: colors.light,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  signinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
})
export default WelcomeScreen
