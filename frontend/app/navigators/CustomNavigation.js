import React from 'react'

// Assets import
import { SimpleLineIcons } from '@expo/vector-icons'

// Navigators
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

// Screen imports
import {
  WhatAreWeDoing,
  WhatKindOfParty,
  Activities,
  BrowsingCategoriesPage,
  Decorations,
  FoodnDrinks,
  Themes,
  Profile,
  ProjectBoard,
  SingleProjectPage,
  GuestList,
  Budget,
  FindStore,
  Loading,
} from '../screens'
import ChooseProject from '../screens/Browse/ChooseProject'

const BackBtn = () => {
  return (
    <>
      <SimpleLineIcons name='arrow-left' size={24} color='black' />
    </>
  )
}

// Custom stack navigators for bottom tabs
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='WhatAreWeDoing'
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
      <Stack.Screen name='WhatAreWeDoing' component={WhatAreWeDoing} />
      <Stack.Screen name='Loading' component={Loading} />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='Food & Drinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='ChooseProject' component={ChooseProject} />
    </Stack.Navigator>
  )
}

export { HomeNavigator }

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}
export { ProfileNavigator }

const ProjectNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProjectBoard'
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
      <Stack.Screen name='Loading' component={Loading} />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='Food & Drinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ChooseProject' component={ChooseProject} />
    </Stack.Navigator>
  )
}
export { ProjectNavigator }

const BrowseNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='ChooseProject'
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
      <Stack.Screen name='Loading' component={Loading} />
      <Stack.Screen name='ChooseProject' component={ChooseProject} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='Food & Drinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}
export { BrowseNavigator }
