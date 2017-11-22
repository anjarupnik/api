const router = require('express').Router()
const { User } = require('../server/models')
const passport = require('../config/auth')

router.post('/users', (req, res, next) => {
  var adminSet = (req.body.username === "admin@email.com") ? true : false

  User.create({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     username: req.body.username,
     password: req.body.password,
     admin: adminSet
    })
      .then(user=> res.status(201).send({email: user.username, firstName: user.firstName,
         lastName: user.lastName
         }))
      .catch(error => res.status(400).send(error));

})

router.get('/users/me', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  if (req.account.admin === true ) {res.json({ email: req.account.username, id: req.account.id,
     admin: req.account.admin})}
  res.json({firstName: req.account.firstName, lastName: req.account.lastName,
     email: req.account.username, id: req.account.id})
})


module.exports = router
