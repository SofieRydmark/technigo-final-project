import React, { useState, useEffect } from 'react'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
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

// Assets import
import { SignInStyles } from 'components/HomeStyling/HomeScreens.styling'
import { SIGN_IN_URL } from 'assets/urls/urls.js'
import { BASE_URL } from '@env'

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

  // Get fetch to wake up the server to not have to sign in three times (server downtime)
  const wakeServer = () => {
    fetch(BASE_URL)
      .then((data) => data.json())
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    wakeServer()
  }, [])

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
      SignInStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      SignInStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <KeyboardAvoidingView
      style={SignInStyles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={SignInStyles.pressable}>
        <ImageBackground
          source={require('assets/images/BubbleImg.png')}
          style={SignInStyles.backgroundBubble}>
          <ScrollView contentContainerStyle={SignInStyles.background}>
            <View style={SignInStyles.header}>
              <Text style={SignInStyles.headerH1}>Welcome</Text>
              <Text style={SignInStyles.headerH2}>
                Not a member yet? Sign up
                <Text style={SignInStyles.here} onPress={() => navigation.navigate('SignUp')}>
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
                <View style={[SignInStyles.form, SignInStyles.boxShadow]}>
                  <Text style={SignInStyles.label}>EMAIL</Text>
                  <TextInput
                    label='email'
                    style={SignInStyles.input}
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
                    <Text style={SignInStyles.loginError}>{errors.email}</Text>
                  ) : null}
                  <Text style={SignInStyles.label}>PASSWORD</Text>
                  <TextInput
                    label='password'
                    style={SignInStyles.input}
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
                      style={SignInStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                  {errors.password && touched.password ? (
                    <Text style={SignInStyles.loginError}>{errors.password}</Text>
                  ) : null}
                  {loginError !== null && <Text style={SignInStyles.loginError}>{loginError}</Text>}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[SignInStyles.signInButton, SignInStyles.boxShadow]}>
                    <Text style={SignInStyles.buttonText}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <Text
              style={SignInStyles.forgotPassword}
              onPress={() => navigation.navigate('ResetPassword')}>
              Forgot password?
            </Text>
          </ScrollView>
        </ImageBackground>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default SignIn
