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
  const resUserPaid = (req.body.data.tags[2] === "true")? true : false

  const resCloudinaryURL = req.body.data.secure_url
  const resCloudinaryFileName = req.body.data.public_id

  var userText = (resUserPaid === true)? ('Je hebt gekozen voor de betaalde service, je contract wordt niet toegevoegd aan de Database') : ('Je hebt gekozen voor de gratis Contract Analyse, je contract is toegevoegd aan mijn database')
  // setup e-mail data with unicode symbols
    console.log(userText)
  const mailOptions = {
      from: 'legaljoemailer@gmail.com', // sender address
      to: resUserEmail, // list of receivers
      subject: 'Sent contract', // Subject line
      text: userText, // plaintext body
  };

  const mailJoe = {
      from: 'legaljoemailer@gmail.com', // sender address
      to: 'legaljoemailer@gmail.com', // list of receivers
      subject: `${resUserEmail}`, // Subject line
      text: `Contract is verstuurd met volgende tekst: "${userText}" Het contract is hier: ${resCloudinaryURL}`, // plaintext body
  };
  console.log(mailOptions)

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
    cloudinaryFileName: resCloudinaryFileName,
    cloudinaryURL: resCloudinaryURL,
    paidContract: sresUserPaid
  })
    .then(user=> res.status(201).send("I have your document"))
    .catch(error => res.status(400).send(error));
})

router.patch('/userdocs/:id', (req, res, next) => {
  return UserDoc.findById(req.params.id)
   .then((userDoc) => {
      if (!userDoc) { return next() }
      return userDoc
        .update({
          checkedContract: !(userDoc.checkedContract)
        })
    .then(() => res.status(201).send("Document set to checked"))
    .catch((error) => next(error))
  })
})

module.exports = router
