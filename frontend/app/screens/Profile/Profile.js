import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'

// our colors
import colors from '../../config/colors'

// Lottie animation and icons
import LottieView from 'lottie-react-native'
import { MaterialIcons } from '@expo/vector-icons'

// Reducer
import user from '../../reducers/user'

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
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
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('ChangePassword')
            }}>
            <Text style={styles.userBtnTxt}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('DeleteUser')
            }}>
            <Text style={styles.userBtnTxt}>Delete user</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRadius: 30,
    padding: 10,
    width: '80%',
    backgroundColor: colors.white,
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
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    width: '80%',
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.peach,
    textAlign: 'center',
  },
  userBtnTxt: {
    color: colors.black,
    fontWeight: 'bold',
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
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#666',
    textAlign: 'center',
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
