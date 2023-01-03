import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, batch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  Button,
  Image,
  FlatList
} from 'react-native'

import colors from '../config/colors'
import user from '../reducers/user'

const Activities = ()  => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const email = useSelector((store) => store.user.email)
    const dispatch = useDispatch()
    const [allActivities, setAllActivities ] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
  
    const logout = () => {
      console.log('logged out')
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setAccessToken(null))
    }
  
    useEffect(() => {
      if (!accessToken) {
        navigation.navigate('SignIn')
      }
    }, [accessToken])

    const getAllActivities = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		};
		fetch('https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/activities', options)
			.then((res) => res.json())
			.then((data) => setAllActivities(data.response))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getAllActivities();
	}, []);


    return(
        <>
        <ScrollView contentContainerStyle={styles.background}>
        <TextInput
        style={styles.input}
        placeholder="Search for a theme..."
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={allActivities
          .filter((Activity) => Activity.name.toLowerCase().includes(searchTerm.toLowerCase()))}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
        
        
        <Text> Hello themes</Text>
       
        <TouchableOpacity onPress={logout}>
            <Text>Sign out</Text>
        </TouchableOpacity>
        </ScrollView>
        </>
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
  
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 50,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  }
})

export default Activities
