import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'

// Assets import
import { WhatKindStyles } from 'components/BrowseStyling/WhatKindOfPartyScreen.styling'

const WhatKindOfParty = ({ navigation, route }) => {
  const projectId = route.params.projectId

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
      WhatKindStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      WhatKindStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <ScrollView contentContainerStyle={WhatKindStyles.background}>
      <View style={WhatKindStyles.header}>
        <Text style={WhatKindStyles.headerH1}>What kind of party do you need ideas for?</Text>
      </View>
      <View style={[WhatKindStyles.container, WhatKindStyles.boxShadow]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BrowsingCategoriesPage', {
              partyType: 'grownup',
              projectId: projectId,
            })
          }
          style={[WhatKindStyles.partyButton, WhatKindStyles.boxShadow]}>
          <Text style={WhatKindStyles.buttonText}>Grown-up party</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BrowsingCategoriesPage', {
              partyType: 'kids',
              projectId: projectId,
            })
          }
          style={[WhatKindStyles.partyButton, WhatKindStyles.boxShadow]}>
          <Text style={WhatKindStyles.buttonText}>Kids party</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default WhatKindOfParty
