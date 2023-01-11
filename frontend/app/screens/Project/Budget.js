import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'


import { ui } from '../../reducers/ui'
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
import { ADD_BUDGET_URL, DELET_BUDGET_OBJECT_URL } from '../../assets/urls/urls'

const Budget = ({ navigation, route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const dispatch= useDispatch()
  const projectId = route.params.projectId
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [project, setProject] = useState(route.params.project);
  
  const totalSum = project.budgetList.reduce((sum, budget) => sum + Number(budget.itemPrice), 0);

  const createNew = ( ) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: accessToken,
      },
       body: JSON.stringify({
        itemName: itemName,
        itemPrice : itemPrice
        }),
      }
      fetch(ADD_BUDGET_URL(userId, projectId), options)
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
       /* body: JSON.stringify({ _id: itemId }) */
    };
    fetch(DELET_BUDGET_OBJECT_URL(userId, projectId, itemId), options)
      .then((res) => res.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error))
       .finally(() => dispatch(ui.actions.setLoading(false)))
  }
  const handleCreate = () => {
    createNew();
    setItemName('');
    setItemPrice('');
    setProject(prev => {
        return { ...prev, budgetList: [...prev.budgetList, { itemName, itemPrice }] }
    });
  }

  const handleDelete = (itemId) => {
    deleteItem(itemId);
    setProject({ ...project, budgetList: project.budgetList.filter(item => item._id !== itemId) });
  }
  return (
    <ScrollView contentContainerStyle={styles.background}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
        <Text style={styles.headerH1}>BUDGET</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('SingleProjectPage', {projectId: project._id })}
        style={styles.partyButton}>
        <Text style={styles.buttonText}>Back to overview</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.whiteContainer}>
        <View style={styles.smallHeaderContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.headingh3}>ITEM</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.headingh3}> PRICE </Text>
          </View>
          </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder='Enter item name'
            required
          />

          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            value={itemPrice}
            onChangeText={setItemPrice}
            placeholder='Enter price'
            required
            />
          </View>  

          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.changeButton}
            onPress={handleCreate}> 
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

        {project.budgetList.map((budget) => {
          return(
            <View key={budget._id} style={styles.budgetContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.text}>{budget.itemName}</Text>
              </View>
                <View style={styles.rightColumn}>
                  <TouchableOpacity
                    title='DELETE'
                    onPress={() => handleDelete(budget._id)}
                    style={styles.deleteButton}>
                    <Text >🗑</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{budget.itemPrice} KR</Text>
                </View>
            </View>
          )
        })}
         
        <View style={styles.budgetContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.text}>Total</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.text}>{totalSum} KR</Text>
          </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.green,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 500,
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent:'center', 
  },

  wrapper: {
    marginBottom: 30,
    marginTop: 20, 
  },
  headerH1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.titles,
    marginTop: 10, 
  },
  partyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    width: '50%',
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.peach,
  },
  inputContainer: {
    marginTop: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
  }, 
  input: {
    marginBottom: 10,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 12,
    borderColor: colors.lightGrey,
    color: colors.darkGrey, 
    width: '45%', 
    fontFamily: fonts.input
  },
  buttonContainer: {
    marginTop: 10, 
    alignItems: 'center',
    justifyContent:'center'
  }, 
  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 110,
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.peach,
  },
  budgetContainer: {
    flexDirection: 'row', 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: colors.lightGrey, 
    borderRadius: 12, 
  }, 
  leftColumn: {
    flex: 1, 
    alignItems: 'flex-start', 
  }, 
  rightColumn: {
    flex: 1, 
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  deleteButton: {
    marginLeft: 10, 
  }, 
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 100, 
    textAlign: 'center'
  }, 
  buttonText: {
    fontFamily: fonts.button
  }, 
  text: {
    fontFamily: fonts.text
  }, 
  whiteContainer: {
    backgroundColor: 'white', 
    flex: 0.5,
    marginTop: 40, 
    padding: 30, 
    borderRadius: 15, 
  }, 
  smallHeaderContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    textAlign: 'center', 
    paddingRight: 50, 
    paddingLeft: 50, 
    
  }, 

  headingh3: {
    fontFamily: fonts.titles
  }

  
})
export default Budget
