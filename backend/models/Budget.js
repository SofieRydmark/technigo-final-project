import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema({
    itemName: {
      type: String,
      trim: true,
    },
    itemPrice: {
      type: Number,
    },
  })

  const Budget = mongoose.model('Budget', BudgetSchema);
  module.exports = Budget; 