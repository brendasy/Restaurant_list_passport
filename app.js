const express = require('express')
const restaurants = require('./restaurant.json')

const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/restaurants/:restaurant_id', (req, res) => {

  const restaurant = restaurants.results.find(each_restaurant => req.params.restaurant_id === each_restaurant.id.toString())

  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const restaurants_search = restaurants.results.filter(each_restaurant => each_restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

  res.render('index', { restaurants: restaurants_search, keyword: keyword })
})

app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurants.results })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
