import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
  id: Number,
  company: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
})

const Store = mongoose.model('Store', StoreSchema)
module.exports = Store
