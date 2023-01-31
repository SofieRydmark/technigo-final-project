import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Budget screen styles
export const BudgetStyles = StyleSheet.create({
    background: {
      backgroundColor: colors.green,
      flex: 1,
    },
    headerH1: {
      marginTop: 100,
      fontSize: 30,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    partyButton: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 10,
      width: '50%',
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
    inputContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input: {
      marginBottom: 10,
      backgroundColor: colors.lightGrey,
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 18,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
      fontFamily: fonts.input,
    },
    inputBox: {
      width: 150,
      marginHorizontal: 10,
    },
    buttonContainer: {
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    changeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '40%',
      height: 45,
      borderRadius: 12,
      backgroundColor: colors.peach,
    },
    budgetContainer: {
      flexDirection: 'row',
      marginTop: 20,
      padding: 15,
      backgroundColor: colors.lightGrey,
      borderRadius: 12,
    },
    leftColumn: {
      flex: 1,
      alignItems: 'flex-start',
    },
    rightColumn: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row-reverse',
    },
    deleteButton: {
      marginLeft: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 100,
      textAlign: 'center',
    },
    buttonText: {
      fontFamily: fonts.button,
      fontSize: 18,
    },
    text: {
      fontFamily: fonts.text,
      fontSize: 18,
    },
    textTotal: {
      fontFamily: fonts.button,
      fontSize: 18,
    },
    whiteContainer: {
      backgroundColor: colors.white,
      marginTop: 40,
      padding: 30,
      borderRadius: 15,
      width: '85%',
    },
    smallHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      textAlign: 'center',
      paddingRight: 50,
      paddingLeft: 50,
    },
    headingh3: {
      fontFamily: fonts.text,
      textTransform: 'uppercase',
      fontSize: 20,
      color: colors.darkGrey,
    },
  })
// Find store screen styles
export const FindStoreStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.green,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    closeModal: {
      top: 0,
      right: -130,
    },
    header: {
      top: -50,
      padding: 10,
      marginBottom: 10,
    },
    headerH1: {
      fontSize: 35,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    mapWrapper: {
      height: 350,
      width: 350,
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationBtn: {
      width: '100%',
      padding: 5,
      textAlign: 'center',
      fontSize: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationTxt: {
      fontSize: 16,
      textDecorationLine: 'underline',
      fontFamily: fonts.text,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      width: '90%',
      padding: 30,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    onlineBtn: {
      borderRadius: 8,
      backgroundColor: colors.peach,
      width: '80%',
      padding: 13,
      textAlign: 'center',
      marginTop: 20,
    },
    onlineTxt: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: fonts.button,
    },
    storeList: {
      flexDirection: 'column',
      marginTop: -20,
    },
    storeTxt: {
      fontSize: 20,
      textTransform: 'uppercase',
    },
  })

// Guestlist screen styles
export const GuestListStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.green,
      alignItems: 'center',
      flex: 1,
      paddingVertical: 60,
    },
    headerH1: {
      marginTop: 50,
      fontSize: 30,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    pressable: {
      flex: 1,
      background: 'transparent',
    },
    wrapper: {
      marginBottom: 30,
      marginTop: 20,
    },
    listWrapper: {
      flexDirection: 'row',
      backgroundColor: colors.lightGrey,
      borderRadius: 10,
      flexWrap: 'wrap',
      margin: 2,
    },
    // single item styling
    row: {
      padding: 15,
      fontSize: 20,
      fontFamily: fonts.text,
    },
    // maping + formik with white background
    form: {
      borderRadius: 10,
      padding: 30,
      width: '90%',
      backgroundColor: colors.white,
    },
    // add new guest input + button styling
    addGuestButton: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      top: -20,
      right: 5,
      marginTop: -20,
      textAlign: 'center',
      borderRadius: 50,
      backgroundColor: colors.peach,
    },
    input: {
      padding: 25,
      justifyContent: 'center',
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      borderColor: 'transparent',
      backgroundColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    //delete icon styling
    trashIcon: {
      zIndex: 10,
      position: 'absolute',
      right: 10,
      bottom: 1,
    },
  })