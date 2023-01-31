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
import { SignUpStyles } from 'components/HomeStyling/HomeScreens.styling'
import { SIGN_UP_URL } from 'assets/urls/urls.js'
import { BASE_URL } from '@env'

// Reducers
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

// Validation of input fields with yup
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required('Email is required'),
  password: Yup.string().min(8, 'Must be min 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Must be min 8 characters')
    .required('Confirm password is required'),
})

const SignUp = ({ navigation }) => {
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

  // Sign up form function with post sign up url
  const signUpSubmit = (values) => {
    dispatch(ui.actions.setLoading(true))
    if (values.password !== values.confirmPassword) {
      return setLoginError('Passwords do not match')
    }
    setLoginError(null)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    }

    fetch(SIGN_UP_URL, options) // sign up URL
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
      SignUpStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      SignUpStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <KeyboardAvoidingView
      style={SignUpStyles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={SignUpStyles.pressable}>
        <ImageBackground
          source={require('assets/images/BubbleImg.png')}
          style={SignUpStyles.backgroundBubble}>
          <ScrollView contentContainerStyle={SignUpStyles.background}>
            <View style={SignUpStyles.header}>
              <Text style={SignUpStyles.headerH1}>Create new account</Text>
              <Text style={SignUpStyles.headerH2}>
                Already a member? Sign in
                <Text style={SignUpStyles.here} onPress={() => navigation.navigate('SignIn')}>
                  {' '}
                  here
                </Text>
              </Text>
            </View>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={ReviewSchema}
              onSubmit={(values, actions) => {
                if (
                  values.email === '' ||
                  values.password === '' ||
                  values.confirmPassword === ''
                ) {
                  return setLoginError('Please fill in all fields')
                } else {
                  signUpSubmit(values)
                  actions.resetForm()
                }
              }}>
              {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                <View style={[SignUpStyles.form, SignUpStyles.boxShadow]}>
                  <Text style={SignUpStyles.label}>EMAIL</Text>
                  <TextInput
                    label='email'
                    style={SignUpStyles.input}
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
                    <Text style={SignUpStyles.loginError}>{errors.email}</Text>
                  ) : null}
                  <Text style={SignUpStyles.label}>PASSWORD</Text>
                  <View styles={SignUpStyles.passwordInput}>
                    <TextInput
                      label='password'
                      style={SignUpStyles.input}
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
                        style={SignUpStyles.eyeIcon}
                      />
                    </TouchableOpacity>
                    {errors.password && touched.password ? (
                      <Text style={SignUpStyles.loginError}>{errors.password}</Text>
                    ) : null}
                  </View>
                  <Text style={SignUpStyles.label}>CONFIRM PASSWORD</Text>
                  <View styles={SignUpStyles.passwordInput}>
                    <TextInput
                      label='confirmPassword'
                      style={SignUpStyles.input}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
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
                        style={SignUpStyles.eyeIcon}
                      />
                    </TouchableOpacity>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Text style={SignUpStyles.loginError}>{errors.confirmPassword}</Text>
                    ) : null}
                  </View>
                  {loginError !== null && <Text style={SignUpStyles.loginError}>{loginError}</Text>}
                  <TouchableOpacity onPress={handleSubmit} style={SignUpStyles.signUpButton}>
                    <Text style={SignUpStyles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </ImageBackground>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default SignUp
