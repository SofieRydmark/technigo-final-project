import React from 'react'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  Button,
} from 'react-native'

import colors from '../config/colors'

const BrowsCategoriesPage = ({ navigation }) => {
  return(
    <View>
        
        <Button 
        onPress={() => navigation.navigate('Themes')}
        title= 'Themes'>
            Themes
        </Button>

        <Button 
        onPress={() =>navigation.navigate('Decorations')}
        title= "Decorations">
            Decorations
        </Button>

        <Button 
        onPress={() => navigation.navigate('FoodnDrinks')}
        title= "Food and Drinks">
            Food & Drinks 
        </Button>

        <Button 
        onPress={() => navigation.navigate('Activities')}
        title= "Activity">
            Activities
        </Button>

    </View>
  )

}

export default BrowsCategoriesPage