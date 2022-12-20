import mongoose from "mongoose"

const FoodProjectSchema = new mongoose.Schema({
    DrinksName: {
      type: String, 
    }
  })

  const FoodProject = mongoose.model('FoodProject', FoodProjectSchema);
  module.exports = FoodProject; 