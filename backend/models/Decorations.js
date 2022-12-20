import mongoose from "mongoose"
import decorationsData from '../data/decorations.json'

const DecorationSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: Array,
    belongs_to_themes: Array,
  })

const Decoration = mongoose.model('Decoration', DecorationSchema);
module.exports = Decoration
  