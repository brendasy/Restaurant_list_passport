const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.redirect('/restaurants')
})

//顯示搜尋&排序結果
router.get('/search&sort', authenticated, (req, res) => {

  const keyword = req.query.keyword
  const sortType = req.query.sort_type

  Restaurant.find()
    .sort(sortType)
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      if (keyword != '') {
        restaurants = restaurants.filter(each_restaurant => each_restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      }
      return res.render('index', { restaurants, keyword, [sortType]: sortType })
    })
})


module.exports = router