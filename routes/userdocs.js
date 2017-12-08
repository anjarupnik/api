const router = require('express').Router()
const { UserDoc, Email } = require('../server/models')
const nodemailer = require('nodemailer');
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false });

const mailPassword = process.env.LEGALJOEPASSWORD
const mailUsername = process.env.LEGALJOEEMAIL

//send an email with the input text
router.post('/userdocs', (req, res, next) => {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUsername,
      pass: mailPassword //this should be set to an env-when we deploy
    }
  });

  const resUserName = req.body.data.tags[0]
  const resUserEmail = req.body.data.tags[1]
  const resUserPaid = (req.body.data.tags[2] === "true") ? true : false
  const userId = req.body.data.tags[3]

  var subjectOne = ""
  var textPaid = ""
  var textFree = ""

  Email.findAll()
    .then((emails) => {
      const email = emails.filter(e=>e.textPaid !== null)
      subjectOne = email[0].subjectOne,
      textPaid = email[0].textPaid,
      textFree = email[0].textFree

      const resCloudinaryURL = req.body.data.secure_url
      const resCloudinaryFileName = req.body.data.public_id

      var userText = (resUserPaid === true)
      ? (`<p style="font-size:13px;"> Hoi ${resUserName}, <br/><br/>Je hebt gekozen voor de betaalde contract analyse, je contract wordt toegevoegd aan mijn database.<br/><br/>Wie ben ik? Ik ben Joe een Artificial Intelligence advocaat. Ik heb inmiddels honderden contracten gezien en gelezen.<br/><br/>Ik ga voor jou op zoek naar afwijkende clausules in je ZZP contract zodat je weet waar je aan begint.<br/><br/>Je krijgt binnen 24 uur een reactie via email en iDeal link voor de betaling.<br/><br/>-- <br/>Legal Hustler,<br/><br/><img style="height:60px;weight:90px;" src="http://res.cloudinary.com/mdfchucknorris/image/upload/v1512727090/rrkjfc_tboyw3.png"/><br/><br/> "Legal made easy and simple" <br/><br/></p>
      <p style="font-size:10px;font-style:italic;">Website: <a href="https://legaljoe.nl/" >legaljoe.nl</a><br/>Tel: +31629730740</p><br/><br/>`)
      : (`<p style="font-size:13px;"> Hoi ${resUserName}, <br/><br/>Je hebt gekozen voor de gratis contract analyse, je contract wordt toegevoegd aan mijn database.<br/><br/>Wie ben ik? Ik ben Joe een Artificial Intelligence advocaat. Ik heb inmiddels honderden contracten gezien en gelezen.<br/><br/>Ik ga voor jou op zoek naar afwijkende clausules in je ZZP contract zodat je weet waar je aan begint.<br/><br/>Je krijgt binnen 24 uur een reactie via email.<br/><br/>-- <br/>Legal Hustler,<br/><br/><img style="height:60px;weight:90px;" src="http://res.cloudinary.com/mdfchucknorris/image/upload/v1512727090/rrkjfc_tboyw3.png"/><br/><br/> "Legal made easy and simple" <br/><br/></p>
      <p style="font-size:10px;font-style:italic;">Website: <a href="https://legaljoe.nl/">legaljoe.nl</a><br/>Tel: +31629730740</p><br/><br/>`)

      // setup e-mail data with unicode symbols
      const mailOptions = {
          from: mailUsername, // sender address
          to: resUserEmail, // list of receivers
          subject: 'Legaljoe Contract Analyse', // Subject line
          html: userText
      };

      var joeText = (resUserPaid === true)
      ? (`Contract is verstuurd met volgende tekst: "${userText}" Het contract is hier: ${resCloudinaryURL}. De klant heeft voor de betaalde optie gekozen`)
      : (`Contract is verstuurd met volgende tekst: "${userText}" Het contract is hier: ${resCloudinaryURL}. De klant heeft de gratis optie gekozen`)

      const mailJoe = {
          from: mailUsername, // sender address
          to: mailUsername, // list of receivers
          subject: `${resUserEmail}`, // Subject line
          text: joeText, // plaintext body
      };

      transporter.sendMail(mailOptions, function(err, info){
          if(err){
              return console.log(err);
          }
          console.log('Message sent: ' + info.response);
      });

      transporter.sendMail(mailJoe, function(err, info){
          if(err){
              return console.log(err);
          }
          console.log('Message sent: ' + info.response);
      });

      UserDoc.create({
        userEmail: resUserEmail,
        userName: resUserName,
        cloudinaryFileName: resCloudinaryFileName,
        cloudinaryURL: resCloudinaryURL,
        paidContract: resUserPaid,
        userId: userId
      })
        .then(user=> res.status(201).send({"received":"true"}))
        .catch(error => res.status(400).send(error));
    })
})
router.post('/docs', authenticate, (req, res, next) => {
  const id = req.body.id
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }

   UserDoc.findAll({
      order: [['createdAt', 'DESC']]
      })
       .then((docs) => {
     const userContracts = docs.filter(d=>d.userId == id)
     const contracts = userContracts.map((u) => ({cloudinaryFileName: u.cloudinaryFileName,
       cloudinaryURL: u.cloudinaryURL, createdAt: u.createdAt, checked: u.checkedContract}))
     res.json(contracts)})
   .catch((error) => next(error))

})

module.exports = router
