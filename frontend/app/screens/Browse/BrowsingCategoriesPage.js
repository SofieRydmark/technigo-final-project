import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import categories from 'assets/jsonData/categories.json'

const BrowsCategoriesPage = ({ route, navigation }) => {
  const projectId = route.params.projectId
  const partyType = route.params.partyType

  let backgroundStyle
  if (partyType === 'grownup') {
    backgroundStyle = styles.grownupBackground
  } else if (partyType === 'kids') {
    backgroundStyle = styles.kidsBackground
  }

  return (
    <SafeAreaView
      style={[styles.background, backgroundStyle]}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={categories}
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(item.name, { partyType: partyType, projectId: projectId })
                }>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={[styles.itemNameContainer]}>
                  <Text style={styles.itemName}>{item.name}</Text>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 110,
  },
  flatList: {
    width: '95%',
    height: '80%',
  },
  grownupBackground: {
    backgroundColor: colors.green,
  },
  kidsBackground: {
    backgroundColor: colors.peach,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  item: {
    marginBottom: -65,
    marginHorizontal: 10,
  },
  itemNameContainer: {
    borderRadius: 8,
    zIndex: 99,
    top: '-50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 70,
    margin: 10,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.titles,
  },
})

export default BrowsCategoriesPage
