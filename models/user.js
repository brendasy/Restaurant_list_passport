const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)