import mongoose from "mongoose"

const ActivityProjectSchema = new mongoose.Schema({
    DrinksName: {
      type: String, 
    }
  })

  const ActivityProject = mongoose.model('ActivityProject', ActivityProjectSchema);
  module.exports = ActivityProject; 