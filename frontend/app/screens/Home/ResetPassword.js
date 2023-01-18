import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import LottieView from 'lottie-react-native'
import { RESET_URL } from 'assets/urls/urls'

const ResetPassword = () => {
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()

  // Box shadow styling IOS and android
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      styles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  // Reset fetch
  const resetLink = (values) => {
    dispatch(ui.actions.setLoading(true))
    setLoginError(null)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email }),
    }

    fetch(RESET_URL, options) // reset link
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
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <ScrollView contentContainerStyle={styles.background}>
          <View style={[styles.container, styles.boxShadow]}>
            <View style={styles.header}>
              <Text style={styles.headerH1}>
                Oops did you forget your password? Don't worry. Fill in your email below and we will
                send a reset link.
              </Text>
              <TextInput
                label='email'
                style={styles.input}
                // onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                //value={values.email}
                required
                multiline={false}
                autoCapitalize='none'
                placeholder='hello@email.com'
                keyboardType='email-address'
              />
            </View>
            <TouchableOpacity onPress={resetLink} style={[styles.partyButton, styles.boxShadow]}>
              <Text style={styles.buttonText}>Send link</Text>
            </TouchableOpacity>
          </View>

          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'transparent',
            }}
            source={require('assets/lotties/meditatingPanda.json')}
          />
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
    fontSize: 16,
    fontFamily: fonts.button,
  },
  container: {
    borderRadius: 30,
    padding: 30,
    width: '90%',
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 30,
    marginHorizontal: 15,
  },
  headerH1: {
    fontSize: 20,
    fontFamily: fonts.text,
    textAlign: 'center',
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
})
export default ResetPassword
