import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native'

// Assets import
import colors from 'assets/styling/colors.js'
import fonts from 'assets/styling/fonts.js'
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
      <View style={styles.wrapper}>
        <Text style={styles.headerH1}>Budget</Text>
        <View style={[styles.whiteContainer, styles.boxShadow]}>
          <View style={styles.smallHeaderContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.headingh3}>ITEM</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.headingh3}>PRICE</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder='Enter item name'
                required
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder='Enter price'
                required
              />
            </View>
          </View>

          <View style={[styles.buttonContainer, styles.boxShadow]}>
            <TouchableOpacity style={styles.changeButton} onPress={handleCreate}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {project.budgetList.map((budget) => {
            return (
              <View key={budget._id} style={styles.budgetContainer}>
                <View style={styles.leftColumn}>
                  <Text style={styles.text}>{budget.itemName}</Text>
                </View>
                <View style={styles.rightColumn}>
                  <TouchableOpacity
                    title='DELETE'
                    onPress={() => handleDelete(budget._id)}
                    style={styles.deleteButton}>
                    <Text>🗑</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{budget.itemPrice} KR</Text>
                </View>
              </View>
            )
          })}

          <View style={styles.budgetContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.textTotal}>Total</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.textTotal}>{totalSum} KR</Text>
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
    flex: 1,
  },
  headerH1: {
    marginTop: 100,
    fontSize: 30,
    fontFamily: fonts.titles,
    textAlign: 'center',
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
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 18,
    borderColor: colors.lightGrey,
    color: colors.darkGrey,
    fontFamily: fonts.input,
  },
  inputBox: {
    width: 150,
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '40%',
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.peach,
  },
  budgetContainer: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 15,
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
    textAlign: 'center',
  },
  buttonText: {
    fontFamily: fonts.button,
    fontSize: 18,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 18,
  },
  textTotal: {
    fontFamily: fonts.button,
    fontSize: 18,
  },
  whiteContainer: {
    backgroundColor: colors.white,
    marginTop: 40,
    padding: 30,
    borderRadius: 15,
    width: '85%',
  },
  smallHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
  headingh3: {
    fontFamily: fonts.text,
    textTransform: 'uppercase',
    fontSize: 20,
    color: colors.darkGrey,
  },
})
export default Budget
