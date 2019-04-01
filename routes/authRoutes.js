const express = require('express');
const router = express.Router();
const db = require('../models');
const crypto = require('crypto');
const helpers = require('./helpers/authHelpers');
const jwt = require('jsonwebtoken');


// register
router.post('/register', (req, res) => {
   if (!req.body.displayName || !req.body.password || !req.body.email) {
      return res.status(400).json({ msg: new Error('Please put all data on body.') });
   }
   const user = {
      displayName: req.body.displayName,
      email: req.body.email,
      date: req.body.date,
      salt: helpers.getSalt()
   }
   user.hash = helpers.getHash(user.salt, req.body.password);
   db.User.create(user)
      .then(resp => res.status(201).json({ msg: 'User Created' }))
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
         if (helpers.checkIfValidPass(resp, req.body.password)) {
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
               }, process.env.JWT_SECRET)
            });
         } else {
            throw new Error('Incorrect password.');
         }
      })
      .catch(err => res.status(400).json({ msg: err.toString() }));
});

module.exports = router;