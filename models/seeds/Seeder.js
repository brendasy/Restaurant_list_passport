const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const seeds = require('../../seeder.json')
const bcrypt = require('bcryptjs')


mongoose.connect('mongodb://localhost/restaurant',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {

  console.log('db connected!')
  //  Restaurant.create(restaurants.results)

  const users = seeds.users
  users.forEach(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err

        const newUser = new User({ email: user.email, name: user.name, password: hash })
        newUser.save().then().catch(err => console.log(err))

        const restaurants = user.restaurants
        restaurants.forEach(restaurant => {
          let newRestaurant = new Restaurant({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            location: restaurant.location,
            phone: restaurant.phone,
            image: restaurant.image,
            description: restaurant.description,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            userId: newUser._id
          })
          newRestaurant.save().then().catch(err => console.log(err))
        })
      })
    })
  })


  console.log('done')
}) 