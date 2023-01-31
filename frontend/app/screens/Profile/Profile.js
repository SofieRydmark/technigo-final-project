import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import {
  Modal,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native'

// Assets import
import { ProfileStyles } from 'components/ProfileStyling/ProfileScreen.styling'
import colors from 'assets/styling/colors'
import { ADMIN_DELETE_URL, ADMIN_PASSWORD_URL, PROJECTS_URL } from 'assets/urls/urls.js'

// Form handler and validation Yup
import { Formik } from 'formik'
import * as Yup from 'yup'
const ReviewSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Must be min 8 characters').required('Password is required'),
})

// Lottie animation, avatars and icons
import LottieView from 'lottie-react-native'
import { MaterialIcons, AntDesign, Octicons } from '@expo/vector-icons'
import avatars from 'assets/lotties/avatars.js'

// Reducer
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordError, setPasswordError] = useState(null)
  const [avatarModal, setAvatarModal] = useState(false)
  const [chosenAvatar, setChosenAvatar] = useState(avatars[2].name)
  const [allProjects, setAllProjects] = useState([])
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

    fetch(ADMIN_DELETE_URL(userId), options) // delete user URL
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

    fetch(ADMIN_PASSWORD_URL(userId), options) // change password URL
      .then((res) => res.json())
      .then((data) => setPasswordError(data.response))
      .catch((error) => console.error(error))
  }

  // Project counter on profile screen
  const projectCounter = () => {
    useEffect(() => {
      dispatch(ui.actions.setLoading(true))
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      }
      fetch(PROJECTS_URL(userId), options)
        .then((res) => res.json())
        .then((data) => setAllProjects(data.response))
        .catch((error) => console.log(error))
        .finally(() => dispatch(ui.actions.setLoading(false)))
    }, [allProjects])

    return allProjects.length
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
      ProfileStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ProfileStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <ScrollView
      style={ProfileStyles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={ProfileStyles.avatarWrapper}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            backgroundColor: colors.green,
          }}
          source={chosenAvatar}
        />
        <View style={ProfileStyles.signOutWrapper}>
          <TouchableOpacity style={ProfileStyles.signOutBtn} onPress={() => logout()}>
            <Text style={ProfileStyles.signOutBtnText}>Sign out</Text>
            <MaterialIcons name='logout' size={15} color='black' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={ProfileStyles.avatarBtn} onPress={() => changeAvatar()}>
          <MaterialIcons name='edit' size={20} color='black' />
        </TouchableOpacity>
      </View>
      <View style={[ProfileStyles.container, ProfileStyles.boxShadow]}>
        <View style={ProfileStyles.userInfoWrapper}>
          <View style={ProfileStyles.userInfoItem}>
            <Text style={ProfileStyles.userInfoSubTitle}>Email</Text>
            <Text style={ProfileStyles.userEmail}>{email}</Text>
            <Text style={ProfileStyles.userInfoSubTitle}>Projects</Text>
            <Text style={ProfileStyles.userInfoProjectNb}>{projectCounter()}</Text>
          </View>
        </View>
        <View style={ProfileStyles.userBtnWrapper}>
          <TouchableOpacity
            style={[ProfileStyles.userBtn, ProfileStyles.boxShadow]}
            onPress={() => setShowPasswordModal(true)}>
            <Text style={ProfileStyles.userBtnTxt}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ProfileStyles.userBtn, ProfileStyles.boxShadow]}
            onPress={() => setShowDeleteModal(true)}>
            <Text style={ProfileStyles.userBtnTxt}>Delete user</Text>
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
        <View style={ProfileStyles.modalBackground}>
          <View style={ProfileStyles.modalContent}>
            <View style={ProfileStyles.modalHeader}>
              <Text style={ProfileStyles.userInfoSubTitle}>New password</Text>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <AntDesign name='close' size={25} color='black' style={ProfileStyles.closeModal} />
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
                <View style={ProfileStyles.form}>
                  <TextInput
                    label='password'
                    style={ProfileStyles.input}
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
                      style={ProfileStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                  {errors.email && touched.email ? (
                    <Text style={ProfileStyles.loginError}>{errors.email}</Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[ProfileStyles.userBtn, ProfileStyles.boxShadow]}>
                    <Text style={ProfileStyles.userBtnTxt}>Confirm</Text>
                  </TouchableOpacity>
                  {passwordError !== null && (
                    <Text style={ProfileStyles.passwordError}>{passwordError}</Text>
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
        <View style={ProfileStyles.modalBackground}>
          <View style={ProfileStyles.modalContent}>
            <View style={ProfileStyles.modalHeader}>
              <Text style={ProfileStyles.userInfoSubTitle}>Are you sure you want to delete user?</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <AntDesign name='close' size={25} color='black' style={ProfileStyles.closeModal2} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={deleteUserSubmit}
              style={[ProfileStyles.deleteBtn, ProfileStyles.boxShadow]}>
              <Text style={ProfileStyles.userBtnTxt}>Yes, delete user</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDeleteModal(false)}
              style={[ProfileStyles.userBtn, ProfileStyles.boxShadow]}>
              <Text style={ProfileStyles.userBtnTxt}>No, go back</Text>
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
        <View style={ProfileStyles.modalBackground}>
          <View style={ProfileStyles.modalContent}>
            <View style={ProfileStyles.avatarPicker}>
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
                <AntDesign name='close' size={28} color='black' style={ProfileStyles.closeAvatarModal} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Profile
