import React from 'react'
import { StatusBar } from 'expo-status-bar'

// Stack and navigators
import AuthStack from './app/navigators/AuthStack'
// import HomeStack from './app/navigators/HomeStack'
import BottomTabNavigator from './app/navigators/BottomTabNavigator'

// Provider and reducers
import { Provider, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from './app/reducers/user'
import { Loading } from './app/screens/Home/Loading'
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

  return (
    <>
      <StatusBar style='auto' />
      {accessToken === null ? <AuthStack /> : <BottomTabNavigator />}
      <Loading />
    </>
  )
}

export default AppWrapper
