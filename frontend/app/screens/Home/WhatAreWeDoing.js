import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'

// Assets imports
import { WhatAreWeDoingStyles } from 'components/HomeStyling/HomeScreens.styling'

const WhatAreWeDoing = ({ navigation }) => {
  // Box shadow styling IOS and android
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      WhatAreWeDoingStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      WhatAreWeDoingStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <ScrollView contentContainerStyle={WhatAreWeDoingStyles.background}>
      <View style={WhatAreWeDoingStyles.header}>
        <Text style={WhatAreWeDoingStyles.headerH1}>What are we doing today?</Text>
      </View>
      <View style={[WhatAreWeDoingStyles.container, WhatAreWeDoingStyles.boxShadow]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={[WhatAreWeDoingStyles.partyButton, WhatAreWeDoingStyles.boxShadow]}>
          <Text style={WhatAreWeDoingStyles.buttonText}>Go to my project board</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChooseProject')}
          style={[WhatAreWeDoingStyles.partyButton, WhatAreWeDoingStyles.boxShadow]}>
          <Text style={WhatAreWeDoingStyles.buttonText}>Choose your project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default WhatAreWeDoing
