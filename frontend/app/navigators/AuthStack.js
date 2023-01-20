import React from 'react'

// React native navigation
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator()

// Screen imports
import { ResetPassword, SignIn, SignUp } from '../screens'

// Navigation stack if you are not logged in
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: '',
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            paddingLeft: 13,
          },
        }}>
        <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
