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
import CalendarPicker from 'react-native-calendar-picker';

// Assets import
import fonts from 'assets/styling/fonts.js'
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
  const [calendarVisible, setCalendarVisible] = useState(false);

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
    };
  
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/${endpoint}/${id}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)));
      console.log(`marked as completed ${endpoint}`);
  };
  
  const completedDrinks = (drinksId) => {
    completed("drink", drinksId);
  }
  const completedTheme = (themeId) => {
    completed("theme", themeId);
  }
  const completedFood = (foodId) => {
    completed("food", foodId);
  }
  const completedDecorations = (decorationId) => {
    completed("decoration", decorationId);
  }
  const completedActivities = (activityId) => {
    completed("activity", activityId);
  }
   /****************** DELETE SINGLE OBJECT PROJECT  ************************* */

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
    };
    console.log('id', id)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/delete${endpoint}/${id}`, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)));
    console.log(`marked as deleted ${endpoint}`);
  };
  
  const deleteDecoration = (decorationId, name) => {
    deleteObject("Decoration", decorationId, name, "decorationsName");
  };

  const deleteTheme = (themeId, name) => {
    deleteObject("Theme", themeId, name, "themesName");
  };

  const deleteFood = (foodId, name) => {
    deleteObject("Food", foodId, name, "foodName");
  };

  const deleteDrinks = (drinksId, name) => {
    deleteObject("Drink", drinksId, name, "drinksName");
  };
  const deleteActivity = (activityId, name) => {
    deleteObject("Activity", activityId, name, "activitiesName");
  };
  
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
          <View key= {project._id}>
            <View style={styles.headerContainer}>
              <View style={styles.leftColumn}>
                    
          <Text style={styles.headerH1}>{project.name}</Text>
                <Text style={styles.headerH4}>{project.due_date}</Text>
              </View>
              <View style={styles.rightColumn}>
                <TouchableOpacity
                  onPress={() => setShowInput(!showInput)}
                  style={[styles.changeButton, styles.buttonText]}>
                  <Text>Change name </Text>
                </TouchableOpacity>
             
    {showInput && (
                  <View>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder='New name'
                    />
                    <TouchableOpacity
                      style={[styles.changeButton, styles.buttonText]}
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
                  style={[styles.changeButton, styles.buttonText]}>
                  <Text>Change Date</Text>
                </TouchableOpacity>
                {showDateChange && (
                  <View>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setDueDate(text)}
                      value={dueDate}
                      placeholder='YYYY-MM-DD'
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
          <View style={styles.whiteWrapper}>
            <View style={styles.guestBudgetButton}>
            <TouchableOpacity  style={styles.partyButton} onPress={() => {navigation.navigate('GuestList', { project: project, projectId: project._id })}}>
                <Text style={[styles.row, styles.buttonText]}>GUEST LIST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.partyButton}  onPress={() => {navigation.navigate('Budget', { project: project, projectId: project._id })}}>
                <Text style={[styles.row, styles.buttonText]}>BUDGET</Text>
            </TouchableOpacity>          
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('ProjectBoard')}
              style={styles.partyButton}>
              <Text style={styles.buttonText}>Back to projectBoard</Text>
            </TouchableOpacity> */}

            </View>

            <View>
              <Text style={styles.headerh2}>THEME</Text>
              {project.themeProjectList.map((theme) => {
                return (
                  <View key={theme._id} style={styles.listWrapper}>
                    <View styles={styles.leftColumn}>
                      <Text style={[styles.row, styles.text]}>{theme.themesName}</Text>
                      {/* <Text style={[styles.row, styles.text]}>
                        {theme.isCompleted ? 'Completed' : 'Incomplete'}
                      </Text> */}
                    </View>
                      {/* <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedTheme(theme._id, theme.isCompleted)}
                        style={styles.complete}>
                        <Text>???</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteTheme(theme._id)}
                        style={styles.delete}>
                        <Text>????</Text>
                      </TouchableOpacity>
                  </View>
                )
              })}

              <Text style={styles.headerh2}>ACTIVITIES</Text>
              {project.activitiesProjectList.map((activity) => {
                return (
                  <View key={activity._id} style={styles.listWrapper} /* style={styles.smallContainer} */>
                    <View style={styles.leftColumn}>
                      <Text style={[styles.row, styles.text]}>{activity.activitiesName}</Text>
                      <Text style={styles.row}>
                        {/* {activity.isCompleted ? '??????' : '??????'} */}
                      </Text>
                    </View>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedActivities(activity._id, activity.isCompleted)}
                        style={styles.complete}>
                        <Text>{activity.isCompleted ? '???' : '????'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteActivity(activity._id)}
                        style={styles.delete}>
                        <Text>????</Text>
                      </TouchableOpacity>
                  </View>
                )
              })}

              <Text style={styles.headerh2}>DECORATION</Text>
              {project.decorationsProjectList.map((decoration) => {
                return (
                  <View key={decoration._id} style={styles.listWrapper}>
                    <View styles={styles.leftColumn}>
                      <Text style={[styles.row, styles.text]}>{decoration.decorationsName}</Text>
                      <Text style={[styles.row, styles.text]}>{ /* {decoration.isCompleted ? '??????' : '??????'} */}</Text>

                    </View>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedDecorations(decoration._id, decoration.isCompleted)}
                        style={styles.complete}>
                        <Text >{decoration.isCompleted ? '???' : '????'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteDecoration(decoration._id)}
                        style={styles.delete}>
                        <Text>????</Text>
                      </TouchableOpacity>
                  </View>
                )
              })}

              <Text style={styles.headerh2}>FOOD</Text>
              {project.foodProjectList.map((food) => {
                return (
                  <View key={food._id} style={styles.listWrapper}>
                    <View style={styles.leftColumn}>
                      <Text style={[styles.row, styles.text]}>{food.foodName}</Text>
                      <Text style={[styles.row, styles.text]}>{/*{food.isCompleted ? '??????' : '??????'}*/}</Text>
                    </View>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedFood(food._id, food.isCompleted)}
                        style={styles.complete}>
                        <Text>{food.isCompleted ? '???' : '????'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteFood(food._id)}
                        style={styles.delete}>
                        <Text>????</Text>
                      </TouchableOpacity>
                    </View>
                )
              })}

              <Text style={styles.headerh2}>DRINKS</Text>
              {project.drinksProjectList.map((drinks) => {
                return (
                  <View key={drinks._id} style={styles.listWrapper}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.row}>{drinks.drinksName}</Text>
                      <Text style={[styles.row, styles.text]}>{/*{drinks.isCompleted ? '???' : '????'}*/}</Text>
                    </View>
                      <TouchableOpacity
                        title='Mark as completed'
                        onPress={() => completedDrinks(drinks._id, drinks.isCompleted)}
                        style={styles.complete}>
                        <Text>{drinks.isCompleted ? '???' : '????'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        title='DELETE'
                        onPress={() => deleteDrinks(drinks._id)}
                        style={styles.delete}>
                        <Text>????</Text>
                      </TouchableOpacity>
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
            </View>
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

  // *** STYLING HEADERS *** //
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
  headerContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
    // justifyContent:'center',
    // flexWrap: 'wrap',
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  listWrapper: {
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5

  },

  whiteWrapper: {
    borderRadius: 10,
    padding: 25,
    backgroundColor: colors.white,

  },

  // *** SINGLE ITEM STYLING *** //
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    // fontFamily: fonts.button
  },

  text: {
    fontFamily: fonts.text
  }, 

  complete: {
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 35,
  },

  delete: {
    zIndex: 10,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },

  // *** STYLING CHANGE NAME & DUE_DATE *** // 
  input: {
    backgroundColor: colors.lightGrey,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: fonts.input,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
  },

  // * STYLING BUTTONS *// 
  buttonText: {
    fontFamily: fonts.button
  }, 

  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '40%',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },

  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.button,
    width: 70,
    height: 20,
    borderRadius: 8,
    marginBottom:10,
    backgroundColor: colors.peach,
  },

  guestBudgetButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    borderRadius: 8,
    marginBottom: 2, 

  },


})
export default SingleProjectPage
