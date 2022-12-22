import mongoose from "mongoose"

const DecorationProjectSchema = new mongoose.Schema({
    decorationsName: {
      type: String, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  })

  const DecorationProject = mongoose.model('DecorationProject', DecorationProjectSchema);
  module.exports = DecorationProject; 