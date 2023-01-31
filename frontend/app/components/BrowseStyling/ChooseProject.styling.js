import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Choose project screen styles
export const ChooseProjectStyles = StyleSheet.create({
    addProjectButton: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      top: -25,
      marginTop: -20,
      textAlign: 'center',
      borderRadius: 50,
      backgroundColor: colors.peach,
    },
    background: {
      flex: 1,
      backgroundColor: colors.green,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: fonts.button,
    },
    closeBtn: {
      right: -150,
      top: -30,
    },
    calendar: {
      flex: 1,
      paddingTop: 100,
      fontFamily: fonts.text,
      backgroundColor: colors.green,
      alignItems: 'center',
    },
    container: {
      borderRadius: 30,
      padding: 30,
      width: '90%',
      backgroundColor: colors.white,
    },
    doneButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      textAlign: 'center',
      width: '80%',
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
    doneButtonText: {
      fontSize: 20,
      fontFamily: fonts.button,
    },
    errorText: {
      fontFamily: fonts.text,
      color: 'red',
    },
    form: {
      borderRadius: 10,
      width: '100%',
      backgroundColor: colors.white,
    },
    header: {
      marginBottom: 30,
      marginHorizontal: 15,
    },
    headerH1: {
      fontSize: 25,
      textAlign: 'center',
      fontFamily: fonts.titles,
    },
    input: {
      padding: 20,
      backgroundColor: colors.lightGrey,
      borderWidth: 1,
      borderRadius: 12,
      fontSize: 12,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    inputDate: {
      fontFamily: fonts.input,
      fontSize: 17,
    },
    inputName: {
      fontFamily: fonts.input,
      fontSize: 17,
      marginBottom: 10,
    },
    keyboard: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    listWrapper: {
      borderRadius: 8,
      backgroundColor: colors.lightGrey,
      margin: 2,
    },
    moveToNext: {
      right: '-80%',
      top: '-100%',
    },
    row: {
      paddingHorizontal: 15,
      paddingTop: 15,
      fontSize: 18,
      fontFamily: fonts.text,
    },
    partyButton: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      height: 70,
      borderRadius: 8,
      backgroundColor: colors.peach,
      fontFamily: fonts.button,
    },
    pressable: {
      flex: 1,
      background: 'transparent',
    },
  })
