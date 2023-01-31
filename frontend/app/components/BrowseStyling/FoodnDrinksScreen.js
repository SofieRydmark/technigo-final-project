import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Food and drinks screen styles
export const FoodDrinkStyles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    grownupBackground: {
      backgroundColor: colors.green,
      textDecorationLine: true,
    },
    kidsBackground: {
      backgroundColor: colors.peach,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    arrows: {
      flexDirection: 'row',
    },
    input: {
      backgroundColor: colors.lightGrey,
      width: '85%',
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      fontFamily: fonts.text,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    flatList: {
      width: '90%',
      marginVertical: 30,
    },
    h1: {
      marginBottom: 10,
      marginTop: 60,
      fontFamily: fonts.titles,
      fontSize: 30,
      textDecorationColor: 'red',
    },
    item: {
      width: '50%',
      marginBottom: -70,
      padding: 2,
    },
    itemNameContainer: {
      borderRadius: 8,
      zIndex: 99,
      top: '-50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      height: 73,
      width: '87%',
      alignSelf: 'center',
    },
    itemName: {
      fontSize: 14,
      fontFamily: fonts.titles,
      textTransform: 'capitalize',
    },
    image: {
      width: '100%',
      height: 120,
      alignSelf: 'center',
      borderRadius: 8,
    },
    headerWrapper: {
      flexDirection: 'row',
    },
  })