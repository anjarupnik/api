const router = require('express').Router()
const { User } = require('../server/models')
const passport = require('../config/auth')

router.post('/users', (req, res, next) => {
  User.create({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
    })
      .then(user=> res.status(201).send(user))
      .catch(error => res.status(400).send(error));

})

router.get('/users/me', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }

  res.json(req.account)
})

module.exports = router
