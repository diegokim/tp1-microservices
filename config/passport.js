const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../repositories/usersRepository')
const configDB = require('./database')

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey:    configDB.secret
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.getUserByUsername(jwtPayload.username)
    .then((user) => {
      if (user) {
        return done(null, user)
      } else {
        return done()
      }
    })
    .catch((err) => done(err, false))
  }))
}
