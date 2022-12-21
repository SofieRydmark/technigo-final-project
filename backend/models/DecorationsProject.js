import mongoose from "mongoose"

const DecorationProjectSchema = new mongoose.Schema({
    decorationsName: {
      type: String, 
    }
  })

  const DecorationProject = mongoose.model('DecorationProject', DecorationProjectSchema);
  module.exports = DecorationProject; 