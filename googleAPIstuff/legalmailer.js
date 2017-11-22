var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'legaljoemailer@gmail.com',
    pass: 'currentpassword'
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

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(err){
        return console.log(err);
    }
    console.log('Message sent: ' + info.response);
});

/**
options for attachemnts can be found here:
https://community.nodemailer.com/using-attachments/
*/
