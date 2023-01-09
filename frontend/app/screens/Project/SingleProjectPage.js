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
  FlatList,
  SafeAreaView,
} from 'react-native'

import colors from '../../config/colors'
import user from '../../reducers/user'
import { ui } from '../../reducers/ui'


const SingleProjectPage = ({ navigation, route }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [singleProject, setSingleProject] = useState([]);
  const userId = useSelector((store) => store.user.userId);
  const [showInput, setShowInput] = useState(false);
  const [showDateChange, setShowDateChange] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const projectId = route.params.projectId
  const dispatch = useDispatch()


  const getSingleProject = ( ) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}`, options)
      .then((res) => res.json())
      .then((data) => setSingleProject(data.data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false))  )
  }

  useEffect(() => {
    getSingleProject()
  }, [])

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
    };
    console.log('id', drinksId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/drink/${drinksId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',completedDrinks)

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
    };
    console.log('id', themeId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/theme/${themeId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)));
  console.log('marked as completed',completedTheme)

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
    };
    console.log('id', foodId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/food/${foodId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',completedFood)

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
    };
    console.log('id', activityId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/activity/${activityId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)));
  console.log('marked as completed',completedActivities)

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
    };
    console.log('id', decorationId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/completed/decoration/${decorationId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',completedDecorations)

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
    };
    console.log('id', drinksId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteDrink/${drinksId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',deleteFood)

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
    };
    console.log('id', foodId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteFood/${foodId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',deleteFood)

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
    };
    console.log('id', decorationId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteDecoration/${decorationId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  console.log('marked as completed',deleteDecoration)

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
    };
    console.log('id', activityId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteActivity/${activityId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)));
  console.log('marked as completed',deleteActivity)

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
    };
    console.log('id', themeId)
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteTheme/${themeId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)));
  console.log('marked as completed',deleteTheme)

  }
   /****************** CHANGE NAME OBJECT PROJECT  ************************* */

  const singleProjectChange = ( options) => {
    dispatch(ui.actions.setLoading(true))
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/change/${projectId}`, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };
  
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
    };
  
    singleProjectChange( options);
  };
  
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
    };
  
    singleProjectChange( options);
  };


  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        {singleProject.map((project) => {
        return (
          <View key={project._id}>
          <Text style={styles.headerH1}>{project.name}</Text>
          <Text style={styles.headerH1}>{project.due_date}</Text>
          <View>
    <TouchableOpacity onPress={() => setShowInput(!showInput)}
    style={styles.changeButton}> 
    <Text>Change name </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('GuestList', { projectId: singleProject._id })}}>
      <Text style={styles.row}>GUEST LIST</Text>
    </TouchableOpacity>
    {showInput && (
      <View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter new name"
        />
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => {
            changeName(name, console.log('onpress', name));
            setShowInput(false);
            
          }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        
      </View>
    )}
    <TouchableOpacity onPress={(()=> setShowDateChange(!showDateChange))} 
    style={styles.changeButton} > 
          <Text>Change Date</Text>
    </TouchableOpacity>
    {showDateChange &&(
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
        setShowDateChange(false);
        }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )}
   
  </View>
  <View style={styles.listWrapper}>
      <Text style={styles.headerh2}>THEME</Text>
      {project.themeProjectList.map((theme) => {
        return (
          <View key={theme._id} style={styles.smallContainer}>
            <Text style={styles.row}>{theme.themesName}</Text>
            <Text style={styles.row}>{theme.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedTheme(theme._id, theme.isCompleted)}style={styles.row}> Mark as completed</Button>
            <Button title='DELETE' onPress={() => deleteTheme(theme._id, )} style={styles.row}> Mark as completed</Button>
          </View>
        );
      })}

      <Text style={styles.headerh2}>Activities</Text>
      {project.activitiesProjectList.map((activity) => {
        return (
          <View key={activity._id}>
            <Text style={styles.row}>{activity.activitiesName}</Text>
            <Text style={styles.row}>{activity.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedActivities(activity._id, activity.isCompleted)} style={styles.row}> Mark as completed</Button>
            <Button title='DELETE' onPress={() => deleteActivity(activity._id, )} style={styles.row}> Mark as completed</Button>
          </View>
        );
      })}

      <Text style={styles.headerh2}>DECORATION</Text>
      {project.decorationsProjectList.map((decoration) => {
        return (
          <View key={decoration._id}>
            <Text>{decoration.decorationsName}</Text>
            <Text>{decoration.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedDecorations(decoration._id, decoration.isCompleted)} style={styles.row}> Mark as completed</Button>
            <Button title='DELETE' onPress={() => deleteDecoration(decoration._id, )} style={styles.row}> Mark as completed</Button>
          </View>
        );
      })}

      <Text style={styles.headerh2}>FOOD</Text>
      {project.foodProjectList.map((food) => {
        return (
          <View key={food._id}>
            <Text>{food.foodName}</Text>
            <Text>{food.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedFood(food._id, food.isCompleted)} style={styles.row}> Mark as completed</Button>
            <Button title='DELETE' onPress={() => deleteFood(food._id, )} style={styles.row}> Mark as completed</Button>
          </View>
        );
      })}

      <Text style={styles.headerh2}>DRINKS</Text>
      {project.drinksProjectList.map((drinks) => {
        return (
          <View key={drinks._id}>
            <Text>{drinks.drinksName}</Text>
            <Text>{drinks.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedDrinks(drinks._id, drinks.isCompleted)} style={styles.row}> Mark as completed</Button>
            <Button title='DELETE' onPress={() => deleteDrinks(drinks._id, )} style={styles.row}> Mark as completed</Button>
          </View>
        );
      })}

{/* <Button title='Brows categories 'onPress={navigation.navigate('BrowsingCategoriesPage', { projectId:singleProject._id })} /> */}
      {project.budgetList.map((budget) => {
        return (
          <View key={budget._id}>
            <Text>{budget.activitiesName}</Text>
            {/* <Text>{activity.isCompleted ? 'Completed' : 'Incomplete'}</Text> */}
          </View>
        );
      })}

    </View>
    </View>
  );
})}
      
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectBoard')}
          style={styles.partyButton}>
          <Text style={styles.buttonText}>Back to projectBoard</Text>
        </TouchableOpacity>
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
  },
  header: {
   /*  marginBottom: 30, */
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerh2 : {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  listWrapper:{
    flexDirection: 'column',
    backgroundColor:'#fff',
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexWrap: 'wrap',
    margin: 2, 
    paddingLeft: 100, 
    paddingRight: 100
   /*  padding: 20, */
     

  },
  row: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16
    
  },
  input: {
    borderRadius: 8,
    textAlign: 'center',
    padding: 2,
    width: '70%',
    backgroundColor: colors.white,
  }, 
  smallContainer: {
    /* flexDirection: 'row', */
  }
})
export default SingleProjectPage
