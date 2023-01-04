import React from 'react'
import { StyleSheet } from 'react-native'

// React native navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
const Tab = createBottomTabNavigator()

// Components and screens
import {
  HomeNavigator,
  ProfileNavigator,
  ProjectNavigator,
  BrowseNavigator,
} from './CustomNavigation'

// Our colors
import colors from '../config/colors'

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons'

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
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

            if (route.name === 'HomeNavigator') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'ProfileNavigator') {
              iconName = focused ? 'account' : 'account-outline'
            } else if (route.name === 'ProjectNavigator') {
              iconName = focused ? 'folder-heart' : 'folder-heart-outline'
            } else if (route.name === 'BrowseNavigator') {
              iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline'
            }

            return <MaterialCommunityIcons name={iconName} size={22} color={color} />
          },
        })}>
        <Tab.Screen
          name='HomeNavigator'
          component={HomeNavigator}
          options={{
            // tabBarButton: (props) => <CustomTabBarButton route='Profile' {...props} />,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name='ProfileNavigator'
          component={ProfileNavigator}
          options={{
            // tabBarButton: (props) => <CustomTabBarButton route='Profile' {...props} />,
            tabBarLabel: 'Profile',
          }}
        />
        <Tab.Screen
          name='ProjectNavigator'
          component={ProjectNavigator}
          options={{
            // tabBarButton: (props) => <CustomTabBarButton route='ProjectBoard' {...props} />,
            tabBarLabel: 'Projects',
          }}
        />
        <Tab.Screen
          name='BrowseNavigator'
          component={BrowseNavigator}
          options={{
            // tabBarButton: (props) => <CustomTabBarButton route='Browse' {...props} />,
            tabBarLabel: 'Browse ideas',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
