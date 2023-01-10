import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'


import { ui } from '../../reducers/ui'
import colors from 'assets/styling/colors.js'
import { project } from '../../reducers/user'

const Budget = ({ navigation, route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const dispatch= useDispatch()
  const project = route.params.project
  const projectId = route.params.projectId
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')


  const createNew = ( itemName ) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: accessToken,
      },
       body: JSON.stringify({
        itemName: itemName,  // values comes from Formik
        itemPrice : itemPrice
        }),
      }
      fetch(`https:party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/addItem`, options)
      .then ((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(()=> dispatch(ui.actions.setLoading(false)))

  }

  const deleteItem = ( itemId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
       body: JSON.stringify({ _id: itemId })

    };
    fetch(`https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/${userId}/project-board/projects/${projectId}/deleteItem/${itemId}`, options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  

  }

/*   useEffect(() => {
    getSingleProject()
  }, [singleProject]) */
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerH1}>Budget</Text>
        <TextInput
          style={styles.input}
          value={itemPrice}
          onChangeText={setItemPrice}
          placeholder='Enter price'
          />
      
          <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder='Enter item name'
          />
          <TouchableOpacity
          style={styles.changeButton}
          onPress={() => {
          createNew(itemName,itemPrice, console.log('onpress', itemName, itemPrice))
                        /* setShowInput(false) */
          }}> 
          <Text>Submit</Text>
          </TouchableOpacity>
                    
        {project.budgetList.map((budget) => {
          return(
            <View key={budget._id}>
            <Text>{budget.itemName}</Text>
            <Text>{budget.itemPrice}</Text>

            <TouchableOpacity
              title='DELETE'
              onPress={() => deleteItem(budget._id)}
              style={styles.row}>
                <Text>Delete</Text>
              </TouchableOpacity>

            </View>
          )
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
export default Budget
