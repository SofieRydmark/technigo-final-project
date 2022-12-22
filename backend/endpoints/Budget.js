import mongoose from 'mongoose'
const Project = require('../models/Project')
const User = require('../models/User')
const Budget = require('../models/Budget')

//--- add new update to the budgetList --- //

export const AddBudget = async (req, res) => {
    const { userId, projectId } = req.params
    const { itemName, itemPrice } = req.body
try{
    const user = await User.find({ userId })
    const project = await Project.find({ projectId }) 
    if(user && project){
        const addedItem = await Project.findByIdAndUpdate({ _id: projectId}, {
            $push: { budgetList: new Budget({ itemName, itemPrice }),
        }})
        res.status(200).json({
            response: "Item added to budget",
            data: addedItem
        })
    }else {
        res.status(500).json({
            response: "Could not update"
        });
    }

    }catch{
        res.status(401).json({
            response: "Invalid credentials",
            success: false,
            error: error
    })

    }

}

//--- Update items in budget --- while changing is deleted all other options from an array, I could not find a bug, why it is doing it. Same problem that if we would like to update only one param ex itemName the other one resets to null, why?? //

/* export const updateBudget = async (req, res) => {
    const { userId, projectId, itemId } = req.params
    const { itemName, itemPrice, _id } = req.body
  
   try{
  
    const projectToUpdate= await Project.findOne({ userId, projectId, itemId })

      if (projectToUpdate){
  
        const updatedItem = await Project.findByIdAndUpdate({ _id: projectId},  { 
           $set: {budgetList: ({itemName: itemName, itemPrice:itemPrice, _id: mongoose.Types.ObjectId(itemId)})}
          });
      
              res.status(200).json({
              response: "Updated",
              data: updatedItem
        });
  
      } else {
              res.status(500).json({
              response: "Could not update"
        });
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  } */

//--- delete item from the budget list --- //

export const deleteItemFromBudget = async (req, res) => {
    const { userId, projectId, itemId } = req.params
    const { budgetList } = req.body
  
    try {
    const user = await User.find({ userId })
    const project = await Project.find({ projectId })
    const itemToDelete =  await Project.findByIdAndUpdate({_id: projectId}, {$pull: {budgetList: {_id: mongoose.Types.ObjectId(itemId)}}});
    // console.log("item to delete", itemToDelete)
      if (user && project) {
  
        res.status(200).json({
          response: `Item has been deleted`,
          success: true,
        })
      } else {
        res.status(404).json({
          response: `Item not found`,
          success: false,
        })
      }
    } catch (error) {
        res.status(401).json({
            response: 'Invalid credentials',
            success: false,
      })
    }
  
   }