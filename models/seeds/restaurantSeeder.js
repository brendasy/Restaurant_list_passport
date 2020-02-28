const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant',
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {

  console.log('db connected!')
  Restaurant.create(restaurants.results)
  console.log('done')
}) 