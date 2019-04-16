const express = require('express');
const router = express.Router();
const db = require('../models');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
   auth: {
     api_user: 'farjanaHuq13',
     api_key: 'mySendgrid2019'
   }
 }
 var client = nodemailer.createTransport(sgTransport(options));

router.post('/:emailToken', function(req,res){

    // db.User.findOne({ emailToken: req.params.emailToken })
    // .then(resp => {
        // console.log("User created resp",resp);  
        //var emailToken = req.params.emailToken;
        var email = {
            from: 'jumpingJalapinoRabbit@gmail.com',
            to: 'huq.farjana03@gmail.com',
            subject: 'Email Activation',
            text: 'Click the link to activate your email',
            // <p>To confirm your registration, please click the following link:</p>
            // <a href="http://localhost:3000/activate/${emailToken}">http://localhost:3000/activate</a>,
            html: <strong><b>Hello </b></strong>
            //` <p>To confirm your registration, please click the following link:</p>
            // <a href="http://localhost:3000/activate/${emailToken}">http://localhost:3000/activate</a>`
          };
          
          client.sendMail(email, function(err, info){
              if (err ){
                console.log(err);
              }
              else {
                console.log('Message sent: ' + info.response);
              }
          });
    // })
    // .catch(err => res.status(400).json({ msg: err.toString() }));

});








module.exports = router;