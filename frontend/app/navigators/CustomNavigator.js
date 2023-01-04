import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

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

const Stack = createStackNavigator()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Screen1' component={Screen1} />
      <Stack.Screen name='NestedScreen' component={NestedScreen} />
    </Stack.Navigator>
  )
}
export { ProfileNavigator }

const ProjectNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Screen2' component={Screen2} />
      <Stack.Screen name='NestedScreen' component={NestedScreen} />
    </Stack.Navigator>
  )
}
export { ProjectNavigator }

const BrowseNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Screen3' component={Screen3} />
      <Stack.Screen name='NestedScreen' component={NestedScreen} />
    </Stack.Navigator>
  )
}
export { BrowseNavigator }
