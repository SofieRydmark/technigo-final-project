import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  Button,
} from 'react-native'

import colors from '../config/colors'
import user from '../reducers/user'

const BrowsCategoriesPage = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const dispatch = useDispatch()

  const logout = () => {
    console.log('logged out')
    dispatch(user.actions.setEmail(null))
    dispatch(user.actions.setAccessToken(null))
  }

  console.log('accesstoken null', accessToken)

  useEffect(() => {
    if (!accessToken) {
      navigation.navigate('SignIn')
    }
  }, [accessToken])

  return(
    <ScrollView contentContainerStyle={styles.background}>
    {accessToken && (
    <View>
        
        <Button 
        onPress={() => navigation.navigate('Themes')}
        title= 'Themes'>
            Themes
        </Button>

        <Button 
        onPress={() =>navigation.navigate('Decorations')}
        title= "Decorations">
            Decorations
        </Button>

        <Button 
        onPress={() => navigation.navigate('FoodnDrinks')}
        title= "Food and Drinks">
            Food & Drinks 
        </Button>

        <Button 
        onPress={() => navigation.navigate('Activities')}
        title= "Activity">
            Activities
        </Button>

        <TouchableOpacity onPress={logout}>
            <Text>Sign out</Text>
        </TouchableOpacity>

    </View>
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default BrowsCategoriesPage