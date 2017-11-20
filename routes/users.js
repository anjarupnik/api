const router = require('express').Router()
const { User } = require('../server/models')

router.post('/users', (req, res, next) => {
  User.create(User.create({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      err.status = 422
      return next(err)
    }

    res.status(201).send(user)
  })
})

module.exports = router
