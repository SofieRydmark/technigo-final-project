import mongoose from "mongoose"

const ThemeProjectSchema = new mongoose.Schema({
    themesName: {
      type: String, 
    }
  })

  const ThemeProject = mongoose.model('ThemeProject', ThemeProjectSchema);
  module.exports = ThemeProject; 