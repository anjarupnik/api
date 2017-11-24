const router = require('express').Router()
const { UserDoc } = require('../server/models')
const nodemailer = require('nodemailer');

//send an email with the input text
router.post('/userdocs', (req, res, next) => {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'legaljoemailer@gmail.com',
      pass: 'currentpassword'  //this should be set to an env-when we deploy
    }
  });

  const resUserName = req.body.data.tags[0]
  const resUserEmail = req.body.data.tags[1]
  const resUserPaid = req.body.data.tags[2]
  const resCloudinaryURL = req.body.data.secure_url
  const resCloudinaryFileName = req.body.data.public_id

  const userText = (resUserPaid === true)? 'Je hebt gekozen voor de betaalde service, je contract wordt niet toegevoegd aan de Database' : 'Je hebt gekozen voor de gratis Contract Analyse, je contract is toegevoegd aan mijn database'
  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: 'legaljoemailer@gmail.com', // sender address
      to: resUserName, // list of receivers
      bcc: 'legaljoemailer@gmail.com',
      subject: 'Sent contract', // Subject line
      text: userText, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(err){
          return console.log(err);
      }
      console.log('Message sent: ' + info.response);
  });

  UserDoc.create({
    userEmail: resUserEmail,
    cloudinaryFileName: resCloudinaryFileName,
    cloudinaryURL: resCloudinaryURL,
    paidContract: resUserPaid
  })
    .then(user=> res.status(201).send("I have your document"))
    .catch(error => res.status(400).send(error));
})

module.exports = router
