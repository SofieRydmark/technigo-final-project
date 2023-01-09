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
import colors from 'assets/styling/colors.js'

// Form handler and validation Yup
import { Formik } from 'formik'
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Must be min 8 characters').required('Password is required'),
})

// Lottie animation, avatars and icons
import LottieView from 'lottie-react-native'
import { MaterialIcons, AntDesign, Octicons } from '@expo/vector-icons'
import avatar1 from 'assets/lotties/avatar1.json'
import avatar2 from 'assets/lotties/avatar2.json'
import avatar3 from 'assets/lotties/avatar3.json'
import avatar4 from 'assets/lotties/avatar4.json'
const avatars = [
  {
    id: 1,
    name: avatar1,
  },
  {
    id: 2,
    name: avatar2,
  },
  {
    id: 3,
    name: avatar3,
  },
  {
    id: 4,
    name: avatar4,
  },
]

// Reducer
import user from '../../reducers/user'

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordError, setPasswordError] = useState(null)
  const [avatarModal, setAvatarModal] = useState(false)
  const [chosenAvatar, setChosenAvatar] = useState(avatar1)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  // Sign out
  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  // Change avatar
  const changeAvatar = () => {
    setAvatarModal(true)
  }

  // Toggle see or hide password on input
  const showPassword = () => {
    setHidePassword(!hidePassword)
  }

  // Delete user
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

  // Change password
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
          source={chosenAvatar}
        />
        <View style={styles.signOutWrapper}>
          <TouchableOpacity style={styles.signOutBtn} onPress={() => logout()}>
            <Text style={styles.signOutBtnText}>Sign out</Text>
            <MaterialIcons name='logout' size={15} color='black' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.avatarBtn} onPress={() => changeAvatar()}>
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
            <View style={styles.modalHeader}>
              <Text style={styles.userInfoSubTitle}>New password</Text>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <AntDesign name='close' size={25} color='black' style={styles.closeModal} />
              </TouchableOpacity>
            </View>
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
            <View style={styles.modalHeader}>
              <Text style={styles.userInfoSubTitle}>Are you sure you want to delete user?</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <AntDesign name='close' size={25} color='black' style={styles.closeModal2} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={deleteUserSubmit} style={styles.deleteBtn}>
              <Text style={styles.userBtnTxt}>Yes, delete user</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.userBtn}>
              <Text style={styles.userBtnTxt}>No, go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'slide'}
        transparent
        visible={avatarModal}
        backdropOpacity={0.3}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.avatarPicker}>
              {avatars.map((avatar) => (
                <TouchableOpacity key={avatar.id} onPress={() => setChosenAvatar(avatar.name)}>
                  <LottieView
                    key={avatar.id}
                    autoPlay
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'transparent',
                    }}
                    source={avatar.name}
                  />
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setAvatarModal(false)}>
                <AntDesign name='close' size={28} color='black' style={styles.closeAvatarModal} />
              </TouchableOpacity>
            </View>
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
  avatarPicker: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
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
  closeModal: {
    right: -65,
    top: -10,
  },
  closeModal2: {
    right: -22,
    top: -10,
  },
  closeAvatarModal: {
    top: -35,
    right: 10,
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
  modalHeader: {
    flexDirection: 'row',
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
