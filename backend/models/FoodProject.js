import mongoose from "mongoose"

const FoodProjectSchema = new mongoose.Schema({
    foodName: {
      type: String, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  })

  const FoodProject = mongoose.model('FoodProject', FoodProjectSchema);
  module.exports = FoodProject; 