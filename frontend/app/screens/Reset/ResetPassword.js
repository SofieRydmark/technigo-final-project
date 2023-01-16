import React, { useState } from 'react'
import { View, SafeAreaView, KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles as formStyles } from 'components/resetPassword/styles'
import { ResetForm } from 'components/forms/ResetForm'
import { CodeForm } from 'components/forms/CodeForm'
import { NewPassword } from 'components/forms/NewPassword'

const ResetPassword = () => {
  const stages = {
    REQUEST_LINK: 'REQUEST_LINK',
    VERIFY: 'VERIFY',
    RESET: 'RESET',
  }

  const [stage, setStage] = useState(stages.REQUEST_LINK)
  const [email, setEmail] = useState(null)

  const switchStage = (stages) => {
    setStage(stage)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <View style={formStyles.container}>
          <Text style={{ marginBottom: 30 }}>Reset Your Password</Text>
          {stage === stages.REQUEST_LINK && (
            <ResetForm stages={stages} switchStage={switchStage} setEmail={setEmail} />
          )}
          {stage === stages.VERIFY && <CodeForm stages={stages} switchStage={switchStage} />}
          {stage === stages.RESET && (
            <NewPassword stages={stages} switchStage={switchStage} email={email} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  container: {
    width: '100%',
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default ResetPassword
