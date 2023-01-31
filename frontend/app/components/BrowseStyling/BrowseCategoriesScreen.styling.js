import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Browse screen styles
export const BrowseStyles = StyleSheet.create({
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