import mongoose from "mongoose"

const DrinksProjectSchema = new mongoose.Schema({
    drinksName: {
      type: String, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  })

  const DrinksProject = mongoose.model('DrinksProject', DrinksProjectSchema);
  module.exports = DrinksProject; 