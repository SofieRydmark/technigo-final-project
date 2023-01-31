import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

// Assets import
import { SingleProjectStyles } from 'components/ProjectStyling/SingleProject.styling'
import colors from 'assets/styling/colors'
import { ONEPROJECT_URL, ONEPROJECT_CHANGE_URL } from 'assets/urls/urls'
import { BASE_URL } from '@env'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

// Reducers
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

const SingleProjectPage = ({ navigation, route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const [singleProject, setSingleProject] = useState([])
  const userId = useSelector((store) => store.user.userId)
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const projectId = route.params.projectId
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const getSingleProject = () => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(ONEPROJECT_URL(userId, projectId), options)
      .then((res) => res.json())
      .then((data) => setSingleProject(data.data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  useEffect(() => {
    getSingleProject()
  }, [singleProject])

  // *** TOOGLE OBJECT PROJECT  *** //
  const completed = (endpoint, id) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: id,
      }),
    }

    fetch(
      `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/${endpoint}/${id}`,
      options
    )
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const completedDrinks = (drinksId) => {
    completed('drink', drinksId)
  }
  const completedTheme = (themeId) => {
    completed('theme', themeId)
  }
  const completedFood = (foodId) => {
    completed('food', foodId)
  }
  const completedDecorations = (decorationId) => {
    completed('decoration', decorationId)
  }
  const completedActivities = (activityId) => {
    completed('activity', activityId)
  }
  // *** DELETE SINGLE OBJECT PROJECT  *** //

  const deleteObject = (endpoint, id, name, bodyKey = `${endpoint}Name`) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        [bodyKey]: name,
        _id: id,
      }),
    }

    fetch(
      `${BASE_URL}/${userId}/project-board/projects/${projectId}/delete${endpoint}/${id}`,
      options
    )
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const deleteDecoration = (decorationId, name) => {
    deleteObject('Decoration', decorationId, name, 'decorationsName')
  }

  const deleteTheme = (themeId, name) => {
    deleteObject('Theme', themeId, name, 'themesName')
  }

  const deleteFood = (foodId, name) => {
    deleteObject('Food', foodId, name, 'foodName')
  }

  const deleteDrinks = (drinksId, name) => {
    deleteObject('Drink', drinksId, name, 'drinksName')
  }
  const deleteActivity = (activityId, name) => {
    deleteObject('Activity', activityId, name, 'activitiesName')
  }

  // *** CHANGE NAME OBJECT PROJECT  *** //

  const singleProjectChange = (options) => {
    dispatch(ui.actions.setLoading(true))
    fetch(ONEPROJECT_CHANGE_URL(userId, projectId), options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const changeName = (name) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name,
      }),
    }

    singleProjectChange(options)
  }

  const changeDueDate = (dueDate) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        due_date: dueDate,
      }),
    }

    singleProjectChange(options)
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
      SingleProjectStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      SingleProjectStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')

  return (
    <ScrollView
      style={SingleProjectStyles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      {singleProject.map((project) => {
        return (
          <View style={{ width: '90%', paddingBottom: 100 }}>
            <View key={project.createdAt}>
              <View style={SingleProjectStyles.headerContainer}>
                <Text style={SingleProjectStyles.headerH1}>{project.name}</Text>
                <Text style={SingleProjectStyles.headerH4}>{project.due_date}</Text>
                <TouchableOpacity style={SingleProjectStyles.changeBtn} onPress={() => setShowModal(true)}>
                  <MaterialIcons name='edit' size={20} color='black' />
                </TouchableOpacity>
              </View>
              <Modal animationType='slide' visible={showModal}>
                <View style={SingleProjectStyles.modalContainer}>
                  <View style={SingleProjectStyles.calendar}>
                    <TouchableOpacity
                      style={SingleProjectStyles.closeBtn}
                      onPress={() => {
                        setShowModal(false)
                      }}>
                      <AntDesign name='close' size={25} color='black' />
                    </TouchableOpacity>
                    <CalendarPicker
                      onDateChange={(date) => setDueDate(date.toISOString().slice(0, 10))}
                      minDate={new Date()}
                    />
                    <TouchableOpacity
                      style={[SingleProjectStyles.boxShadow, SingleProjectStyles.submitButton]}
                      onPress={() => {
                        changeDueDate(dueDate)
                        setShowModal(false)
                      }}>
                      <Text style={SingleProjectStyles.buttonText}>Update date</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={SingleProjectStyles.changeNameContainer}>
                    <TextInput
                      style={SingleProjectStyles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder='New name'
                      placeholderTextColor={colors.darkGrey}
                    />
                    <TouchableOpacity
                      style={[SingleProjectStyles.submitButton, SingleProjectStyles.boxShadow]}
                      onPress={() => {
                        changeName(name)
                        setShowModal(false)
                        setName('')
                      }}>
                      <Text style={SingleProjectStyles.buttonText}>Update name</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={[SingleProjectStyles.whiteWrapper, SingleProjectStyles.boxShadow]}>
                <View style={SingleProjectStyles.guestBudgetButton}>
                  <TouchableOpacity
                    style={[SingleProjectStyles.partyButton, SingleProjectStyles.boxShadow]}
                    onPress={() => {
                      navigation.navigate('GuestList', { project: project, projectId: project._id })
                    }}>
                    <Text style={SingleProjectStyles.buttonText}>Guestlist</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[SingleProjectStyles.partyButton, SingleProjectStyles.boxShadow]}
                    onPress={() => {
                      navigation.navigate('Budget', { project: project, projectId: project._id })
                    }}>
                    <Text style={SingleProjectStyles.buttonText}>Budget</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={SingleProjectStyles.headerh2}>THEME</Text>
                  {project.themeProjectList.map((theme) => {
                    return (
                      <View key={theme.image} style={SingleProjectStyles.itemWrapper}>
                        <View>
                          <Text style={SingleProjectStyles.text}>{theme.themesName}</Text>
                        </View>
                        <View style={SingleProjectStyles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedTheme(theme._id, theme.isCompleted)}
                            style={SingleProjectStyles.icon}>
                            <Text>
                              {theme.isCompleted ? (
                                <FontAwesome5 name='check' size={20} color={colors.green} />
                              ) : (
                                <MaterialCommunityIcons
                                  name='checkbox-blank-outline'
                                  size={20}
                                  color='black'
                                />
                              )}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            title='DELETE'
                            onPress={() => deleteTheme(theme._id)}
                            style={SingleProjectStyles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={SingleProjectStyles.headerh2}>ACTIVITIES</Text>
                  {project.activitiesProjectList.map((activity) => {
                    return (
                      <View key={activity.image} style={SingleProjectStyles.listWrapper}>
                        <View>
                          <Text style={SingleProjectStyles.text}>{activity.activitiesName}</Text>
                        </View>
                        <View style={SingleProjectStyles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedActivities(activity._id, activity.isCompleted)}
                            style={SingleProjectStyles.icon}>
                            <Text>
                              {activity.isCompleted ? (
                                <FontAwesome5 name='check' size={20} color={colors.green} />
                              ) : (
                                <MaterialCommunityIcons
                                  name='checkbox-blank-outline'
                                  size={20}
                                  color='black'
                                />
                              )}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            title='DELETE'
                            onPress={() => deleteActivity(activity._id)}
                            style={SingleProjectStyles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={SingleProjectStyles.headerh2}>DECORATION</Text>
                  {project.decorationsProjectList.map((decoration) => {
                    return (
                      <View key={decoration.image} style={SingleProjectStyles.listWrapper}>
                        <View>
                          <Text style={SingleProjectStyles.text}>{decoration.decorationsName}</Text>
                        </View>
                        <View style={SingleProjectStyles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() =>
                              completedDecorations(decoration._id, decoration.isCompleted)
                            }
                            style={SingleProjectStyles.icon}>
                            <Text>
                              {decoration.isCompleted ? (
                                <FontAwesome5 name='check' size={20} color={colors.green} />
                              ) : (
                                <MaterialCommunityIcons
                                  name='checkbox-blank-outline'
                                  size={20}
                                  color='black'
                                />
                              )}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            title='DELETE'
                            onPress={() => deleteDecoration(decoration._id)}
                            style={SingleProjectStyles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={SingleProjectStyles.headerh2}>FOOD</Text>
                  {project.foodProjectList.map((food) => {
                    return (
                      <View key={food.image} style={SingleProjectStyles.listWrapper}>
                        <View>
                          <Text style={SingleProjectStyles.text}>{food.foodName}</Text>
                        </View>
                        <View style={SingleProjectStyles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedFood(food._id, food.isCompleted)}
                            style={SingleProjectStyles.icon}>
                            <Text>
                              {food.isCompleted ? (
                                <FontAwesome5 name='check' size={20} color={colors.green} />
                              ) : (
                                <MaterialCommunityIcons
                                  name='checkbox-blank-outline'
                                  size={20}
                                  color='black'
                                />
                              )}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            title='DELETE'
                            onPress={() => deleteFood(food._id)}
                            style={SingleProjectStyles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={SingleProjectStyles.headerh2}>DRINKS</Text>
                  {project.drinksProjectList.map((drinks) => {
                    return (
                      <View key={drinks.image} style={SingleProjectStyles.listWrapper}>
                        <View>
                          <Text style={SingleProjectStyles.text}>{drinks.drinksName}</Text>
                        </View>
                        <View style={SingleProjectStyles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedDrinks(drinks._id, drinks.isCompleted)}
                            style={SingleProjectStyles.icon}>
                            <Text>
                              {drinks.isCompleted ? (
                                <FontAwesome5 name='check' size={20} color={colors.green} />
                              ) : (
                                <MaterialCommunityIcons
                                  name='checkbox-blank-outline'
                                  size={20}
                                  color='black'
                                />
                              )}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            title='DELETE'
                            onPress={() => deleteDrinks(drinks._id)}
                            style={SingleProjectStyles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <View style={SingleProjectStyles.guestBudgetButton}>
                    <TouchableOpacity
                      style={[SingleProjectStyles.partyButton, SingleProjectStyles.boxShadow]}
                      onPress={() =>
                        navigation.navigate('WhatKindOfParty', { projectId: project._id })
                      }>
                      <Text style={SingleProjectStyles.buttonText}>Browse ideas </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default SingleProjectPage
