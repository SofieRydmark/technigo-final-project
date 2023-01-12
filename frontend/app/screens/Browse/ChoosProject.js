import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';

// Formik
import { Formik } from 'formik'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { PROJECTS_URL, PROJECTS_ADD_URL } from 'assets/urls/urls'

const ChooseProject = ({ navigation, _id }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [allProjects, setAllProjects] = useState([])
  const [newProject, setNewProject] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(PROJECTS_URL(userId), options)
      .then((res) => res.json())
      .then((data) => setAllProjects(data.response))
      .catch((error) => console.log(error))
  }, [allProjects])

  /* --- ADD NEW PROJECT FETCH  --*/
  const addNewProject = async (values) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name: values.name,
        due_date: values.due_date,
      }),
    }

    try {
      const res = await fetch(PROJECTS_ADD_URL(userId), options)
      const data = await res.json()
      console.log('newProject', data.response)
      console.log('id', data.response._id)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
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
        <Text style={styles.headerH1}> Which project do you want to plan? </Text>
      </View>
      <View style={[styles.container, styles.boxShadow]}>
        <View>
          <TouchableOpacity onPress={() => setShowMap(!showMap)} style={[styles.partyButton, styles.boxShadow]}>
            <Text style={styles.buttonText}>Active Projects</Text>
          </TouchableOpacity>
          {showMap &&
            allProjects.map((singleProject) => {
              return (
                <View key={singleProject._id} style={styles.listWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('WhatKindOfParty', { projectId: singleProject._id })
                    }}>
                    <Text key={_id} style={styles.row}>
                      {singleProject.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })}
        </View>

        <View>
          <TouchableOpacity onPress={() => setShowForm(!showForm)} style={[styles.partyButton, styles.boxShadow]}>
            <Text style={styles.buttonText}>Create new project</Text>
          </TouchableOpacity>
          {showForm && (
            <View style={styles.form}>
              <Formik initialValues={{ name: '', due_date: '' }}>
                {({ handleChange, handleSubmit, values }) => (
                  <View style={styles.input}>
                    <TextInput
                      label='name'
                      onChangeText={handleChange('name')}
                      value={values.name}
                      placeholder={'Projekt namn'}
                      required
                      multiline={false}
                      autoCapitalize='none'
                      maxLength={20}
                      style={styles.inputName}
                    />
                    
                     <Modal visible={calendarVisible} animationType={'slide'}>
                    <View style={styles.calendar}>
                      <CalendarPicker
                      onDateChange={(date) => handleChange('due_date')(date.toISOString().slice(0,10))}
                      style={styles.calendar}
                      minDate={new Date()}
                      />
                      <TouchableOpacity 
                      style={styles.doneButton}
                      onPress={() => setCalendarVisible(false)}>
                        <Text style={styles.doneButtonText}>CHOOSE</Text>
                      </TouchableOpacity>
                    </View>
                    </Modal>
                    {loginError && <Text style={styles.errorText}>{loginError}</Text>}
                    <TouchableOpacity onPress={() => {
                      setCalendarVisible(true);
                      }}>
                        <Text style={styles.inputText}>{values.due_date ? values.due_date : "YYYY-MM-DD"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.addProjectButton}
                      onPress={async () => {
                        if (values.name === '' || values.due_date === '') {
                          return setLoginError('Please fill the name and due date')
                        }
                        const data = await addNewProject(values)
                        console.log('id Onpress', data.response._id)
                        navigation.navigate('WhatKindOfParty', { projectId: data.response._id })
                      }}>
                      <Text style={styles.buttonText}>Create new</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          )}
        </View>
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
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: fonts.button
  },
  container: {
    borderRadius: 30,
    padding: 25,
    width: '80%',
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.titles
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
    fontFamily: fonts.button
  },
  listWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    margin: 2,
  },
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 16,
    fontFamily: fonts.text
  }, 
  form: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.white,
  },
 
  addProjectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
    width: '100%',
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
  inputDate: {
    marginTop: 10, 
    fontFamily: fonts.input,
    fontSize: 15, 
  },
  inputName: {
    fontFamily: fonts.input,
    fontSize: 15, 
  }, 
  calendar: {
    flex: 1, 
   paddingTop: 100,
   fontFamily: fonts.text,
   backgroundColor: colors.green,
   alignItems: 'center' 
  
  
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    textAlign: 'center',
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  }, 
  doneButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.button, 
  },
  errorText: {
    fontFamily: fonts.text, 
    color: 'red'
  }
})
export default ChooseProject
