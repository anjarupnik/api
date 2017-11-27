const router = require('express').Router()
const { User, UserDoc } = require('../server/models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })
const nodemailer = require('nodemailer');

const mailPassword = process.env.LEGALJOEPASSWORD

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

router.get('/docs', authenticate, (req, res, next) => {
  if (!req.account && req.account.admin === false) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  else {

  UserDoc.findAll({
    order: [['createdAt', 'DESC']]
 })
   .then((docs) => {
     const userContracts = docs.map((c) =>
     ({email: c.userEmail, name: c.userName, cloudinaryFileName: c.cloudinaryFileName,
       cloudinaryURL: c.cloudinaryURL, paid: c.paidContract, checked: c.checkedContract,
       id: c.id, createdAt: c.createdAt }))
     res.json(userContracts)
   })
   .catch((error) => next(error))
  }
})

router.put('/admindocs', (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'legaljoemailer@gmail.com',
      pass: mailPassword  //this should be set to an env-when we deploy
    }
  });

  const resUserName = req.body.data.tags[0]
  const resUserEmail = req.body.data.tags[1]
  const id = req.body.data.tags[2]

  const resCloudinaryURL = req.body.data.secure_url
  const resCloudinaryFileName = req.body.data.public_id

  const mailOptions = {
      from: 'legaljoemailer@gmail.com',
      to: resUserEmail,
      subject: 'Overviewed contract',
      text: `Het contract is hier: ${resCloudinaryURL}`,
  }

  transporter.sendMail(mailOptions, function(err, info){
      if(err){
          return console.log(err);
      }
      console.log('Message sent: ' + info.response);
  })

  UserDoc.findById(id)
  .then((doc) => {
     if (!doc) { return next() }
     return doc
       .update({
         cloudinaryURL: resCloudinaryURL || doc.cloudinaryURL,
         checkedContract: true
       })
   .then(() => res.json(doc))
   .catch((error) => next(error))
 })
})






module.exports = router
