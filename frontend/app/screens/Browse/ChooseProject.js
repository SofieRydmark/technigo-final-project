import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  TextInput,
  Modal,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

// Formik
import { Formik } from 'formik'

// Assets import
import { ChooseProjectStyles } from 'components/BrowseStyling/ChooseProject.styling'
import { PROJECTS_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

const ChooseProject = ({ navigation, _id }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [allProjects, setAllProjects] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [calendarVisible, setCalendarVisible] = useState(false)

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
      .catch((error) => console.error(error))
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

    fetch(
      `${BASE_URL}/${userId}/project-board/projects/addProject`,
      options
    )
      .then((res) => res.json())
      .then((data) => navigation.navigate('WhatKindOfParty', { projectId: data.response._id }))
      .catch((error) => console.error(error))

  }

  // Box shadow styling IOS and android
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
      ChooseProjectStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      ChooseProjectStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <KeyboardAvoidingView
      style={ChooseProjectStyles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={ChooseProjectStyles.pressable}>
        <ScrollView contentContainerStyle={ChooseProjectStyles.background}>
          <View style={ChooseProjectStyles.header}>
            <Text style={ChooseProjectStyles.headerH1}> Which project do you want to plan? </Text>
          </View>
          <View style={[ChooseProjectStyles.container, ChooseProjectStyles.boxShadow]}>
            <View>
              <TouchableOpacity
                onPress={() => setShowMap(!showMap)}
                style={[ChooseProjectStyles.partyButton, ChooseProjectStyles.boxShadow]}>
                <Text style={ChooseProjectStyles.buttonText}>Active Projects</Text>
              </TouchableOpacity>
              {showMap &&
                allProjects.map((singleProject) => {
                  return (
                    <View key={singleProject._id} style={ChooseProjectStyles.listWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('WhatKindOfParty', { projectId: singleProject._id })
                        }}
                        styles={ChooseProjectStyles.project}>
                        <View>
                          <Text key={_id} style={ChooseProjectStyles.row}>
                            {singleProject.name}
                          </Text>
                        </View>
                        <View>
                          <Feather
                            name='arrow-right'
                            size={20}
                            color='black'
                            style={ChooseProjectStyles.moveToNext}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
            </View>

            <TouchableOpacity
              onPress={() => setShowForm(!showForm)}
              style={[ChooseProjectStyles.partyButton, ChooseProjectStyles.boxShadow]}>
              <Text style={ChooseProjectStyles.buttonText}>Create new project</Text>
              <Ionicons name='add' size={20} color='black' style={{ padding: 8 }} />
            </TouchableOpacity>
            {showForm && (
              <View style={ChooseProjectStyles.form}>
                <Formik 
                initialValues={{ name: '', due_date: '' }}
                onSubmit={(values, actions) => {
                  if (values.name === '' || values.due_date === '') {
                    return setLoginError('Please fill in name and due date')
                  } else if (values.name.length < 3) {
                    return setLoginError('Name needs to be min 3 characters')
                  } else {
                  addNewProject(values)
                  actions.resetForm()
                }
                }}>
                  {({ handleChange, handleSubmit, values }) => (
                    <View style={ChooseProjectStyles.input}>
                      <TextInput
                        label='Name'
                        onChangeText={handleChange('name')}
                        value={values.name}
                        placeholder={'+ Name'}
                        required
                        multiline={false}
                        autoCapitalize='none'
                        maxLength={20}
                        style={ChooseProjectStyles.inputName}
                      />

                      <Modal visible={calendarVisible} animationType={'slide'}>
                        <View style={ChooseProjectStyles.calendar}>
                          <TouchableOpacity
                            style={ChooseProjectStyles.closeBtn}
                            onPress={() => {
                              setCalendarVisible(false)
                            }}>
                            <AntDesign name='close' size={25} color='black' />
                          </TouchableOpacity>
                          <CalendarPicker
                            onDateChange={(date) =>
                              handleChange('due_date')(date.toISOString().slice(0, 10))
                            }
                            style={ChooseProjectStyles.calendar}
                            minDate={new Date()}
                          />
                          <TouchableOpacity
                            style={[ChooseProjectStyles.doneButton, ChooseProjectStyles.boxShadow]}
                            onPress={() => setCalendarVisible(false)}>
                            <Text style={ChooseProjectStyles.doneButtonText}>Add date</Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                      {loginError && <Text style={ChooseProjectStyles.errorText}>{loginError}</Text>}
                      <TouchableOpacity
                        onPress={() => {
                          setCalendarVisible(true)
                        }}>
                        <Text style={ChooseProjectStyles.inputText}>
                          {values.due_date ? values.due_date : '+ YY-MM-DD'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[ChooseProjectStyles.addProjectButton, ChooseProjectStyles.boxShadow]}
                        onPress={handleSubmit}>
                        <Feather
                          name='arrow-right'
                          size={24}
                          color='black'
                          style={{ padding: 8 }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
            )}
          </View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default ChooseProject
