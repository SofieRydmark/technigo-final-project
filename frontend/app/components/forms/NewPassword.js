import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Formik } from 'formik'
import { styles as formStyles } from 'components/resetPassword/styles'
import { TextInputWithIcon } from 'components/resetPassword/TextInputWithIcon'
import { Note } from 'components/resetPassword//Note'
import { Error } from 'components/resetPassword//Error'
import * as Yup from 'yup'
import { Spinner } from 'components/resetPassword/Spinner'

const NewPassword = () => {
  const [state, setState] = useState({
    submitting: false,
    serverError: null,
    passwordReset: false,
  })

  useEffect(() => {
    setState({
      passwordReset: false,
    })
  }, [state])

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object({
        password: Yup.string().required('Password is missing'),
      })}
      onSubmit={(values, actions) => {
        setState({
          submitting: true,
          serverError: null,
        })

        // server validation in place of `setTimeout`
        setTimeout(() => {
          actions.setSubmitting(false)
          setState({
            submitting: false,
            passwordReset: true,
          })
        }, 1000)
      }}>
      {({ handleChange, handleBlur, values, isSubmitting, handleSubmit }) => (
        <>
          <Error error={serverError} />
          <Note note='Successfully verified. Input a new password:' />
          <TextInputWithIcon
            ionIcon='ios-lock'
            name='password'
            autoCompleteType='password'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder='Password'
            style={{ ...formStyles.input }}
            secureTextEntry={true}
            placeholderTextColor='#666'
            clearButtonMode='while-editing'
            maxLength={100}
            editable={!isSubmitting}
          />
          <View style={formStyles.submit}>
            {this.state.submitting === true ? (
              <>
                <Spinner />
                <Text style={formStyles.submitText}>Resetting Password</Text>
              </>
            ) : (
              <Text style={formStyles.submitText} onPress={() => handleSubmit()}>
                {this.state.passwordReset === true
                  ? 'Password Successfully Reset'
                  : 'Reset Password'}
              </Text>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text onPress={() => switchStage(stages.REQUEST_LINK)}>Start Again</Text>
          </View>
        </>
      )}
    </Formik>
  )
}

export default NewPassword
