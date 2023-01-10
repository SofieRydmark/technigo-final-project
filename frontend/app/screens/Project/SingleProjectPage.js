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
  Button,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors'
import {
  ONEPROJECT_URL,
  DRINK_COMPLETE_URL,
  DECOR_COMPLETE_URL,
  THEME_COMPLETE_URL,
  ACTIVITY_COMPLETE_URL,
  DRINK_DELETE_URL,
  DECOR_DELETE_URL,
  THEME_DELETE_URL,
  ACTIVITY_DELETE_URL,
  ONEPROJECT_CHANGE_URL,
} from 'assets/urls/urls'

// Reducers
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'

const SingleProjectPage = ({ navigation, route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const [singleProject, setSingleProject] = useState([])
  const userId = useSelector((store) => store.user.userId)
  const [showInput, setShowInput] = useState(false)
  const [showDateChange, setShowDateChange] = useState(false)
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const projectId = route.params.projectId
  const dispatch = useDispatch()

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

  /****************** TOOGLE OBJECT PROJECT  ************************* */
  const completedDrinks = (drinksId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: drinksId,
      }),
    }
    console.log('id', drinksId)
    fetch(DRINK_COMPLETE_URL(userId, projectId, drinksId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', completedDrinks)
  }

  const completedTheme = (themeId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: themeId,
      }),
    }
    console.log('id', themeId)
    fetch(THEME_COMPLETE_URL(userId, projectId, themeId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', completedTheme)
  }

  const completedFood = (foodId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: foodId,
      }),
    }
    console.log('id', foodId)
    fetch(FOOD_COMPLETE_URL(userId, projectId, foodId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', completedFood)
  }
  const completedActivities = (activityId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: activityId,
      }),
    }
    console.log('id', activityId)
    fetch(ACTIVITY_COMPLETE_URL(userId, projectId, activityId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', completedActivities)
  }

  const completedDecorations = (decorationId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        isCompleted: true,
        _id: decorationId,
      }),
    }
    console.log('id', decorationId)
    fetch(DECOR_COMPLETE_URL(userId, projectId, decorationId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', completedDecorations)
  }

  /****************** DELETE SINGLE OBJECT PROJECT  ************************* */

  const deleteDrinks = (drinksId, name) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        drinksName: name,
        _id: drinksId,
      }),
    }
    console.log('id', drinksId)
    fetch(DRINK_DELETE_URL(userId, projectId, drinksId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', deleteFood)
  }

  const deleteFood = (foodId, name) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        foodName: name,
        _id: foodId,
      }),
    }
    console.log('id', foodId)
    fetch(FOOD_DELETE_URL(userId, projectId, foodId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', deleteFood)
  }

  const deleteDecoration = (decorationId, name) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        decorationsName: name,
        _id: decorationId,
      }),
    }
    console.log('id', decorationId)
    fetch(DECOR_DELETE_URL(userId, projectId, decorationId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', deleteDecoration)
  }

  const deleteActivity = (activityId, name) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        activitiesName: name,
        _id: activityId,
      }),
    }
    console.log('id', activityId)
    fetch(ACTIVITY_DELETE_URL(userId, projectId, activityId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', deleteActivity)
  }

  const deleteTheme = (themeId, name) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        themesName: name,
        _id: themeId,
      }),
    }
    console.log('id', themeId)
    fetch(THEME_DELETE_URL(userId, projectId, themeId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
    console.log('marked as completed', deleteTheme)
  }
  /****************** CHANGE NAME OBJECT PROJECT  ************************* */

  const singleProjectChange = (options) => {
    dispatch(ui.actions.setLoading(true))
    fetch(ONEPROJECT_CHANGE_URL(userId, projectId), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {singleProject.map((project) => {
        return (
          <>
            <View style={styles.headerContainer}>
              <View style={styles.leftColumn}>
                    
            <TouchableOpacity onPress={() => {navigation.navigate('GuestList', { project: project, projectId: project._id })}}>
                <Text style={styles.row}>GUEST LIST</Text>
            </TouchableOpacity>
          <Text style={styles.headerH1}>{project.name}</Text>
                <Text style={styles.headerH4}>{project.due_date}</Text>
              </View>
              <View style={styles.rightColumn}>
                <TouchableOpacity
                  onPress={() => setShowInput(!showInput)}
                  style={styles.changeButton}>
                  <Text>Change name </Text>
                </TouchableOpacity>
             
    {showInput && (
                  <View>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder='Enter new name'
                    />
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => {
                        changeName(name, console.log('onpress', name))
                        setShowInput(false)
                      }}>
                      <Text>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setShowDateChange(!showDateChange)}
                  style={styles.changeButton}>
                  <Text>Change Date</Text>
                </TouchableOpacity>
                {showDateChange && (
                  <View>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setDueDate(text)}
                      value={dueDate}
                      placeholder='YY-MM-DD'
                    />
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => {
                        changeDueDate(dueDate)
                        setShowDateChange(false)
                      }}>
                      <Text>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProjectBoard')}
              style={styles.partyButton}>
              <Text style={styles.buttonText}>Back to projectBoard</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.headerh2}>THEME</Text>
              {project.themeProjectList.map((theme) => {
                return (
                  <View key={theme._id} style={styles.listWrapper}/* style={styles.smallContainer}*/ >
                    <View styles={styles.leftColumn}>
                      <Text style={styles.row}>{theme.themesName}</Text>
                      <Text style={styles.row}>
                        {theme.isCompleted ? 'Completed' : 'Incomplete'}
                      </Text>
                    </View>
                    {/* <View style={styles.rightColumn}> */}
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedTheme(theme._id, theme.isCompleted)}
                        style={styles.complete}>
                        <Text>Mark as completed</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteTheme(theme._id)}
                        style={styles.delete}>
                        <Text>Delete object</Text>
                      </TouchableOpacity>
                    {/* </View> */}
                  </View>
                )
              })}

              <Text style={styles.headerh2}>ACTIVITIES</Text>
              {project.activitiesProjectList.map((activity) => {
                return (
                  <View key={activity._id} style={styles.listWrapper} /* style={styles.smallContainer} */>
                    <View style={styles.leftColumn}>
                      <Text style={styles.row}>{activity.activitiesName}</Text>
                      <Text style={styles.row}>
                        {activity.isCompleted ? 'Completed' : 'Incomplete'}
                      </Text>
                    </View>
                    {/* <View /* style={styles.rightColumn}> */}
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedActivities(activity._id, activity.isCompleted)}
                        style={styles.complete}>
                        <Text>✅</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteActivity(activity._id)}
                        style={styles.delete}>
                        <Text>🗑</Text>
                      </TouchableOpacity>
                    {/* </View> */}
                  </View>
                )
              })}

              <Text style={styles.headerh2}>DECORATION</Text>
              {project.decorationsProjectList.map((decoration) => {
                return (
                  <View key={decoration._id} style={styles.listWrapper}>
                    <View styles={styles.leftColumn}>
                      <Text style={styles.row}>{decoration.decorationsName}</Text>
                      <Text style={styles.row}>{decoration.isCompleted ? 'Completed' : 'Incomplete'}</Text>
                    </View>
                    {/* <View styles={styles.rightColumn}> */}
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedDecorations(decoration._id, decoration.isCompleted)}
                        style={styles.complete}>
                        <Text>✅</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteDecoration(decoration._id)}
                        style={styles.delete}>
                        <Text>🗑</Text>
                      </TouchableOpacity>
                    {/* </View> */}
                  </View>
                )
              })}

              <Text style={styles.headerh2}>FOOD</Text>
              {project.foodProjectList.map((food) => {
                return (
                  <View key={food._id} style={styles.listWrapper}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.row}>{food.foodName}</Text>
                      <Text>{food.isCompleted ? 'Completed' : 'Incomplete'}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedFood(food._id, food.isCompleted)}
                        style={styles.complete}>
                        <Text>✅</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteFood(food._id)}
                        style={styles.delete}>
                        <Text>🗑</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}

              <Text style={styles.headerh2}>DRINKS</Text>
              {project.drinksProjectList.map((drinks) => {
                return (
                  <View key={drinks._id} style={styles.listWrapper}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.row}>{drinks.drinksName}</Text>
                      <Text style={styles.row}>{drinks.isCompleted ? 'Completed' : 'Incomplete'}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedDrinks(drinks._id, drinks.isCompleted)}
                        style={styles.complete}>
                        <Text>✅</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteDrinks(drinks._id)}
                        style={styles.delete}>
                        <Text>🗑</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}

              {/* <Button title='Brows categories 'onPress={navigation.navigate('BrowsingCategoriesPage', { projectId:singleProject._id })} /> */}
              {project.budgetList.map((budget) => {
                return (
                  <View key={budget._id}>
                    <Text>{budget.activitiesName}</Text>
                    {/* <Text>{activity.isCompleted ? 'Completed' : 'Incomplete'}</Text> */}
                  </View>
                )
              })}
            </View>
          </>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: colors.green,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 500,
  },
  background: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    flex: 1,
    paddingVertical: 60,
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerh2: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerH4: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '30%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    width: 70,
    height: 20,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  listWrapper: {
    // flexDirection: 'column',
    // flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    margin: 2,
  },
  // single item styling
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    // backgroundColor: colors.lightGrey,
    
  },

  complete: {
    fontSize: 16,
    // backgroundColor: colors.lightGrey,
    color: colors.red,
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  delete: {
    // backgroundColor: colors.lightGrey,
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 2,
  },

  input: {
    borderRadius: 8,
    textAlign: 'center',
    padding: 2,
    width: '70%',
    backgroundColor: colors.white,
  },
  // smallContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingBottom: 40,
  //   backgroundColor: 'grey',
  //   borderRadius: 8,
  // },
  headerContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  // rightColumn: {
  //   // flexDirection: 'column',
  //   indexZ: 1,
  //   // alignItems: 'flex-end',
  //   justifyContent: 'center',
  //   // marginTop: 10,
  //   paddingLeft: 30
  // },
})
export default SingleProjectPage
