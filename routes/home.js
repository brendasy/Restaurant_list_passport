const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

//顯示搜尋結果
router.get('/search', (req, res) => {

  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .exec((err, restaurants_search) => {
      if (err) return console.error(err)
      const restaurants = restaurants_search.filter(each_restaurant => each_restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      return res.render('index', { restaurants: restaurants, keyword: keyword })
    }
    )
})

module.exports = router