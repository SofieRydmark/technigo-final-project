import React from 'react'

import colors from '../config/colors'

// React native navigation stacks
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator()

// Screens
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
    <Stack.Navigator
      initialRouteName='SignIn'
      options={() => ({
        tabBarStyle: {
          display: 'none',
        },
        tabBarButton: () => null,
      })}
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
      }}>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='WhatAreWeDoing' component={WhatAreWeDoing} />
    </Stack.Navigator>
  )
}
export const ProjectStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProjectBoard'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProject' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
    </Stack.Navigator>
  )
}

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

export const BrowseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='WhatKindOfParty'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
    </Stack.Navigator>
  )
}

export const RootStack = () => {
  return (
    <NavigationContainer>
      <HomeStack />
      <ProfileStack />
      <ProjectStack />
      <BrowseStack />
    </NavigationContainer>
  )
}
