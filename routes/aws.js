var AWS = require('aws-sdk');

const router = require('express').Router()
const fileUpload = require('express-fileupload')
const passport = require('../config/auth')

//upload for users
router.post('/upload', fileUpload(), (req, res, next) => {
  if(!req.files){
    return res.status(400).send('No files were uploaded.')
  };

  var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  // Bucket names must be unique across all S3 users
  var myBucket = process.env.S3_BUCKET
  var file = req.files.file
  var myKey = `uploads/${new Date().getTime()}-${file.name}`
      params = {Bucket: myBucket, Key: myKey, Body: file.data };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully uploaded data to" + myBucket + "/" + myKey);
      console.log(data)
       //if userupload put URI in DB => basically .post('/userdocs')
       //if adminupload find document and update URI  => .put('/admindocs')
       //respond with success string for popup  => .then(user=> res.status(201).send({"received":"true"}))
     }
   });
 });

 //upload for admindocs


module.exports = router
