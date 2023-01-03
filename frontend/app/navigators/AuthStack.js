import React from 'react'

// React native navigation stacks
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
const Stack = createStackNavigator()

// Screen imports
import {
  SignIn,
  SignUp,
  WhatAreWeDoing,
  WhatKindOfParty,
  Activities,
  BrowsingCategoriesPage,
  Decorations,
  FoodnDrinks,
  Themes,
  Profile,
  ProjectBoard,
  Settings,
  SingleProjectPage,
  GuestList,
  Budget,
  FindStore,
} from '../screens'

export const HomeStack = () => {
  return (
    <BottomTabNavigator>
      <Stack.Navigator
        initialRouteName='WhatAreWeDoing'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='WhatAreWeDoing' component={WhatAreWeDoing} />
        <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
        <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
        <Stack.Screen name='SingleProject' component={SingleProjectPage} />
        <Stack.Screen name='Budget' component={Budget} />
        <Stack.Screen name='GuestList' component={GuestList} />
        <Stack.Screen name='FindStore' component={FindStore} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
        <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
        <Stack.Screen name='Themes' component={Themes} />
        <Stack.Screen name='Decorations' component={Decorations} />
        <Stack.Screen name='Activities' component={Activities} />
      </Stack.Navigator>
    </BottomTabNavigator>
  )
}

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
        <Stack.Screen name='HomeStack' component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
