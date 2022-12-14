import React, { useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'

export const SignIn = () => {
  const [joke, setJoke] = useState({})
  const [fetching, setFetching] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)

  useEffect(() => {
    setShowDelivery(false)
    fetch('https://v2.jokeapi.dev/joke/christmas?type=twopart')
      .then((res) => res.json())
      .then((json) => setJoke(json))
    // console.log(joke)
  }, [fetching])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>Hello{joke.setup}</Text>

      <TouchableOpacity onPress={() => setShowDelivery(true)}>
        <Image style={styles.img} source={require('../assets/dog.png')} />
      </TouchableOpacity>

      {showDelivery && <Text style={styles.paragraph}>{joke.delivery}</Text>}

      <TouchableOpacity onPress={() => setFetching(!fetching)} style={styles.button}>
        <Text>Make me laugh</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f8488',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: 'tomato',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    height: 50,
  },
})
