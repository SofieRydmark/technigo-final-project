// import { NativeRouter, Routes, Route } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
// import WelcomeScreen from './app/screens/WelcomeScreen'
import SignUp from './app/screens/SignUp'

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
      <SignUp />
    </Provider>
  )
}

export default App
