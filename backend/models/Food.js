import mongoose from "mongoose";


const FoodSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: Array,
    belongs_to_themes: Array,
  })
  
  const Food = mongoose.model('Food', FoodSchema);
  module.exports = Food; 