import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'

// Assets import
import { BudgetStyles } from 'components/ProjectStyling/BudgetStoreGuestList.styling'
import { ADD_BUDGET_URL, DELETE_BUDGET_OBJECT_URL } from '../../assets/urls/urls'

// Reducers
import { ui } from '../../reducers/ui'

const Budget = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const dispatch = useDispatch()
  const projectId = route.params.projectId
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [project, setProject] = useState(route.params.project)

  const totalSum = project.budgetList.reduce((sum, budget) => sum + Number(budget.itemPrice), 0)

  const createNew = () => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        itemName: itemName,
        itemPrice: itemPrice,
      }),
    }
    fetch(ADD_BUDGET_URL(userId, projectId), options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }

  const deleteItem = (itemId) => {
    dispatch(ui.actions.setLoading(true))
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(DELETE_BUDGET_OBJECT_URL(userId, projectId, itemId), options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
  const handleCreate = () => {
    createNew()
    setItemName('')
    setItemPrice('')
    setProject((prev) => {
      return { ...prev, budgetList: [...prev.budgetList, { itemName, itemPrice }] }
    })
  }

  const handleDelete = (itemId) => {
    deleteItem(itemId)
    setProject({ ...project, budgetList: project.budgetList.filter((item) => item._id !== itemId) })
  }

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
      BudgetStyles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: xOffset, height: yOffset },
      }
    } else if (Platform.OS === 'android') {
      BudgetStyles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
    }
  }
  generateBoxShadowStyle(-8, 6, '#171717', 0.2, 6, 8, '#171717')
  return (
    <ScrollView
      style={BudgetStyles.background}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={BudgetStyles.wrapper}>
        <Text style={BudgetStyles.headerH1}>Budget</Text>
        <View style={[BudgetStyles.whiteContainer, BudgetStyles.boxShadow]}>
          <View style={BudgetStyles.smallHeaderContainer}>
            <View style={BudgetStyles.leftColumn}>
              <Text style={BudgetStyles.headingh3}>ITEM</Text>
            </View>
            <View style={BudgetStyles.rightColumn}>
              <Text style={BudgetStyles.headingh3}>PRICE</Text>
            </View>
          </View>
          <View style={BudgetStyles.inputContainer}>
            <View style={BudgetStyles.inputBox}>
              <TextInput
                style={BudgetStyles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder='Enter item name'
                required
              />
            </View>
            <View style={BudgetStyles.inputBox}>
              <TextInput
                style={BudgetStyles.input}
                keyboardType={'numeric'}
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder='Enter price'
                required
              />
            </View>
          </View>

          <View style={[BudgetStyles.buttonContainer, BudgetStyles.boxShadow]}>
            <TouchableOpacity style={BudgetStyles.changeButton} onPress={handleCreate}>
              <Text style={BudgetStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {project.budgetList.map((budget) => {
            return (
              <View key={budget._id} style={BudgetStyles.budgetContainer}>
                <View style={BudgetStyles.leftColumn}>
                  <Text style={BudgetStyles.text}>{budget.itemName}</Text>
                </View>
                <View style={BudgetStyles.rightColumn}>
                  <TouchableOpacity
                    title='DELETE'
                    onPress={() => handleDelete(budget._id)}
                    style={BudgetStyles.deleteButton}>
                    <Text>🗑</Text>
                  </TouchableOpacity>
                  <Text style={BudgetStyles.text}>{budget.itemPrice} KR</Text>
                </View>
              </View>
            )
          })}

          <View style={BudgetStyles.budgetContainer}>
            <View style={BudgetStyles.leftColumn}>
              <Text style={BudgetStyles.textTotal}>Total</Text>
            </View>
            <View style={BudgetStyles.rightColumn}>
              <Text style={BudgetStyles.textTotal}>{totalSum} KR</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Budget
