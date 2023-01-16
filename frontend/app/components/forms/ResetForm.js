import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles as formStyles } from 'components/resetPassword/styles'
import { Formik } from 'formik'
import { TextInputWithIcon } from 'components/resetPassword/TextInputWithIcon'
import { Error } from 'components/resetPassword/Error'
import { Note } from 'components/resetPassword/Note'
import * as Yup from 'yup'
import { Spinner } from 'components/resetPassword/Spinner'

const ReviewSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email address is required'),
})

const ResetForm = () => {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={ReviewSchema}
      onSubmit={(values, actions) => {
        setSubmitting(true)
        setServerError(null)
        // server validation in place of `setTimeout`
        setTimeout(() => {
          actions.setSubmitting(false)
          setEmail(values.email)
          switchStage(stages.VERIFY)
        }, 1000)
      }}>
      {({ handleChange, handleBlur, values, handleSubmit }) => (
        <>
          <Error error={serverError} />
          <Note note='Please provide your account email address to request a password reset code. You will receive your a code to your email address if it is valid.' />
          <TextInputWithIcon
            name='email'
            ionIcon='ios-person'
            autoCompleteType='email'
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder='Email Address'
            style={{ ...formStyles.input }}
            autoCapitalize='none'
            placeholderTextColor='#666'
            clearButtonMode='while-editing'
            keyboardType='email-address'
            maxLength={100}
            // editable={!isSubmitting}
          />

          <View style={formStyles.submit}>
            {submitting === true ? (
              <>
                <Spinner />
                <Text style={formStyles.submitText}>Processing Request</Text>
              </>
            ) : (
              <Text style={formStyles.submitText} onPress={handleSubmit}>
                Request Reset Code
              </Text>
            )}
          </View>
        </>
      )}
    </Formik>
  )
}

export default ResetForm
