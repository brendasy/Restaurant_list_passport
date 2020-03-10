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

const session = require('express-session')
const passport = require('passport')

app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

//route 設定
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/users', require('./routes/users'))


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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
