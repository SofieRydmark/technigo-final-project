import mongoose from "mongoose"

const DrinksProjectSchema = new mongoose.Schema({
    DrinksName: {
      type: String, 
    }
  })

  const DrinksProject = mongoose.model('DrinksProject', DrinksProjectSchema);
  module.exports = DrinksProject; 