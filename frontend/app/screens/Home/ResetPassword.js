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

// Formik and validation
import { Formik } from 'formik'
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required('Email is required'),
})

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [loginError, setLoginError] = useState(null)

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
  const resetLinkSubmit = (values) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email }),
    }

    fetch('https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/forgotPassword', options) // reset link
      .then((res) => res.json())
      .catch((error) => console.error(error))
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
                Oops, did you forget your password? No worries. Fill in your email below and we will
                send a reset link.
              </Text>
            </View>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ReviewSchema}
              onSubmit={(values, actions) => {
                if (values.email === '') {
                  return setLoginError('Please enter your email')
                } else {
                  resetLinkSubmit(values)
                  actions.resetForm()
                }
              }}>
              {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <TextInput
                    label='email'
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    required
                    multiline={false}
                    autoCapitalize='none'
                    placeholder='hello@email.com'
                    keyboardType='email-address'
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.loginError}>{errors.email}</Text>
                  ) : null}
                  {emailSent && (
                    <Text style={styles.emailSent}>Reset link has been sent to your email</Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.partyButton, styles.boxShadow]}>
                    <Text style={styles.buttonText}>Reset password</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
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
  emailSent: {
    fontFamily: fonts.text,
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color: colors.green,
  },
  header: {
    marginBottom: 30,
    marginHorizontal: 15,
  },
  headerH1: {
    fontSize: 18,
    fontFamily: fonts.text,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginError: {
    fontSize: 15,
    color: 'red',
    marginBottom: 15,
    marginTop: -15,
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
