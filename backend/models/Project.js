import mongoose from "mongoose";
const Guest = require('../models/Guest.js')

const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      trim: true, // remove unnecessary white spaces
    },
    userProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    due_date: {
      type: String,
      default: 'YY-MM-DD',
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    guestList: {
      type: Array,
      guestName: String,
      phone: Number,
      default: null,
    },
    themes: { type: Array, default: null },
    decorations: { type: Array, default: null },
    food: { type: Array, default: null },
    drinks: { type: Array, default: null },
    activities: { type: Array, default: null },
  })
  
  const Project = mongoose.model('Project', ProjectSchema)
  module.exports = Project; 

  