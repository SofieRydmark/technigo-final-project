import React from 'react'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import React from 'react'
import LottieView from 'lottie-react-native'
import animationData from 'assets/lotties/100088-lazy-panda.json'
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'

export const Loading = () => {
  const isLoading = useSelector((store) => store.ui.isLoading)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      {isLoading && (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          <LottieView source={require('assets/lotties/100088-lazy-panda.json')} autoPlay loop />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 1,
  },
})
