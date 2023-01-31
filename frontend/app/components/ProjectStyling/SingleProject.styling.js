import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Single project screen styles
export const SingleProjectStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.green,
    },
    // styling headers
    headerH1: {
      fontSize: 25,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    headerh2: {
      fontSize: 16,
      fontFamily: fonts.labels,
      textAlign: 'left',
      marginVertical: 6,
    },
    headerH4: {
      fontSize: 17,
      fontFamily: fonts.text,
      textAlign: 'center',
    },
    headerContainer: {
      marginTop: 80,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: 20,
    },
    itemWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 10,
      backgroundColor: colors.lightGrey,
      marginBottom: 5,
      padding: 15,
    },
    listWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 10,
      backgroundColor: colors.lightGrey,
      marginBottom: 5,
      padding: 15,
    },
    whiteWrapper: {
      borderRadius: 10,
      padding: 25,
      backgroundColor: colors.white,
    },
    // single item styling
    text: {
      fontFamily: fonts.text,
      fontSize: 17,
      textTransform: 'capitalize',
    },
    icon: {
      padding: 5,
    },
    icons: {
      flexDirection: 'row',
    },
  
    // styling change name
    input: {
      backgroundColor: colors.white,
      marginBottom: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 12,
      fontSize: 16,
      width: 200,
      fontFamily: fonts.input,
      borderColor: colors.lightGrey,
      placeholderColor: colors.black,
      paddingLeft: 20,
      paddingRight: 20,
    },
  
    // styling buttons
    buttonText: {
      fontFamily: fonts.button,
      textAlign: 'center',
    },
    closeBtn: {
      right: -150,
      top: -30,
    },
    partyButton: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
      width: 120,
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
  
    submitButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      textAlign: 'center',
      width: 200,
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
    guestBudgetButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 0,
      borderRadius: 8,
      marginBottom: 2,
    },
  
    changeNameContainer: {
      fontFamily: fonts.text,
      backgroundColor: colors.green,
      alignItems: 'center',
      paddingBottom: 300,
      paddingTop: 50,
    },
    changeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 0,
      borderRadius: 8,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20,
      alignItems: 'center',
    },
    calendar: {
      fontFamily: fonts.text,
      backgroundColor: colors.green,
      alignItems: 'center',
    },
    modalContainer: {
      paddingTop: 100,
      backgroundColor: colors.green,
      paddingBottom: 100,
      alignItems: 'center',
    },
    changeBtn: {
      position: 'absolute',
      right: 5,
      bottom: 50,
      padding: 8,
      backgroundColor: colors.lightGrey,
      borderRadius: 50,
    },
  })