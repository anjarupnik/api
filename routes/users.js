const router = require('express').Router()
const { User } = require('../server/models')

router.post('/users', (req, res, next) => {
  User.create({
     name: req.body.name,
     email: req.body.email
    })
       .then(user=> res.status(201).send(user))
       .catch(error => res.status(400).send(error));

})

module.exports = router
