import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'


import colors from 'assets/styling/colors.js'
import { ui } from '../../reducers/ui'
import SingleProjectPage from './SingleProjectPage'



const GuestList = ({ navigation, route}) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const projectId = route.params.projectId
  const [allGuests, setAllGuests] = useState([])
  const userId = useSelector((store) => store.user.userId)
  const [loginError, setLoginError] = useState(null)
  const dispatch = useDispatch()
  console.log('project id guest', projectId)
  const project = route.params.project

// ********* ADD NEW GUEST FETCH ******* // 
  const addNewGuest = (values) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: accessToken,
      },
       body: JSON.stringify({
        guestName: values.guestName,  // values comes from Formik
        phone: values.phone
        }),
      }
      fetch(`https:party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addGuest/${projectId}`, options)
      .then ((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(()=> dispatch(ui.actions.setLoading(false)))


  }

  // ********* DELETE GUEST FROM THE LIST ******* //
  const deleteGuest = ( guestId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
       body: JSON.stringify({ _id:guestId })

    };
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteGuest/${guestId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  

  }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>GuestList</Text>
      </View>
        {accessToken && (
        <>
        <View style={styles.form}>
            <Formik
              initialValues={{ guestName: '', phone: '' }}
              onSubmit={(values, actions) => {
                if (values.guestName === '' || values.phone === '') {
                  return setLoginError('Please fill the name')
                } else {
                  addNewGuest(values)
                  actions.resetForm()
                }
              }}>
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.input}>
                  <TextInput
                    label='guestName'
                    onChangeText={handleChange('guestName')}
                    value={values.guestName}
                    placeholder={'Namn'}
                    required
                    multiline={false}
                    autoCapitalize='none'
                    maxLength={20}
                  />
                  <TextInput
                    label='phone'
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    placeholder={'Telefonnummer'}
                    multiline={false}
                    autoCapitalize='none'
                  />

                  <TouchableOpacity style={styles.addProjectButton} onPress={handleSubmit}>
                    <Text>NY GÄST</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              {project.guestList.map((guest) => {
                return(
                  <>
                  <View style={styles.listWrapper} key={guest._id}>
                    <Text style={styles.row}>{guest.guestName}</Text>
                    <Text style={styles.row}>{guest.phone}</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.trashIcon} onPress={() => deleteGuest(guest._id)}>
                      <Text style={styles.row}>🗑</Text>
                    </TouchableOpacity>
                  </View>

                  </>
                )
              })}

            </View>
          </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Back to projectBoard</Text>
        </TouchableOpacity>
      </>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    flex: 1,
    paddingVertical: 60,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
    background: 'transparent',
  },

  listWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    margin: 2,
  },
  // sigle item styling
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  // maping + formik with white background
  form: {
    borderRadius: 10,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  // add new guest input + button styling
  addProjectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
    width: '50%',
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },

  input: {
    marginBottom: 10,
    padding: 25,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 12,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },

  //delete icon styling
  trashIcon: {
    color: colors.red,
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 1,
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
export default GuestList
