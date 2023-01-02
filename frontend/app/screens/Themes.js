import React from 'react'
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

const Themes = ()  => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const email = useSelector((store) => store.user.email)
    const dispatch = useDispatch()
  
    const logout = () => {
      console.log('logged out')
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setAccessToken(null))
    }
  
    useEffect(() => {
      if (!accessToken) {
        navigation.navigate('SignIn')
      }
    }, [accessToken])

    
    return(
        <>
        
        <TouchableOpacity onPress={logout}>
            <Text>Sign out</Text>
        </TouchableOpacity>
        </>
    )
}

export default Themes

