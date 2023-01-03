import React from 'react'
import { StatusBar } from 'expo-status-bar'

// navigator stack
import AuthStack from './app/navigators/AuthStack'
//import HomeStack from './app/navigators/HomeStack'

// provider and reducer
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from './app/reducers/user'
const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style='auto' />
      <AuthStack />
    </Provider>
  )
}

export default App
