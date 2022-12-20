import mongoose from "mongoose"

const GuestSchema = new mongoose.Schema({
    guestName: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
    },
  })

  const Guest = mongoose.model('Guest', GuestSchema);
  module.exports = Guest; 