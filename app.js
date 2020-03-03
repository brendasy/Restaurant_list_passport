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

//route 設定
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.error('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
