import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import SpinnerSVG from 'assets/images/spinner.svg'

const Spinner = () => {
  const [spinValue] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()
  })

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={{
        marginRight: 8,
        transform: [{ rotate: spin }],
      }}>
      <SpinnerSVG
        style={{
          width: 25,
          height: 25,
        }}
      />
    </Animated.View>
  )
}

export default Spinner
