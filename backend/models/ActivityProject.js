import mongoose from "mongoose"

const ActivityProjectSchema = new mongoose.Schema({
  activitiesName: {
      type: String, 
    }
  })

  const ActivityProject = mongoose.model('ActivityProject', ActivityProjectSchema);
  module.exports = ActivityProject; 