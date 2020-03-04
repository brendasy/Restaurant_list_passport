const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//顯示所有餐廳資訊
router.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      res.render('index', { restaurants })
    })
})


//!!!!!!注意顯示新增餐廳頁面的路由不能放在顯示單一餐廳資訊後面,否則再載入新增頁面的時候會找錯路由!!!!!!!!!!!!!!!!!
//顯示新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//顯示單一餐廳資訊
router.get('/:id', (req, res) => {

  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant })
    })
})

//新增一筆餐廳資料
router.post('/', (req, res) => {

  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

//顯示修改一筆餐廳資料的頁面
router.get('/:id/edit', (req, res) => {

  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant })
    })
})

//修改一筆餐廳資料
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//刪除一筆餐廳資料
router.delete('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/restaurants')
    })
  })
})

module.exports = router