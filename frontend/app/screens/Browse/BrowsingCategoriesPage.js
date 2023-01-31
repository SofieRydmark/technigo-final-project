import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'

// Assets import
import { BrowseStyles } from 'components/BrowseStyling/BrowseCategoriesScreen.styling'
import categories from 'assets/images/browseImages.json'

const BrowsCategoriesPage = ({ route, navigation }) => {
  const projectId = route.params.projectId
  const partyType = route.params.partyType

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = BrowseStyles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = BrowseStyles.kidsBackground
  }

  return (
    <SafeAreaView
      style={[BrowseStyles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={BrowseStyles.container}>
        <FlatList
          style={BrowseStyles.flatList}
          data={categories}
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={({ item }) => (
            <View style={BrowseStyles.item}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(item.name, { partyType: partyType, projectId: projectId })
                }>
                <Image source={{ uri: item.image }} style={BrowseStyles.image} />
                <View style={[BrowseStyles.itemNameContainer]}>
                  <Text style={BrowseStyles.itemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  )
}

export default BrowsCategoriesPage
