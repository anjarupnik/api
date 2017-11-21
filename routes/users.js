const router = require('express').Router()
const { User } = require('../server/models')
const passport = require('../config/auth')

router.post('/users', (req, res, next) => {
  var adminSet = (req.body.username === "admin") ? true : false

  User.create({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password,
     admin: adminSet
    })
      .then(user=> res.status(201).send({username: user.username, email: user.email}))
      .catch(error => res.status(400).send(error));

})

router.get('/users/me', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  if (req.account.admin === true ) {res.json({username: req.account.username, email: req.account.email, id: req.account.id, admin: req.account.admin})}
  res.json({username: req.account.username, email: req.account.email, id: req.account.id})
})


module.exports = router
