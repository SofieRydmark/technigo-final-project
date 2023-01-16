import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles as formStyles } from 'components/resetPassword/styles'
import { Formik } from 'formik'
import { TextInputWithIcon } from 'components/resetPassword/TextInputWithIcon'
import { Note } from 'components/resetPassword/Note'
import { Error } from 'components/resetPassword/Error'
import * as Yup from 'yup'

const CodeForm = () => {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  return (
    <Formik
      initialValues={{
        code: '',
      }}
      validationSchema={Yup.object({
        code: Yup.string().required('Provide a valid verification code.'),
      })}
      onSubmit={(values, actions) => {
        setSubmitting(true)
        setServerError(null)
        // server validation in place of `setTimeout`
        setTimeout(() => {
          actions.setSubmitting(false)
          switchStage(stages.RESET)
        }, 1000)
        actions.resetForm()
      }}>
      {({ handleChange, handleBlur, values, isSubmitting, handleSubmit }) => (
        <>
          <Error error={serverError} />
          <Note note='Input the code sent to your email address.' />
          <TextInputWithIcon
            name='code'
            ionIcon='ios-arrow-dropright-circle'
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values.code}
            placeholder='Input Code'
            style={{ ...formStyles.input }}
            autoCapitalize='none'
            placeholderTextColor='#666'
            clearButtonMode='while-editing'
            keyboardType='numeric'
            maxLength={6}
            editable={!isSubmitting}
          />

          <View style={styles.submit}>
            {submitting === true ? (
              <>
                <Spinner />
                <Text style={styles.submitText}>Verifying Code</Text>
              </>
            ) : (
              <Text style={styles.submitText} onPress={() => handleSubmit()}>
                Submit Code
              </Text>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text onPress={() => switchStage(REQUEST_LINK)}>Go Back</Text>
          </View>
        </>
      )}
    </Formik>
  )
}

export default CodeForm
