import { StyleSheet } from "react-native"
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'

// Profile screen styles
export const ProfileStyles = StyleSheet.create({
    avatarWrapper: {
      top: 40,
      padding: 40,
    },
    avatarBtn: {
      position: 'absolute',
      right: 40,
      bottom: 50,
      padding: 5,
      backgroundColor: colors.lightGrey,
      borderRadius: 50,
    },
    avatarPicker: {
      flexDirection: 'row',
      paddingTop: 20,
      paddingBottom: 20,
    },
    background: {
      flex: 1,
      backgroundColor: colors.green,
      padding: 20,
    },
    container: {
      borderRadius: 20,
      padding: 20,
      width: '100%',
      backgroundColor: colors.white,
      padding: 20,
    },
    closeModal: {
      right: -65,
      top: -10,
    },
    closeModal2: {
      right: -22,
      top: -10,
    },
    closeAvatarModal: {
      top: -35,
      right: 10,
    },
    confirmBtn: {
      borderRadius: 8,
      backgroundColor: colors.peach,
      width: 150,
      padding: 5,
    },
    eyeIcon: {
      color: colors.darkGrey,
      zIndex: 10,
      position: 'absolute',
      right: 20,
      bottom: 35,
    },
    form: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    userEmail: {
      fontSize: 15,
      fontFamily: fonts.button,
      marginBottom: 10,
    },
    userBtnWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userBtn: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 10,
      width: '100%',
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.peach,
      textAlign: 'center',
    },
    deleteBtn: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 10,
      width: '100%',
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.fail,
      textAlign: 'center',
    },
    userBtnTxt: {
      color: colors.black,
      fontFamily: fonts.button,
      fontSize: 16,
    },
    userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
    },
    userInfoItem: {
      justifyContent: 'center',
    },
    userInfoProjectNb: {
      fontSize: 15,
      fontFamily: fonts.button,
      marginBottom: 5,
      textAlign: 'center',
    },
    userInfoSubTitle: {
      fontSize: 18,
      fontFamily: fonts.text,
      textTransform: 'uppercase',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    input: {
      backgroundColor: colors.lightGrey,
      marginBottom: 20,
      marginTop: 10,
      borderWidth: 1,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      fontFamily: fonts.text,
      borderColor: colors.lightGrey,
      color: colors.darkGrey,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      width: '90%',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
      flexDirection: 'row',
    },
    signOutWrapper: {
      position: 'absolute',
      top: 10,
      right: -20,
    },
    signOutBtn: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signOutBtnText: {
      fontSize: 15,
      fontFamily: fonts.text,
    },
  })