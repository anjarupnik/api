var AWS = require('aws-sdk');

const router = require('express').Router()
const fileUpload = require('express-fileupload')
const passport = require('../config/auth')
const { Recording } = require('../models')
const authenticate = passport.authorize('jwt', { session: false })


router.post('/upload', authenticate, fileUpload(), (req, res, next) => {

  if(!req.files){
    return res.status(400).send('No files were uploaded.')
  };

  var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  // Bucket names must be unique across all S3 users
  var myBucket = process.env.S3_BUCKET
  var file = req.files.audio
  var myKey = `uploads/${req.account.id}-${JSON.stringify(new Date)}`
      params = {Bucket: myBucket, Key: myKey, Body: file.data };

   s3.putObject(params, function(err, data) {
       if (err) {
           console.log(err)
       } else {
           console.log("Successfully uploaded data to" + myBucket + "/" + myKey);
       }
    });
  });

module.exports = router
