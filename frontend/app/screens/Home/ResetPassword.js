import React, { useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native'

// Assets import
import { ResetStyles } from 'components/HomeStyling/HomeScreens.styling'
import LottieView from 'lottie-react-native'
import { BASE_URL } from '@env'

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
      ResetStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ResetStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
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

    fetch(`${BASE_URL}/forgotPassword`, options) // reset link
      .then((res) => res.json())
      .catch((error) => console.error(error))
  }

  return (
    <KeyboardAvoidingView
      style={ResetStyles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={ResetStyles.pressable}>
        <ScrollView contentContainerStyle={ResetStyles.background}>
          <View style={[ResetStyles.container, ResetStyles.boxShadow]}>
            <View style={ResetStyles.header}>
              <Text style={ResetStyles.headerH1}>
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
                    style={ResetStyles.input}
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
                    <Text style={ResetStyles.loginError}>{errors.email}</Text>
                  ) : null}
                  {emailSent && (
                    <Text style={ResetStyles.emailSent}>Reset link has been sent to your email</Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[ResetStyles.partyButton, ResetStyles.boxShadow]}>
                    <Text style={ResetStyles.buttonText}>Reset password</Text>
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

export default ResetPassword
