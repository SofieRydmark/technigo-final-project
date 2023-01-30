import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

// Assets import
import fonts from 'assets/styling/fonts.js'
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
    <ScrollView
      style={styles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      {singleProject.map((project) => {
        return (
          <View style={{ width: '90%', paddingBottom: 100 }}>
            <View key={project.createdAt}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerH1}>{project.name}</Text>
                <Text style={styles.headerH4}>{project.due_date}</Text>
                <TouchableOpacity style={styles.changeBtn} onPress={() => setShowModal(true)}>
                  <MaterialIcons name='edit' size={20} color='black' />
                </TouchableOpacity>
              </View>
              <Modal animationType='slide' visible={showModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.calendar}>
                    <TouchableOpacity
                      style={styles.closeBtn}
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
                      style={[styles.boxShadow, styles.submitButton]}
                      onPress={() => {
                        changeDueDate(dueDate)
                        setShowModal(false)
                      }}>
                      <Text style={styles.buttonText}>Update date</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.changeNameContainer}>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder='New name'
                      placeholderTextColor={colors.darkGrey}
                    />
                    <TouchableOpacity
                      style={[styles.submitButton, styles.boxShadow]}
                      onPress={() => {
                        changeName(name)
                        setShowModal(false)
                        setName('')
                      }}>
                      <Text style={styles.buttonText}>Update name</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={[styles.whiteWrapper, styles.boxShadow]}>
                <View style={styles.guestBudgetButton}>
                  <TouchableOpacity
                    style={[styles.partyButton, styles.boxShadow]}
                    onPress={() => {
                      navigation.navigate('GuestList', { project: project, projectId: project._id })
                    }}>
                    <Text style={styles.buttonText}>Guestlist</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.partyButton, styles.boxShadow]}
                    onPress={() => {
                      navigation.navigate('Budget', { project: project, projectId: project._id })
                    }}>
                    <Text style={styles.buttonText}>Budget</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.headerh2}>THEME</Text>
                  {project.themeProjectList.map((theme) => {
                    return (
                      <View key={theme.image} style={styles.itemWrapper}>
                        <View>
                          <Text style={styles.text}>{theme.themesName}</Text>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedTheme(theme._id, theme.isCompleted)}
                            style={styles.icon}>
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
                            style={styles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={styles.headerh2}>ACTIVITIES</Text>
                  {project.activitiesProjectList.map((activity) => {
                    return (
                      <View key={activity.image} style={styles.listWrapper}>
                        <View>
                          <Text style={styles.text}>{activity.activitiesName}</Text>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedActivities(activity._id, activity.isCompleted)}
                            style={styles.icon}>
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
                            style={styles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={styles.headerh2}>DECORATION</Text>
                  {project.decorationsProjectList.map((decoration) => {
                    return (
                      <View key={decoration.image} style={styles.listWrapper}>
                        <View>
                          <Text style={styles.text}>{decoration.decorationsName}</Text>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() =>
                              completedDecorations(decoration._id, decoration.isCompleted)
                            }
                            style={styles.icon}>
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
                            style={styles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={styles.headerh2}>FOOD</Text>
                  {project.foodProjectList.map((food) => {
                    return (
                      <View key={food.image} style={styles.listWrapper}>
                        <View>
                          <Text style={styles.text}>{food.foodName}</Text>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedFood(food._id, food.isCompleted)}
                            style={styles.icon}>
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
                            style={styles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <Text style={styles.headerh2}>DRINKS</Text>
                  {project.drinksProjectList.map((drinks) => {
                    return (
                      <View key={drinks.image} style={styles.listWrapper}>
                        <View>
                          <Text style={styles.text}>{drinks.drinksName}</Text>
                        </View>
                        <View style={styles.icons}>
                          <TouchableOpacity
                            title='Mark as completed'
                            onPress={() => completedDrinks(drinks._id, drinks.isCompleted)}
                            style={styles.icon}>
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
                            style={styles.icon}>
                            <Text>🗑</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}

                  <View style={styles.guestBudgetButton}>
                    <TouchableOpacity
                      style={[styles.partyButton, styles.boxShadow]}
                      onPress={() =>
                        navigation.navigate('WhatKindOfParty', { projectId: project._id })
                      }>
                      <Text style={styles.buttonText}>Browse ideas </Text>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.green,
  },
  // styling headers
  headerH1: {
    fontSize: 25,
    fontFamily: fonts.titles,
    textAlign: 'center',
  },
  headerh2: {
    fontSize: 16,
    fontFamily: fonts.labels,
    textAlign: 'left',
    marginVertical: 6,
  },
  headerH4: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
  },
  headerContainer: {
    marginTop: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    marginBottom: 5,
    padding: 15,
  },
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    marginBottom: 5,
    padding: 15,
  },
  whiteWrapper: {
    borderRadius: 10,
    padding: 25,
    backgroundColor: colors.white,
  },
  // single item styling
  text: {
    fontFamily: fonts.text,
    fontSize: 17,
    textTransform: 'capitalize',
  },
  icon: {
    padding: 5,
  },
  icons: {
    flexDirection: 'row',
  },

  // styling change name
  input: {
    backgroundColor: colors.white,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    width: 200,
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
    placeholderColor: colors.black,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // styling buttons
  buttonText: {
    fontFamily: fonts.button,
    textAlign: 'center',
  },
  closeBtn: {
    right: -150,
    top: -30,
  },
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: 120,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },

  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    textAlign: 'center',
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  guestBudgetButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    borderRadius: 8,
    marginBottom: 2,
  },

  changeNameContainer: {
    fontFamily: fonts.text,
    backgroundColor: colors.green,
    alignItems: 'center',
    paddingBottom: 300,
    paddingTop: 50,
  },
  changeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    borderRadius: 8,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  calendar: {
    fontFamily: fonts.text,
    backgroundColor: colors.green,
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 100,
    backgroundColor: colors.green,
    paddingBottom: 100,
    alignItems: 'center',
  },
  changeBtn: {
    position: 'absolute',
    right: 5,
    bottom: 50,
    padding: 8,
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
  },
})
export default SingleProjectPage
