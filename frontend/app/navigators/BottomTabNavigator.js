import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
// import CustomTabBarButton from '../components/CustomTabBarButton'
// import CustomTabBar from '../components/CustomTabBar'

import colors from '../config/colors'
import { Profile, BrowsingCategoriesPage, ProjectBoard } from '../screens'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: styles.tabBarStyle,
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
        screenOptions={{
          headerShown: false,
        }}
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
        component={BrowsingCategoriesPage}
        options={{
          // tabBarButton: (props) => <CustomTabBarButton route='Browse' {...props} />,
          tabBarLabel: 'Browse ideas',
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.white,
    paddingBottom: 20,
    paddingTop: 5,
    borderTopWidth: 0,
    height: 70,
  },
})
