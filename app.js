const express = require('express')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000
app.use(express.static('public'))

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const methodOvervide = require('method-override')
app.use(methodOvervide('_method'))

//route 設定ˋ
//app.use('/', require('./routes/home'))
//app.use('/restaurants', require('./routes/restaurants'))

const mongoose = require('mongoose')
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

//!!!!!!注意顯示新增餐廳頁面的路由不能放在顯示單一餐廳資訊後面,否則再載入新增頁面的時候會找錯路由!!!!!!!!!!!!!!!!!
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

  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description
  })
  // console.log('restaurant', restaurant)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

//顯示修改一筆餐廳資料的頁面
app.get('/restaurants/:id/edit', (req, res) => {

  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant })
    })
})

//修改一筆餐廳資料
app.put('/restaurants/:id', (req, res) => {
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
app.delete('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/restaurants')
    })
  })
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
