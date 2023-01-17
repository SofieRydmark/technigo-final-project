import mongoose from 'mongoose'

const DrinkSchema = new mongoose.Schema({
  name: String,
  image: String,
  type: Array,
  belongs_to_themes: Array,
})

const Drink = mongoose.model('Drink', DrinkSchema)
module.exports = Drink
