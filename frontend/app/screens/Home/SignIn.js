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
  ImageBackground,
} from 'react-native'

// Formik and external assets
import { Formik } from 'formik'
import { Octicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'

// Asset imports
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { SIGN_IN_URL } from 'assets/urls/urls.js'

// Reducer
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

// Validation of input fields with yup
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required('Email is required'),
  password: Yup.string().min(8, 'Must be min 8 characters').required('Password is required'),
})

const SignIn = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()

  // Toggle see or hide password on input
  const showPassword = () => {
    setHidePassword(!hidePassword)
  }

  // Sign up form function with post sign in url
  const signInSubmit = (values) => {
    dispatch(ui.actions.setLoading(true))
    setLoginError(null)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    }

    fetch(SIGN_IN_URL, options) // sign in URL
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

  const backgroundImage = require('assets/images/BubbleImg.png')
  const backgroundImage2 = require('assets/lotties/bubbles.json')

  return (
    // <ImageBackground source={backgroundImage} style={styles.background}>
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <ScrollView contentContainerStyle={styles.background}>
          <LottieView
            autoPlay
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '80%',
              zIndex: -99,
              backgroundColor: colors.green,
            }}
            source={require('assets/lotties/bubbles.json')}
          />
          <LottieView
            autoPlay
            style={{
              position: 'absolute',
              bottom: 0,
              width: '130%',
              height: '80%',
              zIndex: -99,
              backgroundColor: colors.green,
            }}
            source={require('assets/lotties/bubbles.json')}
          />
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
            validationSchema={ReviewSchema}
            onSubmit={(values, actions) => {
              if (values.email === '' || values.password === '') {
                return setLoginError('Please fill in all fields')
              } else {
                signInSubmit(values)
                actions.resetForm()
              }
            }}>
            {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
              <View style={[styles.form, styles.boxShadow]}>
                <Text style={styles.label}>EMAIL</Text>
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
                <Text style={styles.label}>PASSWORD</Text>
                <TextInput
                  label='password'
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  required
                  multiline={false}
                  autoCapitalize='none'
                  secureTextEntry={hidePassword === true ? true : false}
                  placeholder='*******'
                />
                <TouchableOpacity onPress={showPassword}>
                  <Octicons
                    name={hidePassword === true ? 'eye-closed' : 'eye'}
                    size={20}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
                {errors.password && touched.password ? (
                  <Text style={styles.loginError}>{errors.password}</Text>
                ) : null}
                {loginError !== null && <Text style={styles.loginError}>{loginError}</Text>}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.signInButton, styles.boxShadow]}>
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
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: fonts.button,
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
    zIndex: 99,
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.black,
    textAlign: 'center',
  },
  header: {
    marginBottom: 30,
    marginTop: 150,
  },
  headerH1: {
    fontSize: 35,
    fontFamily: fonts.titles,
    textAlign: 'center',
  },
  headerH2: {
    fontSize: 16,
    fontFamily: fonts.text,
    textAlign: 'center',
  },
  here: {
    fontFamily: fonts.button,
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
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  label: {
    fontSize: 15,
    color: colors.darkGrey,
    fontFamily: fonts.text,
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
