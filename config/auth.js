const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { User } = require('../server/models')
const jwtOptions = require('./jwt')
const LocalStrategy = require('passport-local')

const tokenStrategy = new Strategy(jwtOptions, (jwtPayload, done) => {
  console.log('payload received', jwtPayload)

  User.findById(jwtPayload.id)
    .then((user) => {
      if (user) {
        console.log(user)
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch((err) => done(err, false))
})

passport.use(new LocalStrategy(( username, password, cb) => {
   User.find({where: {username}})
     .then((user) => {
       console.log(user.id)
     })


}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, cb) => {
  legaljoe.query('SELECT id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      winston.error('Error when selecting user on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])
  })
})

passport.use(tokenStrategy)

module.exports = passport
