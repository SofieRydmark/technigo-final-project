import React from 'react'

// React native navigation
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator()

// Screen imports
import { SignIn, SignUp } from '../screens'

// Navigation stack if you are not logged in
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
