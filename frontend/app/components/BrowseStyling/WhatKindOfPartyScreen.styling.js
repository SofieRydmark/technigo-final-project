import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// What kind of party screen styles
export const WhatKindStyles = StyleSheet.create({
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
    container: {
      borderRadius: 30,
      padding: 30,
      width: '90%',
      backgroundColor: colors.white,
    },
    header: {
      marginBottom: 30,
      marginHorizontal: 15,
    },
    headerH1: {
      fontSize: 25,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    partyButton: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      height: 70,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
  })