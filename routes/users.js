const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//登入
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login' // 失敗會留在登入頁面
  })(req, res, next)
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊
router.post('/register', (req, res) => {
  const { email, name, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      // 使用者已經註冊過
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const user = new User({ email, name, password })
      user.save().then(user => {
        res.redirect('/')                         // 新增完成導回首頁
      }).catch(err => console.log(err))
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
module.exports = router