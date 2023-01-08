import React from 'react'

// Our colors
import colors from '../config/colors'

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
} from '../screens'
import ChooseProject from '../screens/Browse/ChoosProject'

// Custom stack navigators for bottom tabs
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='WhatAreWeDoing'
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: colors.green,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}>
      <Stack.Screen
        name='WhatAreWeDoing'
        component={WhatAreWeDoing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
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
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='ChooseProject' component={ChooseProject} />
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
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}>
      <Stack.Screen
        name='WhatAreWeDoing'
        component={WhatAreWeDoing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
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
      initialRouteName='WhatKindOfParty'
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}>
      <Stack.Screen
        name='WhatAreWeDoing'
        component={WhatAreWeDoing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
      <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
      <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
      <Stack.Screen name='Themes' component={Themes} />
      <Stack.Screen name='Decorations' component={Decorations} />
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='ProjectBoard' component={ProjectBoard} />
      <Stack.Screen name='SingleProjectPage' component={SingleProjectPage} />
      <Stack.Screen name='Budget' component={Budget} />
      <Stack.Screen name='GuestList' component={GuestList} />
      <Stack.Screen name='FindStore' component={FindStore} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ChooseProject' component={ChooseProject} />
    </Stack.Navigator>
  )
}
export { BrowseNavigator }
