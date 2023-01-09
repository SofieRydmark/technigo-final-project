import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native'

// Formik
import { Formik } from 'formik'

// Assets import
import colors from 'assets/styling/colors.js'
import { PROJECTS_URL, PROJECTS_ADD_URL } from 'assets/urls/urls'

const ChooseProject = ({ navigation, _id }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)

  const [allProjects, setAllProjects] = useState([])
  const [newProject, setNewProject] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [showForm, setShowForm] = useState(false)

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

  const addNewProject = (values) => {
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
    fetch(PROJECTS_ADD_URL(userId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Which project do you want to plan ? </Text>
      </View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => setShowMap(!showMap)} style={styles.partyButton}>
            <Text style={styles.buttonText}>Active Projects</Text>
          </TouchableOpacity>
          {showMap &&
            allProjects.map((singleProject) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('WhatKindOfParty', { projectId: singleProject._id })
                    }}>
                    <Text key={_id} style={styles.item}>
                      {singleProject.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })}
        </View>

        <View>
          <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.partyButton}>
            <Text style={styles.buttonText}>Create new</Text>
          </TouchableOpacity>
          {showForm && (
            <Formik
              initialValues={{ name: '', due_date: '' }}
              onSubmit={(values, actions) => {
                if (values.name === '' || values.due_date === '') {
                  return setLoginError('Please fill in all fields') //CHANGE THE MESSAGE
                } else {
                  addNewProject(values)
                  actions.resetForm()
                }
              }}>
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <TextInput
                    style={{ height: 40, width: 100 }}
                    label='name'
                    onChangeText={handleChange('name')}
                    value={values.name}
                    placeholder={'project name'}
                    required
                    multiline={false}
                    autoCapitalize='none'
                  />
                  <TextInput
                    style={{ height: 40, width: 100 }}
                    label='due_date'
                    onChangeText={handleChange('due_date')}
                    value={values.due_date}
                    placeholder={'YYYY-MM-DD'}
                    multiline={false}
                    autoCapitalize='none'
                  />
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit()
                      navigation.navigate('WhatKindOfParty', { projectId: newProject._id })
                    }}>
                    <Text>add Project</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
export default ChooseProject
