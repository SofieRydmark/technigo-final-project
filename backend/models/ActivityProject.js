import mongoose from "mongoose"

const ActivityProjectSchema = new mongoose.Schema({
  activitiesName: {
      type: String, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  })

  const ActivityProject = mongoose.model('ActivityProject', ActivityProjectSchema);
  module.exports = ActivityProject; 