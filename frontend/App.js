import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

// stack navigators
import AuthStack from './app/navigators/AuthStack'
import HomeStack from './app/navigators/HomeStack'

// provider and reducer
import { Provider, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import user from './app/reducers/user'
const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

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
      {accessToken === null ? <AuthStack /> : <HomeStack />}
    </>
  )
}

export default AppWrapper
