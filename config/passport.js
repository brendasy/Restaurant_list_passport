const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {

  passport.use(
    new LocalStrategy({ usernameField: 'email' },
      (username, password, done) => {
        User.findOne({ email: username })
          .then(user => {
            if (!user) { return done(null, false) } //That email is not registered

            bcrypt.compare(password, user.password, function (err, isMatch) {
              if (isMatch) {
                return done(null, user)
              } else {
                return done(null, false, { message: 'Email and Password incorrect' })
              }
            })
            //        if (user.password !== password) {
            //          return done(null, false)
            //        }

          })
      }
    ))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })
}