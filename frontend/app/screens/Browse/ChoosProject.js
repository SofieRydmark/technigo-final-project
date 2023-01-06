import {React, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity,  FlatList, SafeAreaView, TextInput } from 'react-native'
import { Formik } from 'formik'

import colors from '../../config/colors'

const ChooseProject = ({ navigation, _id/* , route */ }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const email = useSelector((store) => store.user.email)
  const userId = useSelector((store) => store.user.userId)
 /*  const projectId = route.params.projectId */

  const [allProjects, setAllProjects] = useState([])
  const [newProject, setNewProject] = useState("")

  useEffect (() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects`, options)
      .then ((res) => res.json())
      .then((data) => setAllProjects(data.response))
      .catch((error) => console.log(error))
      console.log("data", allProjects)
  }, [] )

    /* --- ADD NEW PROJECT FETCH  --*/
  
  const addNewProject = ( values) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: accessToken,
      },
       body: JSON.stringify({
        name: values.name,
        due_date: values.due_date
        }),
      }
      fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/addProject`, options)
      .then ((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))

  }
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Which project do you want to plan ? </Text>
      </View>
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('BrowsingCategoriesPage', { partyType: 'grownup' })}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Grownup party</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('BrowsingCategoriesPage', { partyType: 'kids' })}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Kids party</Text>
        </TouchableOpacity> */}
        <View>
            {allProjects.map((singleProject) => {
              return(
                <View>
                    <Text> Your active projects</Text>
                  <TouchableOpacity onPress={() => {navigation.navigate('WhatKindOfParty', { projectId: singleProject._id, })}}>
                  <Text key={_id} style={styles.item}>{singleProject.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {/* <Text> CREATE NEW PROJECT</Text>
          <Formik
          initialValues={{ name: '', due_date: ''}}
          onSubmit={(values, actions) => {
            if (values.name === '' || values.due_date === '') {
              return setLoginError('Please fill in all fields') //CHANGE THE MESSAGE
            } else {
              addNewProject(values)
              actions.resetForm()
            }
            }}>
             {({  handleChange, handleBlur, handleSubmit, values }) => (
          <View>
                <TextInput  style={{ height: 40, width: 100 }}
                label = 'name'
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder={"project name"}
                required
                multiline={false}
                autoCapitalize = 'none'
            />
            <TextInput style={{ height: 40, width: 100 }}
                label = 'due_date'
                onChangeText={handleChange('due_date')}
                value={values.due_date}
                placeholder={"YYYY-MM-DD"}
                multiline={false}
                autoCapitalize = 'none'
            />
   
            <TouchableOpacity onPress={() => { handleSubmit(); navigation.navigate('WhatKindOfParty', { projectId: projectId}) }}>
                <Text>add Project</Text>
            </TouchableOpacity>
          </View>
             )}
          </Formik> */}
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
