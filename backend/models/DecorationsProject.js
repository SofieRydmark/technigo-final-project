import mongoose from "mongoose"

const DecorationProjectSchema = new mongoose.Schema({
    DrinksName: {
      type: String, 
    }
  })

  const DecorationProject = mongoose.model('DecorationProject', DecorationProjectSchema);
  module.exports = DecorationProject; 