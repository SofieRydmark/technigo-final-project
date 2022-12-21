import mongoose from "mongoose"

const DrinksProjectSchema = new mongoose.Schema({
    drinksName: {
      type: String, 
    }
  })

  const DrinksProject = mongoose.model('DrinksProject', DrinksProjectSchema);
  module.exports = DrinksProject; 