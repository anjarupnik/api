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

  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: 'legaljoemailer@gmail.com', // sender address
      to: 'legaljoemailer@gmail.com', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world ?', // plaintext body
      attachments: [{   // file on disk as an attachment
              filename: 'legalmailer.txt',
              content: 'hello world!' // stream this file
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
