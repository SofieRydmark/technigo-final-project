import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import {
  Modal,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'

// Our colors
import colors from '../../config/colors'

// Form handler and validation Yup
import { Formik } from 'formik'
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Must be min 8 characters').required('Password is required'),
})

// Lottie animation and icons
import LottieView from 'lottie-react-native'
import { MaterialIcons, AntDesign, Octicons } from '@expo/vector-icons'

// Reducer
import user from '../../reducers/user'

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordError, setPasswordError] = useState(null)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  // sign out
  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  // Toggle see or hide password on input
  const showPassword = () => {
    setHidePassword(!hidePassword)
  }

  const deleteUserSubmit = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }

    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/admin/delete`, options) // delete user URL
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setEmail(null))
          })
        } else {
          ;() => {
            console.log('error', data.response)
          }
        }
      })
  }

  const changePasswordSubmit = (values) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ password: values.password }),
    }

    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/admin/change`, options) // change password URL
      .then((res) => res.json())
      .then((data) => setPasswordError(data.response))
      .catch((error) => console.error(error))
  }

  return (
    <ScrollView
      style={styles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.avatarWrapper}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            backgroundColor: colors.green,
          }}
          source={require('../../assets/avatar1.json')}
        />
        <View style={styles.signOutWrapper}>
          <TouchableOpacity style={styles.signOutBtn} onPress={() => logout()}>
            <Text style={styles.signOutBtnText}>Sign out</Text>
            <MaterialIcons name='logout' size={15} color='black' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.avatarBtn} onPress={() => {}}>
          <MaterialIcons name='edit' size={20} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoSubTitle}>Email</Text>
            <Text style={styles.userEmail}>{email}</Text>
            <Text style={styles.userInfoSubTitle}>Projects</Text>
            <Text style={styles.userInfoProjectNb}>0</Text>
          </View>
        </View>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => setShowPasswordModal(true)}>
            <Text style={styles.userBtnTxt}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => setShowDeleteModal(true)}>
            <Text style={styles.userBtnTxt}>Delete user</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType={'slide'}
        transparent
        visible={showPasswordModal}
        backdropOpacity={0.3}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.userInfoSubTitle}>New password</Text>
            <Formik
              initialValues={{ password: '' }}
              validationSchema={ReviewSchema}
              onSubmit={(values, actions) => {
                if (values.password === '') {
                  return setLoginError('Please fill in all fields')
                } else {
                  changePasswordSubmit(values)
                  actions.resetForm()
                }
              }}>
              {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>
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
                  {errors.email && touched.email ? (
                    <Text style={styles.loginError}>{errors.email}</Text>
                  ) : null}
                  <TouchableOpacity onPress={handleSubmit} style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Confirm</Text>
                  </TouchableOpacity>
                  {passwordError !== null && (
                    <Text style={styles.passwordError}>{passwordError}</Text>
                  )}
                </View>
              )}
            </Formik>
            <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
              <AntDesign name='close' size={25} color='black' style={styles.close} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'slide'}
        transparent
        visible={showDeleteModal}
        backdropOpacity={0.3}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.userInfoSubTitle}>Are you sure you want to delete user?</Text>
            <TouchableOpacity onPress={deleteUserSubmit} style={styles.deleteBtn}>
              <Text style={styles.userBtnTxt}>Yes, delete user</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.userBtn}>
              <Text style={styles.userBtnTxt}>No, go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  avatarWrapper: {
    top: 40,
    padding: 40,
  },
  avatarBtn: {
    position: 'absolute',
    right: 40,
    bottom: 50,
    padding: 5,
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
  },
  background: {
    flex: 1,
    backgroundColor: colors.green,
    padding: 20,
  },
  container: {
    borderRadius: 20,
    padding: 20,
    width: '100%',
    backgroundColor: colors.white,
  },
  close: {
    position: 'absolute',
    bottom: 160,
    right: -160,
  },
  confirmBtn: {
    borderRadius: 8,
    backgroundColor: colors.peach,
    width: 150,
    padding: 5,
  },
  eyeIcon: {
    color: colors.darkGrey,
    zIndex: 10,
    position: 'absolute',
    right: 20,
    bottom: 35,
  },
  form: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  userEmail: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
    textAlign: 'center',
  },
  deleteBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.fail,
    textAlign: 'center',
  },
  userBtnTxt: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoProjectNb: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '90%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  signOutWrapper: {
    position: 'absolute',
    top: 10,
    right: -20,
  },
  signOutBtn: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutBtnText: {
    fontSize: 15,
  },
})

export default Profile
