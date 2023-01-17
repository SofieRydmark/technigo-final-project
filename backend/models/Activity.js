import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema({
  name: String,
  image: String,
  type: Array,
  belongs_to_themes: Array,
})

const Activity = mongoose.model('Activity', ActivitySchema)
module.exports = Activity
