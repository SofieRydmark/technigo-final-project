import mongoose from "mongoose"

const ThemeProjectSchema = new mongoose.Schema({
    themesName: {
      type: String, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  })

  const ThemeProject = mongoose.model('ThemeProject', ThemeProjectSchema);
  module.exports = ThemeProject; 