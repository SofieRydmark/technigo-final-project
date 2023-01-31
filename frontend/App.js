import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'

// Stack and navigators
import AuthStack from './app/navigators/AuthStack'
import BottomTabNavigator from './app/navigators/BottomTabNavigator'

// Fonts and splashscreen config
import * as SplashScreen from 'expo-splash-screen'
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { Poppins_300Light, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins'

// Provider and reducers
import { Provider, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from './app/reducers/user'
import { ui } from './app/reducers/ui'

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
})
const store = configureStore({ reducer })

// Provider wrapper for app
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    LeagueSpartan: require('assets/customFonts/LeagueSpartan-Bold.otf'),
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <>
      <StatusBar style='auto' />
      {accessToken === null ? <AuthStack /> : <BottomTabNavigator />}
    </>
  )
}

export default AppWrapper
