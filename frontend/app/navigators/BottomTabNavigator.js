import React from 'react'
import { StyleSheet } from 'react-native'

// React native navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

// components and screens
import { Profile, ProjectBoard, WhatAreWeDoing, WhatKindOfParty } from '../screens'
// import { HomeStack } from '../navigators/AuthStack'

// config
import colors from '../config/colors'

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons'

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.white,
          borderRadius: 15,
          margin: 10,
          paddingBottom: 20,
          paddingTop: 5,
          elevation: 0,
          borderTopWidth: 0,
          height: 70,
          ...styles.shadow,
        },
        tabBarActiveTintColor: colors.green,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName

          if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline'
          } else if (route.name === 'Projects') {
            iconName = focused ? 'folder-heart' : 'folder-heart-outline'
          } else if (route.name === 'Browse') {
            iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline'
          }

          return <MaterialCommunityIcons name={iconName} size={22} color={color} />
        },
      })}>
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          // tabBarButton: (props) => <CustomTabBarButton route='Profile' {...props} />,
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name='Projects'
        component={ProjectBoard}
        options={{
          // tabBarButton: (props) => <CustomTabBarButton route='ProjectBoard' {...props} />,
          tabBarLabel: 'ProjectBoard',
        }}
      />
      <Tab.Screen
        name='Browse'
        component={WhatKindOfParty}
        options={{
          // tabBarButton: (props) => <CustomTabBarButton route='Browse' {...props} />,
          tabBarLabel: 'Browse ideas',
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.5,
    elevation: 5,
  },
})

export default BottomTabNavigator
