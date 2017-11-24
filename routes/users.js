const router = require('express').Router()
const { User, UserDoc } = require('../server/models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })

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

router.get('/users/me', authenticate, (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  if (req.account.admin === true ) {res.json({ firstName: req.account.firstName,
    lastName: req.account.lastName,email: req.account.username, id: req.account.id,
    admin: req.account.admin})}
  res.json({firstName: req.account.firstName, lastName: req.account.lastName,
     email: req.account.username, id: req.account.id})
})

router.get('/users', authenticate, (req, res, next) => {
  if (!req.account && req.account.admin === false) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  else {
    User.all()
    .then((users) => {
      const noAdmin = users.filter(u=>u.admin === false)
      const userDetails = noAdmin.map((u) =>
       ({firstName: u.firstName, lastName: u.lastName,
         email: u.username, id: u.id}))
      res.json(userDetails)})
    .catch((error) => next(error))
  }
})

router.post('/docs', authenticate, (req, res, next) => {
  const email = req.body.email
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }

  UserDoc.all()
   .then((docs) => {
     const userContracts = docs.filter(d=>d.userEmail === email)
     const contracts = userContracts.map((u) => ({cloudinaryFileName: u.cloudinaryFileName,
       cloudinaryURL: u.cloudinaryURL, createdAt: u.createdAt}))
     res.json(contracts)})
   .catch((error) => next(error))

})



module.exports = router
