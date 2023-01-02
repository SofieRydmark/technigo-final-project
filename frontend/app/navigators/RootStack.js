import React from 'react'

import colors from '../config/colors'

// React native navigation stacks
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ProjectBoard from '../screens/ProjectBoard'
import WhatKindOfParty from '../screens/WhatKindOfParty'
import WhatAreWeDoing from '../screens/WhatAreWeDoing'

const Stack = createStackNavigator()

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.primary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName='SignIn'>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
        <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
        <Stack.Screen name='WhatAreWeDoing' component={WhatAreWeDoing} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
