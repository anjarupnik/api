const router = require('express').Router()
var nodemailer = require('nodemailer');


//send an email with the input text
router.post('/contracttext', (req, res, next) => {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'legaljoemailer@gmail.com',
      pass: 'currentpassword'  //this should be set to an env-when we deploy
    }
  });

  const userEmail = req.body.email
  const userText = req.body.contract

  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: 'legaljoemailer@gmail.com', // sender address
      to: 'legaljoemailer@gmail.com', // list of receivers
      subject: 'Sent contract', // Subject line
      text: `A contract belonging to the user with the following email: ${userEmail}`, // plaintext body
      attachments: [{   // file on disk as an attachment
              filename: 'contract.txt',
              content: `${userText}` // stream this file
            }]
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(err){
          return console.log(err);
      }
      console.log('Message sent: ' + info.response);
  });

  UserDoc.create({
    userEmail: req.body.email
  })
    .then(user=> res.status(201).send())
    .catch(error => res.status(400).send(error));
})

module.exports = router
