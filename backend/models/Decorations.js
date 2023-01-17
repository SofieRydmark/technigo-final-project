import mongoose from 'mongoose'

const DecorationSchema = new mongoose.Schema({
  name: String,
  image: String,
  type: Array,
  belongs_to_themes: Array,
})

const Decoration = mongoose.model('Decoration', DecorationSchema)
module.exports = Decoration
