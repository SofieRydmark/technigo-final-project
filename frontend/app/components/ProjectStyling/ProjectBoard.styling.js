import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Project board screen styles
export const ProjectBoardStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.green,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: '90%',
      backgroundColor: colors.white,
      borderRadius: 10,
      padding: 10,
    },
    closeBtn: {
      right: -150,
      top: -30,
    },
    calendar: {
      fontFamily: fonts.text,
      backgroundColor: colors.green,
      alignItems: 'center',
    },
    modalContainer: {
      paddingTop: 100,
      flex: 1,
      backgroundColor: colors.green,
      alignItems: 'center',
    },
    headerH1: {
      marginTop: 65,
      fontSize: 30,
      textAlign: 'center',
      fontFamily: fonts.titles,
    },
    headerH2: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: fonts.text,
      textTransform: 'uppercase',
      color: colors.darkGrey,
      textAlign: 'center',
    },
    projectListH3: {
      textTransform: 'uppercase',
      alignSelf: 'flex-start',
      fontFamily: fonts.text,
      color: colors.darkGrey,
      fontSize: 18,
      paddingLeft: 15,
      paddingTop: 15,
      paddingBottom: 5,
    },
    // single item styling
    flatList: {
      width: '95%',
      maxHeight: 330,
    },
    listItem: {
      borderRadius: 10,
      margin: 5,
      padding: 18,
      backgroundColor: colors.lightGrey,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    row1: {
      paddingLeft: 12,
      fontSize: 18,
      fontFamily: fonts.text,
    },
    row2: {
      paddingLeft: 12,
      fontSize: 16,
      fontFamily: fonts.text,
    },
    // add new project input + button styling
    input: {
      backgroundColor: colors.white,
      margin: 20,
      borderWidth: 1,
      padding: 20,
      borderRadius: 12,
      width: 250,
      fontFamily: fonts.input,
      borderColor: colors.lightGrey,
    },
    findAddButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      flexDirection: 'row',
      textAlign: 'center',
      alignSelf: 'center',
      width: '50%',
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
    buttonText: {
      fontSize: 17,
      fontFamily: fonts.button,
    },
    calendar: {
      fontFamily: fonts.text,
      backgroundColor: colors.green,
      alignItems: 'center',
    },
    doneButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      textAlign: 'center',
      width: 200,
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
    errorText: {
      fontFamily: fonts.text,
      color: 'red',
    },
  })
  