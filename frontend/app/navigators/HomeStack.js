import React from 'react'

// Our colors
import colors from '../config/colors'

// React native navigation
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import BottomTabNavigator from './BottomTabNavigator'
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
  Settings,
  SingleProjectPage,
  GuestList,
  Budget,
  FindStore,
} from '../screens'

// Navigation stack if you are logged in
const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='WhatAreWeDoing'
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
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='WhatKindOfParty' component={WhatKindOfParty} />
        <Stack.Screen name='BrowsingCategoriesPage' component={BrowsingCategoriesPage} />
        <Stack.Screen name='FoodnDrinks' component={FoodnDrinks} />
        <Stack.Screen name='Themes' component={Themes} />
        <Stack.Screen name='Decorations' component={Decorations} />
        <Stack.Screen name='Activities' component={Activities} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeStack
