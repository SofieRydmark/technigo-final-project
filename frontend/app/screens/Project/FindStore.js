import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

// Geolocation and map packages
import * as Location from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

// Assets import
import mapStyling from 'assets/styling/mapStyling.json'
import colors from 'assets/styling/colors.js'
import storeList from 'assets/storeList/stores.json'
import findStore from 'assets/jsonData/findStore.json'
import fonts from 'assets/styling/fonts.js'

// Icons
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

const FindStore = () => {
  const [location, setLocation] = useState({
    latitude: 59.32944625683492,
    longitude: 18.07057655623167,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const setMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return errorMsg
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }
  // *** BOX SHADOW STYLING FUNCTION IOS & ANDROID *** //
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      styles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Find a store</Text>
        <TouchableOpacity style={styles.locationBtn} onPress={() => setMyLocation()}>
          <Text style={styles.locationTxt}>Use my current location</Text>
          <Ionicons name='location-outline' size={30} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          region={location}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyling}>
          <Marker coordinate={location} title='You' pinColor={colors.lightYellow}>
            <MaterialCommunityIcons name='panda' size={40} color='black' />
          </Marker>
          {findStore.map((item) => (
            <Marker key={item.id} title={item.company} coordinate={item.coordinates}>
              <Ionicons name='location-outline' size={40} color='black' />
            </Marker>
          ))}
        </MapView>

        <TouchableOpacity
          style={[styles.onlineBtn, styles.boxShadow]}
          onPress={() => setShowModal(true)}>
          <Text style={styles.onlineTxt}>Want to shop online instead? Here are some tips</Text>
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent
          visible={showModal}
          backdropOpacity={0.3}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <AntDesign name='close' size={25} color='black' style={styles.closeModal} />
              </TouchableOpacity>
              <View style={styles.storeList}>
                {storeList.map((store) => (
                  <Text key={store.id} style={styles.storeTxt}>
                    {store.name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
export default FindStore
