const router = require('express').Router()
const { User, UserDoc } = require('../server/models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })
const nodemailer = require('nodemailer')
const mailPassword = process.env.LEGALJOEPASSWORD

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

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'legaljoemailer@gmail.com',
      pass: mailPassword  //this should be set to an env-when we deploy
    }
  })

  const mailOptions = {
      from: 'legaljoemailer@gmail.com',
      to: req.account.username,
      subject: 'Welcome To LegalJoe',
      text: `${req.account.firstName} ${req.account.lastName},\n Welcome to LegalJoe`,
  }

  transporter.sendMail(mailOptions, function(err, info){
      if(err){
          return console.log(err);
      }
      console.log('Message sent: ' + info.response);
  })

  if (req.account.admin === true ) {res.json({ firstName: req.account.firstName,
    lastName: req.account.lastName,email: req.account.username, id: req.account.id,
    admin: req.account.admin})}
  res.json({firstName: req.account.firstName, lastName: req.account.lastName,
     email: req.account.username, id: req.account.id})
})



module.exports = router
