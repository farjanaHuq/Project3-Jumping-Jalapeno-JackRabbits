const express = require('express');
const router = express.Router();
const db = require('../models');
// const crypto = require('crypto');
const helpers = require('./helpers/authHelpers');
const jwt = require('jsonwebtoken');
var sgMail = require('@sendgrid/mail');


// register
router.post('/register', (req, res) => {
   // check if user entered in all of the data
   if (!req.body.displayName || !req.body.password || !req.body.email) {
      return res.status(400).json({ msg: new Error('Please put all data on body.') });
   }
   // create a user object to store in the db and encrypt the password
   const user = {
      displayName: req.body.displayName,
      email: req.body.email,
      salt: helpers.getSalt()
   };
   user.hash = helpers.getHash(user.salt, req.body.password);

   // sendgrid
   sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
   // check for environment to send proper links in email
   var urlInEmail;;
   if (process.env.NODE_ENV !== 'production') urlInEmail = 'http://localhost:3000/';
   else urlInEmail = 'https://desolate-cliffs-99613.herokuapp.com/';
   const msg = {
      to: req.body.email,
      from: 'noreply@followthemoneytrail.org',
      subject: 'Verify Email Address',
      text: 'Verify Email Address',
      html: `
            <p>An account has just been created with this email address at followthemoneytrail.org.
            <p>To activate your new account, please click the following link:</p>
            <a href="${urlInEmail}VerifyEmail?k=${req.body.validationKey}">
               ${urlInEmail}VerifyEmail?k=${req.body.validationKey}
            </a>
         `,
   };
   sgMail.send(msg);

   db.User.create(user)
      .then(userResp => {
         db.EmailValidationKey.create({
            userID: userResp._id,
            validationKey: req.body.validationKey
         })
            .then(validationResp => {
               res.json({
                  userResp: userResp,
                  validationResp: validationResp
               })
            })
      })
      .catch(err => res.status(400).json({ msg: err.toString() }));
});

// login
router.post('/login', (req, res) => {
   console.log('login route hit');
   if (!req.body.password || !req.body.email) {
      return res.status(400).json({ msg: new Error('Please put all data on body.') });
   }
   db.User.findOne({ email: req.body.email })
      .then(resp => {
         console.log('login resp:', resp);
         if (!helpers.checkIfValidPass(resp, req.body.password)) {
            res.json('Incorrect password.');
         } else if (!resp.emailValidated) {
            res.json('Email has not been validated.');
         } else {
            var expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);

            res.json({
               userID: resp._id,
               displayName: resp.displayName,
               email: resp.email,
               date: resp.date,
               token: jwt.sign({
                  exp: parseInt(expiry.getTime() / 1000),
                  userID: resp._id,
                  displayName: resp.displayName,
                  email: resp.email,
                  date: resp.date,
               }, process.env.REACT_APP_JWT_SECRET)
            });
         }
      })
      .catch(err => res.status(400).json({ msg: err.toString() }));
});

router.put('/verifyEmail/:key', (req, res) => {
   // find the index in the emailvalidationkeys collection with this key
   db.EmailValidationKey.findOne({ validationKey: req.params.key })
      // get the response
      .then(validationKeyResp => {
         if (validationKeyResp) {
            // delete the collection
            db.EmailValidationKey.deleteOne({ validationKey: req.params.key })
               .then(() => res.json('Validation key index deleted.'))
               .catch(err => console.log(err));
            // in the user collection: where the id matches the response's id, set the validation value to true
            db.User.updateOne({ _id: validationKeyResp.userID }, { $set: { emailValidated: true } })
               .then(() => res.json('Email validated.'))
               .catch(err => console.log(err));
         } else {
            console.log('Email address already validated.');
         }
      });
});

module.exports = router;