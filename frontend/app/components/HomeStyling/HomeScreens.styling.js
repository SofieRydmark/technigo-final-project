import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Sign in screen styles
export const SignInStyles = StyleSheet.create({
    background: {
      alignItems: 'center',
      flex: 1,
    },
    backgroundBubble: {
      justifyContent: 'center',
      flex: 1,
    },
    buttonText: {
      fontSize: 20,
      fontFamily: fonts.button,
    },
    eyeIcon: {
      color: colors.darkGrey,
      zIndex: 10,
      position: 'absolute',
      right: 10,
      bottom: 35,
    },
    form: {
      borderRadius: 10,
      padding: 25,
      width: '80%',
      backgroundColor: colors.white,
      zIndex: 99,
    },
    forgotPassword: {
      marginTop: 20,
      fontSize: 16,
      fontFamily: fonts.text,
      color: colors.black,
      textAlign: 'center',
    },
    header: {
      marginBottom: 30,
      marginTop: 150,
    },
    headerH1: {
      fontSize: 35,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    headerH2: {
      fontSize: 16,
      fontFamily: fonts.text,
      textAlign: 'center',
    },
    here: {
      fontFamily: fonts.button,
    },
    keyboard: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    input: {
      backgroundColor: colors.lightGrey,
      marginBottom: 20,
      marginTop: 10,
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      fontFamily: fonts.input,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    label: {
      fontSize: 15,
      color: colors.darkGrey,
      fontFamily: fonts.text,
    },
    loginError: {
      fontSize: 15,
      color: 'red',
      marginBottom: 15,
      marginTop: -15,
    },
    pressable: {
      flex: 1,
      background: 'transparent',
    },
    signInButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      textAlign: 'center',
      width: '100%',
      height: 70,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
  })

  // Sign up screen styles
  export const SignUpStyles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundBubble: {
      flex: 1,
    },
    buttonText: {
      fontSize: 20,
      fontFamily: fonts.button,
    },
    eyeIcon: {
      color: colors.darkGrey,
      zIndex: 10,
      position: 'absolute',
      right: 10,
      bottom: 35,
    },
    form: {
      borderRadius: 10,
      padding: 25,
      width: '80%',
      backgroundColor: colors.white,
    },
    header: {
      marginBottom: 20,
    },
    headerH1: {
      fontSize: 30,
      fontFamily: fonts.titles,
      textAlign: 'center',
    },
    headerH2: {
      fontSize: 16,
      fontFamily: fonts.text,
      textAlign: 'center',
    },
    here: {
      fontFamily: fonts.button,
    },
    keyboard: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    input: {
      backgroundColor: colors.lightGrey,
      marginBottom: 20,
      marginTop: 10,
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      fontFamily: fonts.input,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    label: {
      fontSize: 15,
      fontFamily: fonts.text,
      color: colors.darkGrey,
    },
    loginError: {
      fontSize: 15,
      color: 'red',
      marginBottom: 15,
      marginTop: -15,
    },
    passwordInput: {
      position: 'relative',
    },
    pressable: {
      flex: 1,
      background: 'transparent',
    },
    signUpButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      textAlign: 'center',
      width: '100%',
      height: 70,
      borderRadius: 8,
      backgroundColor: colors.peach,
    },
  })

  // Reset Password screen styles
 export const ResetStyles = StyleSheet.create({
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
    emailSent: {
      fontFamily: fonts.text,
      textAlign: 'center',
      padding: 10,
      fontSize: 16,
      color: colors.green,
    },
    header: {
      marginBottom: 30,
      marginHorizontal: 15,
    },
    headerH1: {
      fontSize: 18,
      fontFamily: fonts.text,
      textAlign: 'center',
    },
    input: {
      backgroundColor: colors.lightGrey,
      marginBottom: 20,
      marginTop: 10,
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      fontFamily: fonts.input,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    keyboard: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    loginError: {
      fontSize: 15,
      color: 'red',
      marginBottom: 15,
      marginTop: -15,
    },
    pressable: {
      flex: 1,
      background: 'transparent',
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

  // What are we doing today screen styles
  export const WhatAreWeDoingStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.green,
      alignItems: 'center',
      justifyContent: 'center',
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
    pressable: {
      flex: 1,
      background: 'transparent',
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
