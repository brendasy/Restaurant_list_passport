const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


module.exports = (passport) => {

  passport.use(new LocalStrategy({ usernameField: 'email' },
    function (username, password, done) {
      User.findOne({ email: username }).then(user => {
        if (!user) { return done(null, false) }
        if (user.password !== password) {
          return done(null, false)
        }
        return done(null, user)
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