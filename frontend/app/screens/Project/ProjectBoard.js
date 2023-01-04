import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'
import { StackActions } from '@react-navigation/native'

const ProjectBoard = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  useEffect(() => {
    if (!accessToken) {
      navigation.dispatch(StackActions.replace('SignIn'))
    }
  }, [accessToken])

  return (
    <ScrollView contentContainerStyle={styles.background}>
      {accessToken && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerH1}>Hello {email}, this is your projectboard</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProjectBoard')}>
            <Text>Project</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BrowsingCategoriesPage')}>
            <Text>Brows Categories </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },
})
export default ProjectBoard
