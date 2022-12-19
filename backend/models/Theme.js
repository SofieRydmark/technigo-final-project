import mongoose from "mongoose";


const ThemeSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: Array,
  })

  const Theme = mongoose.model('Theme', ThemeSchema);
  module.exports = Theme;