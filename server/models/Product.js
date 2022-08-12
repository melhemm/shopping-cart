const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  categories: {
    type: Array
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Product", productSchema)
