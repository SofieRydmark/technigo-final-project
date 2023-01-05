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


const SingleProjectPage = ({ navigation }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const [singleProject, setSingleProject] = useState([])
  const userId = useSelector((store) => store.user.userId)
  const dispatch = useDispatch()


  const getSingleProject = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9`, options)
      .then((res) => res.json())
      .then((data) => setSingleProject(data.data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getSingleProject()
  }, [])

   /****************** TOOGLE OBJECT PROJECT  ************************* */
   const completedDrinks = (drinksId) => {
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
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9/completed/drink/${drinksId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
  console.log('marked as completed',completedDrinks)

  }

  const completedTheme = (themeId) => {
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
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9/completed/theme/${themeId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
  console.log('marked as completed',completedTheme)

  }

  const completedFood = (foodId) => {
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
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9/completed/food/${foodId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
  console.log('marked as completed',completedFood)

  }
  const completedActivities = (activityId) => {
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
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9/completed/activity/${activityId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
  console.log('marked as completed',completedActivities)

  }

  const completedDecorations = (decorationId) => {
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
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/63b58581b9761f6338902ec9/completed/decoration/${decorationId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
  console.log('marked as completed',completedDecorations)

  }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Single Project</Text>
        {singleProject.map((project) => {
  return (
    <View key={project._id}>
      <Text>{project.due_date}</Text>
      <Text style={styles.headerH1}>{project.name}</Text>

      <Text>THEME</Text>
      {project.themeProjectList.map((theme) => {
        return (
          <View key={theme._id}>
            <Text>{theme.themesName}</Text>
            <Text>{theme.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedTheme(theme._id, theme.isCompleted)}> Mark as completed</Button>
          </View>
        );
      })}

      <Text>Activities</Text>
      {project.activitiesProjectList.map((activity) => {
        return (
          <View key={activity._id}>
            <Text>{activity.activitiesName}</Text>
            <Text>{activity.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedActivities(activity._id, activity.isCompleted)}> Mark as completed</Button>
          </View>
        );
      })}

      <Text>DECORATION</Text>
      {project.decorationsProjectList.map((decoration) => {
        return (
          <View key={decoration._id}>
            <Text>{decoration.decorationsName}</Text>
            <Text>{decoration.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedDecorations(decoration._id, decoration.isCompleted)}> Mark as completed</Button>
          </View>
        );
      })}

      <Text>FOOD</Text>
      {project.foodProjectList.map((food) => {
        return (
          <View key={food._id}>
            <Text>{food.foodName}</Text>
            <Text>{food.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedFood(food._id, food.isCompleted)}> Mark as completed</Button>
          </View>
        );
      })}

      <Text>DRINKS</Text>
      {project.drinksProjectList.map((drinks) => {
        return (
          <View key={drinks._id}>
            <Text>{drinks.drinksName}</Text>
            <Text>{drinks.isCompleted ? 'Completed' : 'Incomplete'}</Text>
            <Button title='Mark as completed' onPress={() => completedDrinks(drinks._id, drinks.isCompleted)}> Mark as completed</Button>
          </View>
        );
      })}


      {project.budgetList.map((budget) => {
        return (
          <View key={budget._id}>
            <Text>{budget.activitiesName}</Text>
            {/* <Text>{activity.isCompleted ? 'Completed' : 'Incomplete'}</Text> */}
          </View>
        );
      })}

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
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  headerH1: {
    fontSize: 25,
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
})
export default SingleProjectPage
