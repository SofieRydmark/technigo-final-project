import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal } from 'react-native'

// Geolocation and map packages
import * as Location from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

// Assets import
import { FindStoreStyles } from 'components/ProjectStyling/BudgetStoreGuestList.styling'
import colors from 'assets/styling/colors'
import mapStyling from 'assets/styling/mapStyling.json'
import storeList from 'assets/stores/stores.json'
import { BASE_URL } from '@env'

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
  const [stores, setStores] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: accessToken,
      },
    }
    fetch(
      `${BASE_URL}/stores`,
      options
    )
      .then((res) => res.json())
      .then((data) => setStores(data.response))
      .catch((error) => console.error(error))
  }, [stores])


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
      FindStoreStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      FindStoreStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')
  return (
    <ScrollView contentContainerStyle={FindStoreStyles.background}>
      <View style={FindStoreStyles.header}>
        <Text style={FindStoreStyles.headerH1}>Find a store</Text>
        <TouchableOpacity style={FindStoreStyles.locationBtn} onPress={() => setMyLocation()}>
          <Text style={FindStoreStyles.locationTxt}>Use my current location</Text>
          <Ionicons name='location-outline' size={30} color='black' />
        </TouchableOpacity>
      </View>
      <View style={FindStoreStyles.mapWrapper}>
        <MapView
          style={FindStoreStyles.map}
          region={location}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyling}>
          <Marker coordinate={location} title='You' pinColor={colors.lightYellow}>
            <MaterialCommunityIcons name='panda' size={40} color='black' />
          </Marker>
          {stores.map((store) => (
            <Marker key={store.id} title={store.company} coordinate={store.coordinates}>
              <Ionicons name='location-outline' size={40} color='black' />
            </Marker>
          ))}
        </MapView>

        <TouchableOpacity
          style={[FindStoreStyles.onlineBtn, FindStoreStyles.boxShadow]}
          onPress={() => setShowModal(true)}>
          <Text style={FindStoreStyles.onlineTxt}>Want to shop online instead? Here are some tips</Text>
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
          <View style={FindStoreStyles.modalBackground}>
            <View style={FindStoreStyles.modalContent}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <AntDesign name='close' size={25} color='black' style={FindStoreStyles.closeModal} />
              </TouchableOpacity>
              <View style={FindStoreStyles.storeList}>
                {storeList.map((store) => (
                  <Text key={store.id} style={FindStoreStyles.storeTxt}>
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

export default FindStore
