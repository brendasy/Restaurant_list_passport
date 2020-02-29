const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.error('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//顯示所有餐廳資訊
app.get('/restaurants', (req, res) => {

  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      res.render('index', { restaurants })
    })
})
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

//顯示新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//顯示單一餐廳資訊
app.get('/restaurants/:id', (req, res) => {

  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurant })
    })
})

//顯示搜尋結果
app.get('/search', (req, res) => {

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

//新增一筆餐廳資料
app.post('/restaurants/', (req, res) => {

  const restaurant = new Restaurant(req.body)
  console.log('restaurant', restaurant)
  /*
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
  */
})

//顯示修改一筆餐廳資料的頁面
app.get('/restaurants/:id/edit')
//修改一筆餐廳資料
app.post('/restaurants/:id/edit')
//刪除一筆餐廳資料
app.post('/restaurants/:id/delete')


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
